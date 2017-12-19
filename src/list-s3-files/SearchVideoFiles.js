import React, {Component} from 'react'
import "./styles/index.css";

import {styles} from "./styles";
import {genericUtil} from "../utils";
import {localImages} from "../configs";


export default class SearchVideoFiles extends Component{
   constructor(props){
      super(props);
      this.state=this.props.queryparameters;
      if(!this.state.search){
        this.state.search="";
      }
   }


  handleKeyPress(evt){
    if(evt.key==="Enter"){
        this.onSearch();
    }
  }
  setSearch(search){
    this.setState(Object.assign({}, this.state,{search}));
  }
  onSearch(evt){
      this.props.onSearch(this.state);
  }

  render(){
       return (
      <div className="content">

          <div className="row">

                <div className="col-sm-12  searchWithChannelBox">

                         <input type="text" style={styles.search} id="search"  value={this.state.search}
                           onChange={evt=>this.setSearch(evt.target.value)} onKeyPress={this.handleKeyPress.bind(this)}/>
                         <a className="btn-search" onClick={this.onSearch.bind(this)}>
                             <img src={localImages.search2}/>
                        </a>


                 </div>
             </div>
     </div>
         );
  }

}
