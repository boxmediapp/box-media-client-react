import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';
export default class LabelWithToolTip extends Component{

  render(){
    var {fieldId,label,help}=this.props;
    var helpId=fieldId+"Help";

    return(
          <label htmlFor={fieldId}>{label} (<a data-tip data-for={helpId}>?</a>)
          <ReactTooltip id={helpId} type='info'>
            <span>{help}</span>
          </ReactTooltip>
          :</label>
      );
  }
}
