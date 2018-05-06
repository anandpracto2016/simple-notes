import React from 'react';
import {connect} from 'react-redux';
import AddNote from '../components/AddNote';


const getFoldersList = (folders) => {
  let result = [];
  let folderKeys = Object.keys(folders);

  folderKeys.map(key => {
    let el = {
      id: key,
      value: folders[key].name
    }
    result.push(el);
  })

  return result;
}

const mapStateToProps = (state) => {
  const foldersList = getFoldersList(state.dashboard.folders);
  return {
    foldersList
  }  
}

const mapDispatchToProps = (dispatch) => {

  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNote);