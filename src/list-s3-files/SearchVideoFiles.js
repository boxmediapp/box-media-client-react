import React, {Component} from 'react'
import "./styles/index.css";

import {styles} from "./styles";
import {genericUtil} from "../utils";



export default class SearchVideoFiles extends Component{
   constructor(props){
      super(props);
      this.state=this.props.queryparameters;
      if(!this.state.prefix){
        this.state.prefix="";
      }
   }

  setPrefix(prefix){
    this.setState(Object.assign({}, this.state,{prefix}));
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
                 </div>
             </div>
     </div>
         );
  }

}