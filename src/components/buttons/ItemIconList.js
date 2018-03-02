
import React, {Component} from "react";
import {styles} from './styles';
import ItemIcon from "./ItemIcon";

import {
  Link

} from 'react-router-dom'

export default class ItemIconList extends Component {

    render(){

        return (

           <div style={styles.itemIconList}>
                <div style={styles.label}>{this.props.label}</div>
                <div style={styles.itemsContainer}>
                  {this.props.items.map(this.renderItem.bind(this))}
                </div>

           </div>
        );


    }
  renderItem(item, index){
      return(<ItemIcon item={item} onSelectedItem={this.props.onSelectedItem} key={index} selectIcon={this.props.selectIcon}/>);
  }

}
