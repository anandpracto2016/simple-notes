import React from 'react';

const ListItem = props => {
  const { id, folderId, name } = props;
  return (
    <div onClick={props.onClick.bind(null, id, folderId)} className='u-cushion--all u-cursor-pointer'>
      <div className=''>{name}</div>
    </div>
  )
}

const List = props => {
  const items = props.items;
  const itemKeys = Object.keys(items);
  
  if (!itemKeys.length) return null;

  return (
    <div>
      <div className=''>
        {itemKeys.map((key, index) => (
          <ListItem {...items[key]} index={index} onClick={props.onClick}/>
        ))}
      </div>
    </div>
  )
}

export default List;