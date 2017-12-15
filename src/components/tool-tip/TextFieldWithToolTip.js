import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';
import {styles} from "./styles";
export default class TextFieldWithToolTip extends Component{

  render(){
    var {fieldId,label,help, value}=this.props;
    var helpId=fieldId+"Help";
    var className="col-sm-"+this.props.colSize+" formFieldWithLabel";


    return(
        <div className={className}>
              <label htmlFor={fieldId}>{label} <a data-tip data-for={helpId} style={styles.helpIcon}>?</a>
              <ReactTooltip id={helpId} type='info'>
                <span>{help}</span>
              </ReactTooltip>
              :</label>
              <input type="text" className="form-control" id={fieldId} placeholder={label} name={fieldId}
              value={value} onChange={evt=>{this.props.onChange(evt.target.value)}}/>
          </div>
      );
  }
}
