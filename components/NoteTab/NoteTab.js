const { ipcRenderer } = require('electron');

ipcRenderer.on('note-data', (event, note) => {
    const noteTitle = document.getElementById('noteTitle');
    const noteText = document.getElementById('noteText');
    const noteDate = document.getElementById('noteDate');
    const noteAuthor = document.getElementById('noteAuthor');
    const noteRole = document.getElementById('noteRole');

    noteTitle.textContent = note.titel;
    noteText.textContent = note.text;
    
    const noteDateTime = new Date(note.at_date);
    noteDate.textContent = noteDateTime.toLocaleDateString();
    
    noteAuthor.textContent = note.first_name + ' ' + note.last_name;
    noteRole.textContent = note.role;
});

