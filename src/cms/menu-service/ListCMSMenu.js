import React, {Component} from 'react'
import {AppHeader,ModalDialog,LoadingIcon} from "../../components";
import {textValues} from "../../configs";
import {api} from "../../api";
import {styles} from "./styles";



export default class ListCMSMenu extends Component{
   createMenu(){
     this.props.onDisplayCreateMenuForm();
   }
   editCMSMenu(menuItem){
      this.props.editCMSMenu(menuItem);
   }
   renderCMSMenu(menuItem,index){
     return(
       <div key={index} style={styles.cmsMenuRecord}>
        <a onClick={evt=>{
            this.editCMSMenu(menuItem);
        }} style={styles.cmslink}>{menuItem.title}</a>
       </div>
     )

   }
    render(){
      if(this.props.cmsmenu!=null && this.props.cmsmenu.length>0){
        return (
          <div style={styles.cmsMenuContainer}>
                 <div style={styles.title}>CMS Menu</div>
                 <div style={styles.cmsMenuList}>
                      {this.props.cmsmenu.map(this.renderCMSMenu.bind(this))}
                 </div>
                 <div style={styles.footer}>
                    <div style={styles.buttonContainer}>
                         <button type="submit" className="btn btn-primary btn-normal" onClick={(evt) => {
                                this.createMenu();
                          }}>Create</button>
                    </div>
                  </div>

          </div>
        );
      }
      else{
        return null;
      }

    }



}
