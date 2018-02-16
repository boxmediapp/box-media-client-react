import React, {Component} from 'react'

import {Table, Column, Cell} from "fixed-data-table-2";
import {textValues} from "../configs";
import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'
import {styles} from "./styles";
export  default class ListCuePoints extends Component {

  render(){
    if(this.props.episode.cuepoints){
          return this.renderCuePoints(this.props.episode);
    }
    else{
          return null;
    }
  }
  onEditCuePoint(cueueToEdit){
      this.props.onEditCuePoint(this.props.episode, cueueToEdit);
  }

  renderCuePoints(episode){
    var data={episode,onEditCuePoint:this.onEditCuePoint.bind(this)};
    return(
               <Table
                 rowHeight={50}
                 headerHeight={50}
                 rowsCount={data.episode.cuepoints.length}
                 maxHeight={500} width={1100}

                 >
                 <Column
                          columnKey="id"
                          header={<Cell>Actions</Cell>}
                          width={100}
                          cell={<ActionCell data={data}/>}

                />


                 <Column
                          columnKey="time"
                          header={<Cell>Time</Cell>}
                          width={100}
                          cell={<CueTextCell data={data}/>}

                />
                <Column
                         columnKey="numberOfAds"
                         header={<Cell>Number Of Ads</Cell>}
                         width={100}
                         cell={<CueMetadataTextCell data={data}/>}

               />
                <Column
                         columnKey="duration"
                         header={<Cell>Duration</Cell>}
                         width={100}
                         cell={<CueMetadataTextCell data={data}/>}

               />
                <Column
                         columnKey="type"
                         width={100}
                         header={<Cell>Type</Cell>}
                         cell={<CueTextCell data={data}/>}

               />


                 <Column
                          columnKey="name"
                          width={100}
                          header={<Cell>Name</Cell>}
                          cell={<CueTextCell data={data}/>}
                />

                <Column
                        columnKey="code"
                        width={100}
                        header={<Cell>Code</Cell>}
                        cell={<CueTextCell data={data}/>}
                />
                <Column
                        columnKey="materialId"
                        width={100}
                        header={<Cell>Material Id</Cell>}
                        cell={<CueMetadataTextCell data={data}/>}
                />

                <Column
                        columnKey="mediaType"
                        width={100}
                        header={<Cell>Media Type</Cell>}
                        cell={<CueMetadataTextCell data={data}/>}
                />


                <Column
                        columnKey="artist"
                        width={100}
                        header={<Cell>Artist</Cell>}
                        cell={<CueMetadataTextCell data={data}/>}
                />
                <Column
                        columnKey="track"
                        width={100}
                        header={<Cell>Track</Cell>}
                        cell={<CueMetadataTextCell data={data}/>}
                />
                <Column
                        columnKey="certification"
                        width={100}
                        header={<Cell>Certification</Cell>}
                        cell={<CueMetadataTextCell data={data}/>}
                />


        </Table>
     );
  }



}

class CueTextCell extends Component {
  render() {

    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
        {data.episode.cuepoints[rowIndex][columnKey]}
      </Cell>
    );
  }
}


class CueMetadataTextCell extends Component {
  render() {

    const {data, rowIndex, columnKey, ...props} = this.props;
    if(data.episode.cuepoints[rowIndex].metadata){
      return (
        <Cell {...props}>
          {data.episode.cuepoints[rowIndex].metadata[columnKey]}
        </Cell>
      );
    }
    else{
      return(
            <Cell {...props}></Cell>
      );
    }

  }
}



class ActionCell extends Component {
  render() {

    const {data, rowIndex, ...props} = this.props;
      return (
        <Cell {...props}>
            <a className="btn btn-primary btn-normal" onClick={evt=>{
                  data.onEditCuePoint(data.episode.cuepoints[rowIndex]);
            }}>
              Edit
            </a>
        </Cell>
      );


  }
}
