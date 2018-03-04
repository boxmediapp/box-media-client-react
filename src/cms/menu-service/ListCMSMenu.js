import React, {Component} from 'react'
import {AppHeader,ModalDialog,LoadingIcon,BigButton} from "../../components";
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
     var link=textValues.cms.menuService.link+"?menuId="+menuItem.id;
     var label=menuItem.title;
     var imageurl=textValues.cms.menuService.icon;
     return(
       <BigButton key={index} label={label}
                  content={label}
                  link={link}
                  icon={imageurl}/>
     )

   }
    render(){
      if(this.props.cmsmenu!=null && this.props.cmsmenu.length>0){
        return (
          <div style={styles.cmsMenuList}>
                 <div style={styles.title}>CMS Menu</div>
                 <div style={styles.iconContainer}>
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
        return (
          <div style={styles.cmsMenuList}>
                 <div style={styles.title}>CMS Menu</div>
                 <div style={styles.iconContainer}>
                      No CMS Memu found
                 </div>
                 <div style={styles.footer}>
                    <div style={styles.buttonContainer}>
                         <button type="submit" className="btn btn-primary btn-normal" onClick={(evt) => {
                                this.createMenu();
                          }}>Create</button>
                    </div>
                  </div>

          </div>
        )
      }

    }



}
