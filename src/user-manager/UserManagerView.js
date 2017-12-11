import React, {Component} from 'react'
import {api} from "../api";

import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'
import {Table, Column, Cell} from "fixed-data-table-2";

import {textValues,config} from "../configs";
import {AppHeader,ModalDialog} from "../components";
import {styles} from "./styles";
import  "./styles/index.css";

import {genericUtil} from "../utils";

export  default class UserManagerView extends Component {
    constructor(props){
      super(props);
      this.state={users:[], dialog:null};
      this.loadUsers();
    }

    loadUsers(){
      api.getUsers().then(users =>{
             this.setUsers(users);
       });
    }
    setUsers(users){
      this.setState(Object.assign({}, this.state,{users}));
    }

    setDialog(dialog){
      this.setState(Object.assign({}, this.state,{dialog}));
    }

    onCreateNewUser(data){

      var user={username:data.username, password:data.password, roles:"user"};
      api.createNewUser(user).then(respose=>{
             this.loadUsers();
       });

      this.setDialog(null);
    }
    onDeleteUser(user){
      if(!user){
        return;
      }
      if(!user.username){
        return;
      }
       var users=this.state.users.filter(u=>u.username!==user.usernane);
       this.setState(Object.assign({}, this.state,{users}));
       api.deleteUser(user.username).then(respose=>{
             this.loadUsers();
       });

    }
    onDisplayChangedPasswordDialog(user){
      this.user=user;
      this.setDialog("update");
    }
    onChangePassword(user){
      console.log("updated:"+JSON.stringify(user));
      this.setDialog(null);
      if(user && user.username && user.password){
          api.updateUser(user.username, user);
      }

    }
    onCancel(){
      this.setDialog(null);
    }
    render(){

        return (
          <div>
            <AppHeader selected="admin"/>
              <div style={AppHeader.styles.content}>
                          <Table
                       rowHeight={50}
                       headerHeight={50}
                       rowsCount={this.state.users.length}
                       width={1000}
                       height={1000}>

                   <Column
                     columnKey="username"
                     data={this.state.users}
                     header={<Cell>User name</Cell>}
                     cell={<TextCell data={this.state.users}/>}
                     width={200}
                     />
                     <Column

                       data={this.state.users}
                       header={<Cell></Cell>}
                       cell={<ActiveCell data={this.state.users} onDeleteUser={this.onDeleteUser.bind(this)} onDisplayChangedPasswordDialog={this.onDisplayChangedPasswordDialog.bind(this)}/>}
                       width={800}
                       />





                              </Table>
                              <a className="btn btn-primary btn-normal imageControlButton" onClick={rvt=>{
                                this.setDialog("create");
                              }}>Add New User
                              </a>
             </div>


             <DisplayCreateNewUserDialog dialogtype={this.state.dialog} onCreateNewUser={this.onCreateNewUser.bind(this)}
             onCancel={this.onCancel.bind(this)}/>

             <ChangePassqwordDialog dialogtype={this.state.dialog}
             onChangePassword={this.onChangePassword.bind(this)}
             onCancel={this.onCancel.bind(this)} user={this.user}/>
          </div>
        );

    }

}

class TextCell extends Component{

    render(){
      const {data,rowIndex, columnKey,...props} = this.props;
    return (
      <Cell {...props}>
{data[rowIndex][columnKey]}
      </Cell>
    );
    }
}


class ActiveCell extends Component {
  render() {
    const {data, rowIndex, onDeleteUser,onDisplayChangedPasswordDialog,columnKey, ...props} = this.props;
    return (
      <Cell {...props}>


            <a className="btn btn-primary btn-normal mediaButton"onClick={ evt=> onDisplayChangedPasswordDialog(data[rowIndex])}>Change Password</a>
            <a className="btn btn-primary btn-normal mediaButton" onClick={ evt=> onDeleteUser(data[rowIndex])}>Delete
            </a>


      </Cell>
    );
  }
};

class DisplayCreateNewUserDialog extends Component{
  render(){
    if(this.props.dialogtype==="create"){
         var message={
           title:"Add New User",
           onConfirm:this.props.onCreateNewUser,
           onCancel:this.props.onCancel,
           inputs:[{name:"username",  label:"Username:"},
                   {name:"password",  label:"Password:"}],
           confirmButton:"Create",
           cancelButton:"Cancel"

         }
        return(<ModalDialog message={message}/>);
    }
    else{
      return  null;
    }
  }
}

class ChangePassqwordDialog extends Component{
     render(){
    if(this.props.dialogtype==="update"){
         var message={
           title:"Change Password",
           onConfirm:this.props.onChangePassword,
           onCancel:this.props.onCancel,
           inputs:[
                   {name:"username",  label:"Username:", readOnly:true, value:this.props.user.username},
                   {name:"password",  label:"Password:"}],
           confirmButton:"Change",
           cancelButton:"Cancel"
         }
        return(<ModalDialog message={message}/>);
    }
    else{
      return  null;
    }
  }
}
