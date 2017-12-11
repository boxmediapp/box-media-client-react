import React, {Component} from 'react'
import {styles} from "./styles";
export default class ModalDialog extends Component {
  constructor(props){
      super(props);

      if(this.props.message.inputs && this.props.message.inputs.length>0){
          var inputs={};
          this.props.message.inputs.forEach(input=>{
            inputs[input.name]="";
          });
          this.state={first:"",last:"", inputs};
      }
      else{
          this.state={first:"",last:""};
      }

  }
  onConfirm(){
    if(this.props.message.inputs && this.props.message.inputs.length>0){
          this.props.message.onConfirm(this.state.inputs);
    }
    else{
          this.props.message.onConfirm();
    }

  }
  onCancel(){
    this.props.message.onCancel();
  }
  onInputChanged(input){
      var inputs=Object.assign({}, this.state.inputs,input);
      this.setState(Object.assign({}, this.state,{inputs}));
  }
  render(){
      if(this.props.message){
            return(
                      <div style={styles.backdropStyle}>
                        <div style={styles.dialogwindow}>
                            <div style={styles.title}>{this.props.message.title}</div>
                            <div style={styles.content}>
                                  {this.props.message.content}
                                  <DisplayInputs {...this.props} onInputChanged={this.onInputChanged.bind(this)}/>
                            </div>

                            <div style={styles.footer}>
                              <DisplayButton onClick={this.onConfirm.bind(this)} buttonText={this.props.message.confirmButton}/>
                              <DisplayButton onClick={this.onCancel.bind(this)} buttonText={this.props.message.cancelButton}/>
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

class DisplayButton extends Component{

        render(){
        if(this.props.onClick){
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

class DisplayInputs extends Component{
  renderInputField(input, index){
      var onInputChanged=this.props.onInputChanged;

      return( <div style={styles.inputContainer} key={input.name}>
                  <div style={styles.inputLabel}>{input.label}</div>
                  <input type="text" key={input.name} onChange={evt=>{
                        var newinput={};
                        newinput[input.name]=evt.target.value;
                        onInputChanged(newinput);
                    }}></input>
              </div>
    );
  }
  render(){
        if(!this.props.message.inputs){
            return null;
        }
        if(!this.props.message.inputs.length){
          return null;
        }
        return (
          <div style={styles.inputsContainer}>
                  {this.props.message.inputs.map(this.renderInputField.bind(this))}
          </div>
        );




  }

}
