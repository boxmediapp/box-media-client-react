import React, {Component} from 'react'

import {styles} from "./styles";


export default class ProgressBar extends Component {
  render(){
    if(this.props.progressTotal){
      var thumbnailwidth=this.props.width*300/this.props.height;
      var finishedWith=this.props.width*300/this.props.height*this.props.progressValue/this.props.progressTotal;
      if(this.props.message){
        return(


                  <div style={styles.progressBar(thumbnailwidth)}>

                      <div style={styles.progressBarProgress(finishedWith)}>
                          <div style={styles.progressMessage}>{this.props.message}</div>
                      </div>
                  </div>

        );
      }
      else{
        return(
              <div style={styles.progressBar(thumbnailwidth)}>
                  <div style={styles.progressBarProgress(finishedWith)}>
                  </div>
              </div>

        );
      }

    }
    else{
        return null;
    }

  }


}
