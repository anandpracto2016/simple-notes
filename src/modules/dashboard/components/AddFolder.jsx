import React from 'react';
import request from 'superagent'

class AddFolder extends React.Component {
  constructor() {
    super()
    this.saveFolder = this.saveFolder.bind(this)
  }
  saveFolder() {
    const folderName = document.getElementById('addName').value;
    if (!folderName) {
      window.alert('Please add a folder name');
      return;
    }
    
    const payload = {
      name: folderName
    }
    request
      .post(`/api/v1/createFolder/${window.userId}`)
      .send(payload)
      .then(response => {
        window.location.reload();
      }).catch(error => {
      })
  }
  render() {
    return (
      <div className='add-folder'>
        <h4>Add New Folder:</h4>
        <input
          type='text'
          name='addName'
          id='addName'
          placeholder='Enter Name'
          className='name'
          autofocus
        />
        <div className='save-btn'>
          <button className='u-d-inline-block' onClick={this.saveFolder}>Save</button>
        </div>
      </div>
    )
  }
}

export default AddFolder;