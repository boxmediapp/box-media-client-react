import React, {Component} from 'react'

import {Table, Column, Cell} from "fixed-data-table-2";
import {textValues} from "../configs";
import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'
import {styles} from "./styles";
export  default class ListVideoFiles extends Component {

    render(){
        var {videofiles,onLoadLoadNextPage,onPlayVideo}=this.props;
        if(videofiles){
          return this.renderVideoFiles(videofiles,onLoadLoadNextPage,onPlayVideo);
        }
        else{
          return null;
        }

    }

  renderVideoFiles(videofiles,onLoadLoadNextPage,onPlayVideo){
    var data={videofiles, onLoadLoadNextPage,onPlayVideo};

    return(
      <div className="content">
               <Table
                 rowHeight={50}
                 headerHeight={50}
                 rowsCount={videofiles.length}
                 width={1000}
                 height={1000}>

                 <Column
                          columnKey="file"
                          header={<Cell>File</Cell>}
                          cell={<TextCell data={data}/>}
                          width={200}
                          fixed={true}
                         />

                <Column
                          columnKey="episodeTitle"
                          header={<Cell>Episode Title</Cell>}
                          cell={<EpisodeLinkCell data={data}/>}
                          width={300}
                          fixed={true}
                          />
                <Column
                      columnKey="lastModifidDate"
                      header={<Cell>Last Modified</Cell>}
                      cell={<DateCell data={data}/>}
                      width={200}
                      fixed={true}
                      />
                <Column
                    columnKey="durationError"
                    header={<Cell>Duration Error</Cell>}
                    cell={<TextCell data={data}/>}
                    width={150}
                    fixed={true}
                    />

                    <Column
                        columnKey="id"
                        header={<Cell></Cell>}
                        cell={<PlayVideoCell data={data}/>}
                        width={200}
                        fixed={true}
                        />



        </Table>
    </div>
     );
  }



}



class TextCell extends Component {
  render() {

    const {data, rowIndex, columnKey, ...props} = this.props;
    if(data.videofiles.length && (rowIndex+10)>=data.videofiles.length){
      this.props.data.onLoadLoadNextPage();
    }
    return (
      <Cell {...props}>
        {data.videofiles[rowIndex][columnKey]}
      </Cell>
    );
  }
};
class DateCell extends Component {
  render() {

    const {data, rowIndex, columnKey, ...props} = this.props;
    if(data.videofiles.length && (rowIndex+10)>=data.videofiles.length){
      this.props.data.onLoadLoadNextPage();
    }
    var datestring="";
    var timestamp=data.videofiles[rowIndex][columnKey];
    if(timestamp){
        var datevalue=new Date(timestamp);
        datestring=datevalue.getDate()+"/"+(datevalue.getMonth()+1)+"/"+datevalue.getFullYear()+" "+datevalue.getHours()+":"+datevalue.getMinutes()+":"+datevalue.getSeconds();
    }



    return (
      <Cell {...props}>
        {datestring}
      </Cell>
    );
  }
};

class EpisodeLinkCell extends Component {
  render() {

    const {data, rowIndex, columnKey, ...props} = this.props;
    if(data.videofiles.length && (rowIndex+10)>=data.videofiles.length){
      this.props.data.onLoadLoadNextPage();
    }
    if(data.videofiles[rowIndex].episodeId){
      return (
        <Cell {...props}>
          <a href={textValues.editEpisode.applink(data.videofiles[rowIndex].episodeId)}>
              {data.videofiles[rowIndex][columnKey]}
          </a>
        </Cell>
      );
    }
    else{
      return(
        <Cell {...props}></Cell>
      );

    }

  }
};



class PlayVideoCell extends Component {
  render() {

    const {data, rowIndex, columnKey, ...props} = this.props;
    if(data.videofiles[rowIndex].episodeId){
      return (
        <Cell {...props}>
          <a onClick={evt=>{this.props.data.onPlayVideo(data.videofiles[rowIndex])}} className="btn btn-primary btn-normal">Play</a>
        </Cell>
      );
    }
    else{
      return(
        <Cell {...props}></Cell>
      );

    }

  }
};
