import React from 'react';
import request from 'superagent'
import DropDown from './DropDown';
class AddNote extends React.Component {
  constructor() {
    super()
    this.saveNotes = this.saveNotes.bind(this)
  }
  saveNotes() {
    console.log(this);
    
    const title = document.getElementById('addTitle').value;
    const content = document.getElementById('addContent').innerHTML;
    console.log(title, content);
    const payload = {
      title,
      content
    }
    request
      .post(`/api/v1/createNote/${window.userId}`)
      .send(payload)
      .then(response => {
        window.location.reload();
      }).catch(error => {
      })
  }
  uploadImage() {
    const x = document.getElementById('addContent')
    const y = document.getElementById('addImage') && document.getElementById('addImage').value;
    const image = `${`<img src=${y} />`}`
    x.innerHTML += image
  }
  render() {
    return (
      <div className="add-note">
        <h4>Add New Note:</h4>
        <DropDown options={this.props.foldersList}/>
        <input
          type='text'
          name='addTitle'
          id='addTitle'
          placeholder='Enter Title'
          className='title'
        />
        <div
          contentEditable="true"
          name='addContent'
          id='addContent'
          className='content'
        >Enter Content Here</div>
        <div className='image-block'>
          <input type='text' id='addImage' className='image' />
          <button className='u-d-inline-block' onClick={this.uploadImage}>Upload Image</button> 
        </div>      
        <div className='save-btn'>
          <button className='u-d-inline-block' onClick={this.saveNotes}>Save</button>
        </div>
      </div>
    )
  }
}

export default AddNote;
