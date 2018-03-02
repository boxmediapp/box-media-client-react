import React, {Component} from 'react'
import {styles} from "./styles";
export default class SelectionModalDialog extends Component {
  constructor(props){
      super(props);
      this.state={selectedItem:this.props.selectedItem}
  }
  onConfirm(){
      this.props.onConfirm(this.state.selectedItem);
  }
  onCancel(){
    this.props.onCancel();
  }
  onInputChanged(value){
    
      for(var i=0;i<this.props.items.length;i++){
          if(this.props.items[i].value===value){
                this.setState(Object.assign({}, this.state,{selectedItem:this.props.items[i]}));
                break;
          }
      }
  }
  renderItem(item,index){
      return(<option value={item.value} key={index}>{item.label}</option>);
  }
  render(){
      var value="";
      if(this.state.selectedItem){
        value=this.state.selectedItem.value;
      }
            return(
                      <div style={styles.backdropStyle}>
                        <div style={styles.dialogwindow}>
                            <div style={styles.title}>{this.props.title}</div>
                            <div style={styles.content}>
                                  {this.props.content}
                                  <select  value={value} onChange={evt=>{
                                        this.onInputChanged(evt.target.value);
                                    }}>
                                        {this.props.items.map(this.renderItem)}
                                  </select>
                            </div>

                            <div style={styles.footer}>
                              <DisplayButton onClick={this.onConfirm.bind(this)} buttonText={this.props.confirmButton.label}/>
                              <DisplayButton onClick={this.onCancel.bind(this)} buttonText={this.props.cancelButton.label}/>
                            </div>
                        </div>
                  </div>
            );
  }

}

class DisplayButton extends Component{

        render(){
        if(this.props.onClick && this.props.buttonText){
          return(
            <div style={styles.buttonContainer}>
               <button onClick={this.props.onClick} className="btn btn-primary btn-normal">{this.props.buttonText}</button>
            </div>
          );
        }
        else{
          return null;
        }


        }

}
