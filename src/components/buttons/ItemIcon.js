
import React, {Component} from "react";
import {styles} from './styles';

import {
  Link

} from 'react-router-dom'

export default class ItemIcon extends Component {

    render(){

        return (

           <div style={styles.itemIcon}>
                <div>{this.props.item.label}</div>
                <div>
                  <a onClick={(evt)=>{
                    this.props.onSelectedItem(this.props.item)
                  }}>
                      <img src={this.props.selectIcon}/>
                  </a>
                </div>

           </div>
        );


    }

}
