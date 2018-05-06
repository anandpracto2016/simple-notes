import React from 'react';
import List from './List';

const FolderList = (props) => {
  const items = props.items;
  const itemKeys = Object.keys(items);

  return (
    <div>
      {itemKeys.map(key => {
        const item = items[key];
        const notesList = item.notes || [];
        const folderId = item.id;
        const name = item.name;
        return (
          <div onClick={props.onClick.bind(null, folderId)} className='u-cushion--all u-cursor-pointer'>
            <div className=''>{name}</div>
            <div>
              <List items={notesList} onClick={props.onNoteClick}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FolderList;