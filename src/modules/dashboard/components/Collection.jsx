import React from 'react';
import List from './List';
import FolderList from './FolderList';

const Collection = props => {
  const {notes, folders} = props;
  const notesKey = Object.keys(notes);
  const foldersKey = Object.keys(folders);

  return (
    <div>
      <div className='u-spacer--top'>
        <div className='u-bold'>Notes</div>
        <div className=''>
          <List items={notes} onClick={props.onNoteClick}/>
        </div>
      </div>
      <div className=''>
        <div className='u-bold u-spacer--top'>Folders</div>
        <div className=''>
          <FolderList items={folders} onClick={props.onFolderClick} onNoteClick={props.onNoteClick}/>          
        </div>      
      </div>      
    </div>
  )
}

export default Collection;