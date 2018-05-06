import React from 'react';
import List from './List';
import FolderList from './FolderList';

const Collection = props => {
  const {notes, folders} = props;
  const notesKey = Object.keys(notes);
  const foldersKey = Object.keys(folders);

  return (
    <div className='u-cushion--all'>
      <div className='u-spacer--top'>
        <div className='u-bold'>Notes</div>
        <div className=''>
          <List items={notes} onClick={props.onNoteClick}/>
        </div>
      </div>
      <div className=''>
        <div className='u-spacer--top'>
          <span className='u-bold '>Folders</span>
          <span className='u-float--right u-bold c-plus-icon' onClick={props.addFolder} title='Add new folder'>&#x2b;</span>
        </div>
        <div className=''>
          <FolderList items={folders} onClick={props.onFolderClick} onNoteClick={props.onNoteClick}/>          
        </div>      
      </div>      
    </div>
  )
}

export default Collection;