
import React, {Component} from "react";
import {styles} from './styles';
import "./styles/BigButton.css";
import {
  Link

} from 'react-router-dom'

export default class BigButton extends Component {


  renderText(){
        return (
           <div className="round-button-container">
                <div className="round-button">
                   <div className="round-button-circle">
                     <Link to={this.props.link} className="round-button">
                      {this.props.label}
                        </Link>
                   </div>
                </div>
               <div className="rount-button-label">{this.props.content}</div>
           </div>
        );
  }
  renderRedirectText(){
        return (
           <div className="round-button-container">
                <div className="round-button">
                   <div className="round-button-circle">
                     <a href={this.props.redirect} className="round-button">
                      {this.props.label}
                    </a>
                   </div>
                </div>
               <div className="rount-button-label">{this.props.content}</div>
           </div>
        );
  }
  renderImageIcon(){

    return (
       <div className="round-button-container">
                 <Link to={this.props.link} className="round-button">
                    <img src={this.props.icon} style={styles.iconImage}/>
                  </Link>
           <div className="rount-button-label">{this.props.content}</div>
       </div>
    );
  }
  renderRedirectImageIcon(){
    return (
       <div className="round-button-container">
                 <a  href={this.props.redirect} className="round-button">
                    <img src={this.props.icon} style={styles.iconImage}/>
                  </a>
           <div className="rount-button-label">{this.props.content}</div>
       </div>
    );
  }
    render(){
        if(this.props.icon){
            if(this.props.redirect){
              return this.renderRedirectImageIcon();
            }
            else{
                return this.renderImageIcon();
            }
        }
        else{
            if(this.props.redirect){
              return this.renderRedirectText();
            }
            else{
                return this.renderText();
            }

        }
    }

}
