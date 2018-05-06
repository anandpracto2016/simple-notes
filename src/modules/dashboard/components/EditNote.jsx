import React from 'react';
import request from 'superagent'

const contentId = 'editContent'

class EditNote extends React.Component {
  constructor() {
    super()
    this.saveNotes = this.saveNotes.bind(this);
    this.state = {
      data: {},
      status: null,
    }
  }
  componentDidMount() {
    const selectedEntity = this.props.data.selectedEntity;
    const {noteId} = selectedEntity;
    console.log(selectedEntity);
    
    request
      .get(`/api/v1/getNoteDetails/${window.userId}/${noteId}`)
      .then(response => {
        console.log("response")
        console.log(response)
        this.setState({
          data: response.body.data && response.body.data[0],
          status: response.body.status
        });
        document.getElementById(contentId).innerHTML = decodeURI(response.body.data && response.body.data[0].content)
      }).catch(error => {
      })
  }
  saveNotes() {
    const selectedEntity = this.props.data.selectedEntity;
    const {noteId} = selectedEntity;
    const title = document.getElementById('title').value;
    const content = document.getElementById(contentId).innerHTML;
    const payload = {
      title,
      content,
      id: noteId
    }
    request
      .patch("/api/v1/updateNote")
      .send(payload)
      .then(response => {
        window.alert("Note saved successfully")
        window.location.reload()
      }).catch(error => {
      })
  }
  uploadImage() {
    const x = document.getElementById(contentId)
    const y = document.getElementById('editImage').value
    const image = `${`<img src=${y} />`}`
    x.innerHTML += image
  }
  render() {
    return (
      <div className='edit-note'>
        <h4>Edit Note:</h4>
        <input
          type='text'
          name='title'
          id='title'
          value={this.state.data.title || null}
          className='title'
        /><br/>
        <div
          contentEditable="true"
          name={contentId}
          id={contentId}
          className='content'
        />
        {/*<textarea rows="4" cols="50" name='content' id='content'></textarea><br/>*/}
        <div className='image-block'>
          <input type='text' id='editImage' className='image' />
          <button className='u-d-inline-block' onClick={this.uploadImage}>Upload</button>
        </div>
        <div className='save-btn'>
          <button className='u-d-inline-block' onClick={this.saveNotes}>Save</button>
        </div>
        
      </div>
    )
  }
}

export default EditNote;
