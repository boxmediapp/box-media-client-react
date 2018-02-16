import React, {Component} from 'react';
import {styles} from "./styles";

export default class CuePointEditor extends Component{

  constructor(props){
    super(props);
    var cuepoint=this.buildValues(this.props.cueToEdit);
    this.state={cuepoint};
  }
  componentWillReceiveProps(nextProps){
      if(this.state.cueToEdit!=nextProps.cueToEdit){
          var cuepoint=this.buildValues(nextProps.cueToEdit);
          this.setState({cuepoint});
      }
  }

  buildValues(cueToEdit){
       var cuepoint={name:"",type:"",time:"",code:"",materialId:"",
                mediaType:"",duration:"",
                numberOfAds:"",artist:"",track:"",
                certification:"",force_stop:""};

      if(cueToEdit){
            cuepoint=Object.assign({},cuepoint,cueToEdit);
            if(cueToEdit.metadata){
              cuepoint=Object.assign(cuepoint,cueToEdit.metadata);
            }
      }
      return cuepoint;
  }

onUpdate(){
  var cueToEdit=this.props.cueToEdit;
  var {name,type,time,code,force_stop}=this.state.cuepoint;
  cueToEdit=Object.assign(cueToEdit,{name,type,time,code,force_stop});
  var {materialId,mediaType,duration,numberOfAds,artist,track,certification}=this.state.cuepoint;
  cueToEdit.metadata={materialId,mediaType,duration,numberOfAds,artist,track,certification};
  this.props.onUpdate(cueToEdit);
}

onCancel(){
  this.props.onCancel();
}
onDelete(){
    this.props.onDelete(this.props.cueToEdit);
}

  setTime(time){
      var cuepoint=Object.assign({},this.state.cuepoint,{time});
      this.setState({cuepoint});
 }
 setType(type){
      var cuepoint=Object.assign({},this.state.cuepoint,{type});
      this.setState({cuepoint});
 }
setNumberOfAds(numberOfAds){
  var cuepoint=Object.assign({},this.state.cuepoint,{numberOfAds});
  this.setState({cuepoint});
}
setName(name){
  var cuepoint=Object.assign({},this.state.cuepoint,{name});
  this.setState({cuepoint});
}
setDuration(duration){
  var cuepoint=Object.assign({},this.state.cuepoint,{duration});
  this.setState({cuepoint});
}
setMaterialId(materialId){
  var cuepoint=Object.assign({},this.state.cuepoint,{materialId});
  this.setState({cuepoint});
}
setCode(code){
  var cuepoint=Object.assign({},this.state.cuepoint,{code});
  this.setState({cuepoint});
}
setForce_stop(force_stop){
  var cuepoint=Object.assign({},this.state.cuepoint,{force_stop});
  this.setState({cuepoint});
}
setArtist(artist){
  var cuepoint=Object.assign({},this.state.cuepoint,{artist});
  this.setState({cuepoint});
}
setTrack(track){
  var cuepoint=Object.assign({},this.state.cuepoint,{track});
  this.setState({cuepoint});
}
setCertification(certification){
  var cuepoint=Object.assign({},this.state.cuepoint,{certification});
  this.setState({cuepoint});
}
setMediaType(mediaType){
  var cuepoint=Object.assign({},this.state.cuepoint,{mediaType});
  this.setState({cuepoint});
}

renderDeleteButton(){
    if(this.state.cuepoint.id || this.state.cuepoint.id ===0){
          return(
            <div style={styles.buttonContainer}>
                  <a className="btn btn-primary btn-normal" onClick={this.onDelete.bind(this)}>
                      <div style={styles.buttonLabel}>Delete</div>
                    </a>
              </div>
          );
    }
    else{
      return null;
    }

}


