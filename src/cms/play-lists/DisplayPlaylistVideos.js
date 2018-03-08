import React, {Component} from 'react'
import {Table, Column, Cell} from "fixed-data-table-2";
import {AppHeader,ModalDialog,LoadingIcon,ItemIconList,SelectionModalDialog} from "../../components";
import {textValues,localImages} from "../../configs";
import {api} from "../../api";
import {genericUtil} from "../../utils";
import {styles} from "./styles";

var ACTIONS={
    LIST_EPISODE_PLAYLIST:1
}

export default class DisplayPlaylistVideos extends Component{
  constructor(props){
        super(props);
        this.state={loading:true,videos:[]};
  }
  componentWillMount(){
      this.loadItems(this.props.playlistid);

  }
  componentWillReceiveProps(nextprops){
    if(nextprops.playlistid!==this.props.playlistid){
        this.setState(Object.assign({}, this.state,{loading:false}));
        this.loadItems(nextprops.playlistid);
    }
  }
  onError(error){
    this.props.onError(error);
  }


  loadItems(playlistid){
              api.loadPlaylistVideos(playlistid).then(videos=>{
                  this.setState(Object.assign({}, this.state,{videos,loading:false}));
              }).catch(error=>{
                  this.onError(error);
              });
  }

    render(){
      var videos=this.state.videos;

        return (
                  <Table
                   rowHeight={100}
                   headerHeight={50}
                   rowsCount={videos.length}
                   width={1200}
                   height={800}>

                   <Column
                     columnKey="thumbnail"
                     data={videos}
                     header={<Cell></Cell>}
                     cell={<ThumbnailCell data={videos}/>}
                     width={300}
                     />
                         <Column
                           columnKey="name"
                           data={videos}
                           header={<Cell>Name</Cell>}
                           cell={<VideoNameCell data={videos}/>}
                           width={300}
                           />
                   <Column
                          columnKey="state"
                          data={videos}
                          header={<Cell>State</Cell>}
                          cell={<VideoStateCell data={videos}/>}
                           width={300}
                             />

                  <Column
                                    columnKey="reference_id"
                                    data={videos}
                                    header={<Cell>Reference ID</Cell>}
                                    cell={<TextCell data={videos}/>}
                                     width={300}
                                       />
                  </Table>

                );

    }
}
class ThumbnailCell extends Component {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    var imageURL=null;

    if(data[rowIndex].bcvideoData.images && data[rowIndex].bcvideoData.images.thumbnail && data[rowIndex].bcvideoData.images.thumbnail.src){
          imageURL=data[rowIndex].bcvideoData.images.thumbnail.src;
    }
    else if(data[rowIndex].bcvideoData.images && data[rowIndex].bcvideoData.images.poster && data[rowIndex].bcvideoData.images.poster.src){
          imageURL=data[rowIndex].bcvideoData.images.poster.src;
    }
    if(!imageURL){
      return null;
    }
    return (
      <Cell {...props}>
            <img style={styles.thumbnail} src={imageURL}/>
      </Cell>
    );
  }
}

class VideoNameCell extends Component {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;

    return (
      <Cell {...props}>
          {data[rowIndex].bcvideoData.name}
      </Cell>
    );
  }
}

class VideoStateCell extends Component{
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    var stateStyle=styles.inactivateState;

    if(data[rowIndex].bcvideoData.state==='ACTIVE'){
      stateStyle=styles.activateState;
    }
    return (
      <Cell {...props}>
          <div style={stateStyle}>{data[rowIndex].bcvideoData.state}</div>
      </Cell>
    );
  }

}

class TextCell extends Component{
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
          <div>{data[rowIndex].bcvideoData[columnKey]}</div>
      </Cell>
    );
  }

}
