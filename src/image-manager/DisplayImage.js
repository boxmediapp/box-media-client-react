import React, {Component} from 'react';




import {imageUtil,genericUtil} from "../utils";


import {textValues} from "../configs";
import {styles} from "./styles";

import {ModalDisplayImage} from "../components";




export  default class DisplayImage extends Component {
   constructor(props){
     super(props);
     this.state={mql:styles.mql,originalSize:true};
     this.mediaQueryChanged=this.mediaQueryChanged.bind(this);
   }

   setOriginalSize(originalSize){
     this.setState(Object.assign({}, this.state,{originalSize}));
   }
  componentWillMount(){
     styles.mql.addListener(this.mediaQueryChanged);
   }
   componentWillUnmount() {
     styles.mql.removeListener(this.mediaQueryChanged);
   }
   mediaQueryChanged(){
     this.setState(Object.assign({}, this.state, {mql:styles.msql}));
   }
   renderDimension(){
      if(this.props.image.width && this.props.image.height){
        return (<div style={styles.dimension}>{this.props.image.width} x {this.props.image.height} </div>)
      }
   }
   render(){


    var {originalSize} =this.state;
    var {width, height}=this.props.image;
    var url=this.props.image.url+"?lastModifiedAt="+this.props.image.lastModifiedAt;


    return(
           <div style={styles.previewImageContainer}>

                 <img src={url} style={styles.imagezone(width, height,originalSize)}/>
                 <div  style={styles.imageFooter}>
                      <DisplayShowOriginalImageButton width={width} height={height} originalSize={originalSize}
                      setOriginalSize={this.setOriginalSize.bind(this)}/>
                      <DisplayShowScaledImageButton originalSize={originalSize}
                      setOriginalSize={this.setOriginalSize.bind(this)}/>
                      {this.renderDimension()}
                 </div>
           </div>
    );
  }

}

class DisplayShowOriginalImageButton extends Component{

  render(){
      if(this.props.originalSize){
        return null;
      }
      else{
        if(this.props.width && this.props.height){
          return(
            <button type="button" className="btn btn-primary btn-normal imageControlButton" onClick={(evt) => {
                this.props.setOriginalSize(true);
            }}>View The Original Size ({this.props.width} x {this.props.height}</button>
          );
        }
        else{
          return(
            <button type="button" className="btn btn-primary btn-normal imageControlButton" onClick={(evt) => {
                this.props.setOriginalSize(true);
            }}>View The Original Size</button>
          );
        }

      }

  }

}




class DisplayShowScaledImageButton extends Component{

  render(){
      if(!this.props.originalSize){
        return null;
      }
      return(
        <button type="button" className="btn btn-primary btn-normal imageControlButton" onClick={(evt) => {
            this.props.setOriginalSize(false);
        }}>Scaled view</button>
      );
  }

}