  render(){
    var cuepoint=this.state.cuepoint;

    var updateButtonLabel="Add";

    if(cuepoint.id || cuepoint.id ===0){
          updateButtonLabel="Update";
    }

      return(
        <div id="cueEditor" style={styles.cueEditor}>
              <div style={styles.title}>Cue Editor</div>
              <div className="row">
                  {this.renderDeleteButton()}
                  <div style={styles.buttonContainer}>
                        <a className="btn btn-primary btn-normal" onClick={this.onUpdate.bind(this)}>
                            <div style={styles.buttonLabel}>{updateButtonLabel}</div>
                          </a>
                    </div>
                    <div style={styles.buttonContainer}>
                        <a className="btn btn-primary btn-normal" onClick={this.onCancel.bind(this)}>
                            <div style={styles.buttonLabel}>Cancel</div>
                        </a>
                    </div>
              </div>
              <div className="row">
                    <div className="col s6">
                          <div style={styles.inputField}>
                              <label style={styles.label}>Time</label>
                              <input  id="cueTime" type="number" value={cuepoint.time} onChange={(evt) => {
                              this.setTime(evt.target.value);
                            }}/>
                          </div>
                    </div>
                    <div className="col s6">
                        <div style={styles.inputField}>
                              <label style={styles.label}>Type</label>
                               <select  id="cueType" value={cuepoint.type} onChange={(evt) => {
                               this.setType(evt.target.value);
                             }}>
                                <option value="AD" checked>AD</option>
                                <option value="CODE">CODE</option>
                             </select>
                        </div>
                    </div>
              </div>
              <div className="row">
                      <div className="col s6">
                          <div style={styles.inputField}>
                            <label style={styles.label}>No. Ads</label>
                            <input  id="numberOfAds" type="number" onChange={(evt) => {
                            this.setNumberOfAds(evt.target.value);
                          }} value={cuepoint.numberOfAds}/>
                         </div>

                    </div>
                    <div className="col s6">
                      <div style={styles.inputField}>
                        <label style={styles.label}>Name</label>
                          <input  id="cueName" type="text" onChange={(evt) => {
                          this.setName(evt.target.value);
                        }} value={cuepoint.name}/>
                        </div>
                    </div>
              </div>
              <div className="row">
                        <div className="col s6">
                            <div style={styles.inputField}>
                                  <label style={styles.label}>Duration</label>
                                  <input  id="cueDuration" type="text" onChange={(evt) => {
                                  this.setDuration(evt.target.value);
                                }} value={cuepoint.duration}/>
                            </div>
                        </div>
                        <div className="col s6">
                            <div style={styles.inputField}>
                                <label style={styles.label}>Mat. Id</label>
                                <input  id="materiaId" type="text"  onChange={(evt) => {
                                this.setMaterialId(evt.target.value);
                              }} value={cuepoint.materialId}/>
                            </div>

                      </div>
              </div>

              <div className="row">
                    <div className="col s6">
                          <div style={styles.inputField}>
                              <label style={styles.label}>Code</label>
                              <input  id="cueCode" type="text" onChange={(evt) => {
                              this.setCode(evt.target.value);
                            }} value={cuepoint.code}/>
                          </div>
                    </div>
                    <div className="col s6">
                        <div style={styles.inputField}>
                            <label style={styles.label}>Force Stop</label>
                            <select  id="corceStop" onChange={(evt) => {
                            this.setForce_stop(evt.target.value);
                          }} value={cuepoint.force_stop} >
                                    <option value="" disabled>Choose the option</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                            </select>
                        </div>

                    </div>
              </div>
              <div className="row">
                  <div className="col s6">
                      <div style={styles.inputField}>
                          <label style={styles.label}>Artist</label>
                          <input  id="artist" type="text" onChange={(evt) => {
                          this.setArtist(evt.target.value);
                        }} value={cuepoint.artist} />
                      </div>
                    </div>
                    <div className="input-field col s6">
                        <div style={styles.inputField}>
                                <label style={styles.label}>Track</label>
                                <input  id="cueTrack" type="text" onChange={(evt) => {
                                this.setTrack(evt.target.value);
                              }} value={cuepoint.track}/>
                        </div>
                    </div>
              </div>
              <div className="row">
                      <div className="col s6">
                            <div style={styles.inputField}>
                                  <label style={styles.label}>Certification</label>
                                  <input  id="certification" type="text" onChange={(evt) => {
                                  this.setCertification(evt.target.value);
                                }} value={cuepoint.certification}/>
                            </div>
                     </div>
                     <div className="col s6">
                           <div style={styles.inputField}>
                               <label style={styles.label}>Media Type</label>
                               <input  id="mediaType" type="text" onChange={(evt) => {
                               this.setMediaType(evt.target.value);
                             }} value={cuepoint.mediaType}/>
                           </div>
                    </div>

              </div>
      </div>);



  }
}
