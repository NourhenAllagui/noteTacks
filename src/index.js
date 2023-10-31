import './style.css';

const container = document.querySelector('.container');
const form = document.querySelector('form');
const inputTitle = document.querySelector('#notetitle');
const inputContent = document.querySelector('.noteContent');


const notes = [
  {
    title: "learn Javascript",
    noteContent: "finish chap 14 & 15",
    important: true
  },
  {
    title: "don't forget",
    noteContent: "todo the exercices",
    important: true
  }
]

form.addEventListener("submit", event => {
  event.preventDefault();
  const value1 = inputTitle.value;
  const value2 = inputContent.value;
  addNote(value1, value2);
  inputTitle.value = '';
  inputContent.value = '';
})

const dispalyNotes = () => {
  const notesNode= notes.map((note, index) => {
    return createNotesElement(note, index);
  })
  container.innerHTML = '';
  container.append(...notesNode);
}

const createNotesElement = (note, index) => {
  const div = document.createElement('div');
  div.className= 'item';
  div.innerHTML = `
  <span>${note.title}</span>
  <p>${note.noteContent}</p>
  </div>
  `
  return div;
}

const addNote = (title, noteContent) => {
  notes.push({
    title: title,
    noteContent: noteContent,
    important: false
  })
  dispalyNotes();
}

dispalyNotes();