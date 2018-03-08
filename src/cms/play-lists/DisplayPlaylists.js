import React, {Component} from 'react';
import {Table, Column, Cell} from "fixed-data-table-2";
import {
  Link

} from 'react-router-dom'

import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {styles} from "./styles";
import {localImages,textValues} from "../../configs";


export default class DisplayPlaylists extends Component{
  constructor(props){
    super(props);
    this.state={sortBy:"type",reverse:false,playlists:[]};
  }
  componentWillMount(){
      this.setPlaylists(this.props);
  }
  componentWillReceiveProps(nextprops){
    if(nextprops.playlists!==this.props.playlists){
        this.setPlaylists(nextprops);
    }
  }

  sortPlayList(playlists, sortBy, reverse){
          if(sortBy==='type'){
                    playlists.sort((p1,p2) =>{
                            if(p1.playListData.type === 'EXPLICIT' && p2.playListData.type !== 'EXPLICIT'){
                                    return -1;
                            }
                            else if(p1.playListData.type !== 'EXPLICIT' && p2.playListData.type === 'EXPLICIT'){
                                    return 1;
                            }
                            else{
                                var cc=p1.playListData.type.localeCompare(p2.playListData.type);
                                if(cc<0){
                                  return -1;
                                }
                                else if(cc>0){
                                  return 1;
                                }
                                else{
                                      var cc=p1.playListData.name.localeCompare(p2.playListData.name);
                                      if(cc<0){
                                        return -1;
                                      }
                                      else if(cc>0){
                                        return 1;
                                      }
                                      else{
                                        return 0;
                                      }
                                }

                            }

                    });
                    if(reverse){
                        playlists.reverse();
                    }

          }
          else if(sortBy==='name'){
                    playlists.sort((p1,p2) =>{
                                return p1.playListData.name.localeCompare(p2.playListData.name);
                    });
                    if(reverse){
                        playlists.reverse();
                    }

          }
          else if(sortBy==='videoCount'){
                    playlists.sort((p1,p2) =>{
                                return p1.videoCount-p2.videoCount;
                    });
                    if(reverse){
                        playlists.reverse();
                    }

          }
          else if(sortBy==='favorite'){
                    playlists.sort((p1,p2) =>{
                                return p1.playListData.favorite-p2.playListData.favorite;
                    });
                    if(reverse){
                        playlists.reverse();
                    }

          }
          else if(sortBy==='updated_at'){
                    playlists.sort((p1,p2) =>{
                                return p1.playListData.updated_at.localeCompare(p2.playListData.updated_at);
                    });
                    if(reverse){
                        playlists.reverse();
                    }

          }

  }
  onChangeSort(sortBy,reverse){
      var playlists=this.state.playlists;
      this.sortPlayList(playlists,sortBy,reverse);
      this.setState(Object.assign({}, this.state,{playlists,sortBy,reverse}));
  }
  setPlaylists(props){
    var playlists=props.playlists;
    this.sortPlayList(playlists, this.state.sortBy, this.state.reverse);
    this.setState(Object.assign({}, this.state,{playlists}));
  }
  render(){
         var  playlists=this.state.playlists;
        return (
                  <Table
                   rowHeight={50}
                   headerHeight={50}
                   rowsCount={playlists.length}
                   width={1300}
                   height={800}>

                         <Column
                           columnKey="name"
                           data={playlists}
                           header={<HeaderCell sortBy={this.state.sortBy}
                           reverse={this.state.reverse} onChangeSort={this.onChangeSort.bind(this)}/>}
                           cell={<PlayListNameCell data={playlists}/>}
                           width={300}

                           />

                          <Column
                             columnKey="type"
                             data={playlists}
                             header={<HeaderCell sortBy={this.state.sortBy} reverse={this.state.reverse} onChangeSort={this.onChangeSort.bind(this)}/>}
                             cell={<PlayListDataCell data={playlists}/>}

                             width={300}
                             />
                             <Column
                                      columnKey="videoCount"
                                      data={playlists}
                                      header={<HeaderCell sortBy={this.state.sortBy} reverse={this.state.reverse} onChangeSort={this.onChangeSort.bind(this)}/>}
                                      cell={<PlayListCell data={playlists}/>}
                                      width={200}
                                                     />

                          <Column
                                columnKey="favorite"
                                data={playlists}
                                header={<HeaderCell sortBy={this.state.sortBy} reverse={this.state.reverse} onChangeSort={this.onChangeSort.bind(this)}/>}
                                cell={<PlayListDataBooleanCell data={playlists}/>}
                                width={200}
                                />


                          <Column
                                      columnKey="updated_at"
                                      data={playlists}
                                      header={<HeaderCell sortBy={this.state.sortBy} reverse={this.state.reverse} onChangeSort={this.onChangeSort.bind(this)}/>}
                                      cell={<PlayListDataCell data={playlists}/>}
                                      width={300}
                                      />


                  </Table>

                );
  }


}


class PlayListNameCell extends Component {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    var iconimg=localImages.smartplaylist;
    if(data[rowIndex].playListData.type==='EXPLICIT'){
      iconimg=localImages.explicitplaylist;
    }
    var editorLink=textValues.playlists.link+"?playlistid="+data[rowIndex].playListData.id;
    return (
      <Cell {...props}>
         <div style={styles.playlistnameContainer}>
            <img src={iconimg} style={styles.playlistIcon}/>

            <Link to={editorLink}>
             {this.props.label}
            </Link>



            <Link to={editorLink} style={styles.playlistname}>
              {data[rowIndex].playListData.name}
            </Link>
         </div>
      </Cell>
    );
  }
}
class PlayListDataCell extends Component {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
              {data[rowIndex].playListData[columnKey]}
      </Cell>
    );
  }
}

class PlayListDataBooleanCell extends Component {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    var displayValue="False";
    if(data[rowIndex].playListData[columnKey]){
        displayValue="True";
    }

    return (
      <Cell {...props}>
              {displayValue}
      </Cell>
    );
  }
}

class PlayListCell extends Component {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
              {data[rowIndex][columnKey]}
      </Cell>
    );
  }
}

class HeaderCell extends Component {
  changeSort(){
        var reverse=this.props.reverse;
        if(this.props.columnKey ===this.props.sortBy){
            reverse=!reverse;
        }
        else{
            reverse=false;
        }
        this.props.onChangeSort(this.props.columnKey,reverse);
  }
  renderSortIcon(columnKey,sortBy,reverse){
      if(columnKey===sortBy){
          var iconUrl=localImages.sortAscending;
          if(reverse){
            iconUrl=localImages.sortDescending;
          }
          return (<img src={iconUrl} style={styles.sortIcon}/>);
      }
      else{
            return null;
      }

  }
  render() {
    const {columnKey, sortBy} = this.props;
    console.log("****sortBy:::"+sortBy);
    var headerTitle="...";
    if(columnKey==='name'){
          headerTitle="Playlist Name";
    }
    else if(columnKey==='type'){
          headerTitle="Type";
    }
    else if(columnKey==='videoCount'){
          headerTitle="Video Count";
    }
    else if(columnKey==='favorite'){
          headerTitle="Favourite";
    }
    else if(columnKey==='updated_at'){
          headerTitle="Updated At";
    }

    return (<Cell>
      <a onClick={this.changeSort.bind(this)} style={styles.sortHeader}>
          {headerTitle}
          {this.renderSortIcon(columnKey, this.props.sortBy, this.props.reverse)}
      </a>

      </Cell>);
  }

}
