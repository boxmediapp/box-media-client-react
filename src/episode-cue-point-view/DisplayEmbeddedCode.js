import React, {Component} from 'react';
import {styles} from "./styles";
import {ModalDialog,ProgressBar} from "../components";
import {api} from "../api";
import {genericUtil,imageUtil} from "../utils";
import {textValues} from "../configs";

import {appdata} from "../store";

var players=[{
    name:"web_player",
    p1:'<div style="position: relative; display: block; max-width: 300px;">\n<div style="padding-top: 56.25%;">\n<iframe src="',
    srcPrefix:'//players.brightcove.net/',
    id:'ry1ZnJMF_default',
    srcSuffix:'/index.html?videoId=',
    srcEnds:'"',
    playAttr:' allowfullscreen webkitallowfullscreen mozallowfullscreen',
    stylePrefix:' style="',
    styles:'position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; width: 100%; height: 100%;',
    ending:'"></iframe></div></div>'
    }
];


export default class DisplayEmbeddedCode extends Component{


   buildPlayer(playerSettings){
     var bcSettings=appdata.getBCSettings();
     var content=playerSettings.p1+playerSettings.srcPrefix+
                 bcSettings.accountId+"/"+playerSettings.id+playerSettings.srcSuffix+
                 this.props.episode.brightcoveId+playerSettings.srcEnds+
                 playerSettings.playAttr+playerSettings.stylePrefix+
                 playerSettings.styles+playerSettings.ending;
      return content;
   }

   copyContent(){
      document.getElementById('playerSourceCode').select();
      document.getElementById("demo");
      document.execCommand("Copy");
   }


  render(){
    var content=this.buildPlayer(players[0]);

      return(
        <div  style={styles.codeContainer}>
              <div style={styles.title}>Brightcove Player Code</div>
        <textarea id='playerSourceCode' style={styles.embeddedCode}>
                          {content}
                      </textarea>

              <div style={styles.playerFooter}>
                <div style={styles.buttonContainer}>
                      <a className="btn btn-primary btn-normal" onClick={this.copyContent.bind(this)}>
                          <div style={styles.buttonLabel}>Copy To Clipboard</div>
                      </a>
                </div>
              </div>




      </div>
    );



  }
}
