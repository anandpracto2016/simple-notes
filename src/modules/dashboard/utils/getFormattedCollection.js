export const formattedNotes = notes => {
  const editedNotes = {};

  notes.map(note => {
    const {id, title, content, url, folder_id} = note;
    editedNotes[id] = {
      id,
      folder_id,
      name: title,
      title,
      content,
      url
    }
  });

  return editedNotes;
}

export const formattedFolders = folders => {
  const editedFolders = {};
  
  folders.map(folder => {
    const {id, name, notes} = folder;
    editedFolders[id] = {
      id,
      name
    }
  })

  return editedFolders;
}

export default  function(data) {
  let result = {
    notes: {},
    folders: {}
  }

  result.notes = formattedNotes(data.notes);
  result.folders = formattedFolders(data.folders);
  
  return result;
}