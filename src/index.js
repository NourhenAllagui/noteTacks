import './style.css';

const container = document.querySelector('.container');
const form = document.querySelector('form');
const inputTitle = document.querySelector('#notetitle');
const inputContent = document.querySelector('.noteContent');


const notes = [
  {
    title: "Don't forget to be always happy !",
    noteContent: "^-^",
    important: false
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
    if(note.important) {
      return createNotesEditElement(note, index);
    } else {
      return createNotesElement(note, index);
    }
  })
  container.innerHTML = '';
  container.append(...notesNode);
}

const createNotesElement = (note, index) => {
  const div = document.createElement('div');
  div.className= 'item';
  const buttonDelete = document.createElement('button');
  buttonDelete.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  buttonDelete.className = 'btn-delete';
  const buttonEdit = document.createElement("button");
  buttonEdit.className = "btn-edit";
  buttonEdit.innerHTML = `<i class="fa-solid fa-wrench"></i>`;
  buttonDelete.addEventListener('click', event => {
    deleteNote(index);
  })
  buttonEdit.addEventListener("click", event => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  div.innerHTML = `
  <span>${note.title}</span>
  <p>${note.noteContent}</p>
  </div>
  `
  div.append(buttonEdit, buttonDelete);
  return div;
}

const createNotesEditElement = (note, index) => {
  const div = document.createElement('div');
  div.className = "item";
  const inputTitle = document.createElement('input');
  inputTitle.type = 'text';
  inputTitle.classList = 'inputEdit';
  inputTitle.value = note.title;
  const inputContent = document.createElement('input');
  inputContent.type = 'text';
  inputContent.classList = 'inputEdit';
  inputContent.value = note.noteContent;
  const buttonSave = document.createElement("button");
  buttonSave.className = "btn-save";
  buttonSave.innerHTML = `<i class="fa-regular fa-floppy-disk"></i>`;
  const buttonCancel = document.createElement("button");
  buttonCancel.className = "btn-cancel";
  buttonCancel.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  buttonCancel.addEventListener("click", event => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  buttonSave.addEventListener("click", event => {
    editNote(index, inputTitle, inputContent);
  });
  div.append(inputTitle, inputContent, buttonCancel, buttonSave);
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
const deleteNote = (index) => {
  notes.splice(index, 1);
  dispalyNotes();
}
const toggleEditMode = index => {
  notes[index].important = !notes[index].important;
  dispalyNotes();
};
const editNote = (index, inputTitle, inputContent) => {
  const value1 = inputTitle.value;
  const value2 = inputContent.value;
  notes[index].title = value1;
  notes[index].noteContent = value2;
  notes[index].important = false;
  dispalyNotes();
};
dispalyNotes();