import React from 'react';
import request from 'superagent'

class Note extends React.Component {
  constructor() {
    super()
    this.state = {
      body: {},
      isSharePage: true,
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedEntity.noteId !== this.props.selectedEntity.noteId) {
      const {noteId} = nextProps.selectedEntity;
      if (!noteId) {
        return;
      }
      request
        .get(`/api/v1/getNoteDetails/${window.userId}/${noteId}`)
        .then(response => {
          this.setState({
            body: response.body
          });
        }).catch(error => {
        })    
    }
  }

  componentDidMount() {
    const selectedEntity = this.props.selectedEntity || {};
    const windowSearch = window.location.search
    const id = windowSearch.split("?id=")[1]
    const {noteId} = selectedEntity;
    if (id && window.location.href.indexOf("/share") >= 0) {
      request
        .get(`/api/v1/getNoteDetailsByUrl/${id}`)
        .then(response => {
          this.setState({
            body: response.body,
            isSharePage: true
          });
        }).catch(error => {
        })   
      return      
    }
    request
      .get(`/api/v1/getNoteDetails/${window.userId}/${noteId}`)
      .then(response => {
        this.setState({
          body: response.body,
          isSharePage: false

        });
      }).catch(error => {
      })    
  }
  render() {
    const { data, status } = this.state.body
    const title = this.state
    const url = data && data[0] && data[0].url
    return (
      <div className='show-note'>
        <div className='title-block'>
          <div className='title-head'>Title:&nbsp;</div>
          <div className='title'>
            {data && data[0] && data[0].title}
            &nbsp;
            {!this.state.isSharePage &&
              <a href={`/share?id=${url}`} target="_blank">(Share)</a>
            }
          </div>
        </div>
        <div className='content-block'>
          <h4>Content:</h4>
          <div
            id='content'
            dangerouslySetInnerHTML={{ __html: data && data[0] && decodeURI(data[0].content) || null}}
            className='content'
          />
        </div>
        {!this.state.isSharePage &&
          <div className='edit-btn-block'>
            <button className='edit-btn u-cushion--all' onClick={this.props.onEditNoteClick}>Edit note</button>      
          </div>   
        }     
      </div>
    )
  }
}

export default Note;