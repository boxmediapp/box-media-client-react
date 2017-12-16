import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';
import {styles} from "./styles";


export default class SelectWithToolTip extends Component{

  renderOption(option,index){
    return(
        <option value={option.value} key={index}>{option.label}</option>
    );
  }
  render(){

    var {fieldId,label,help, value, options}=this.props;
    var helpId=fieldId+"Help";
    var className="col-sm-"+this.props.colSize+" formFieldWithLabel";


    return(
        <div className={className}>
              <label htmlFor={fieldId}>{label} <a data-tip data-for={helpId} style={styles.helpIcon}>?</a>
              <ReactTooltip id={helpId} type='info'>
                <span>{help}</span>
              </ReactTooltip>
              :</label>
              <select className="form-control" id={fieldId}  name={fieldId}
              value={value} onChange={evt=>{this.props.onChange(evt.target.value)}}>
                  {options.map(this.renderOption)}
              </select>
          </div>
      );
  }
}
