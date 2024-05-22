const notesListEl = document.querySelector(".notes-list");

const saveButtonEl = document.querySelector(".save-note");
const deleteButtonEl = document.querySelector(".delete-note");
const newNoteButtonEl = document.querySelector(".create-new");
const titleInputEl = document.querySelector("#title-input");
const contentInputEl = document.querySelector("#content-input");

saveButtonEl.addEventListener("click", clickSaveButton);
newNoteButtonEl.addEventListener("click", newNote);
deleteButtonEl.addEventListener("click", clickDeleteButton);



displayNotesList();
applyListeners();

function applyListeners(){
    const noteEntryEls = document.querySelectorAll(".note-entry");
noteEntryEls.forEach((noteEntryEl) => {
    noteEntryEl.addEventListener("click", () => {
        selectNote(noteEntryEl.getAttribute("data-id"));
    })
});
}

function displayNotesList(){
    //replace with actual data
    // const notes = MOCK_NOTES;
    const notes = getNotes();

    //sort by last updated!!!!
    const sortedNotes = notes.sort((noteA, noteB) => noteB.lastUpdated - noteA.lastUpdated);
    let html = "";

    sortedNotes.forEach((note) => {
        html += `
            <div class="note-entry" data-id="${note.id}" >
                <div class="note-title">${escapeHtml(note.title)}</div>
                <div class="note-content-teaser">${escapeHtml(note.content)}</div>
                <div class="note-date">${new Date(note.lastUpdated).toLocaleString(`de-DE`)}</div>
            </div>
        `;
    });

    notesListEl.innerHTML = html;
}

function clickSaveButton(){
    const title = titleInputEl.value;
    const content = contentInputEl.value;

    if(!title || !content){
        alert("Please enter a title and content");
        return;
    }


    saveNotes(title, content, Number(getCurrentlySelectedId()));

    
    titleInputEl.value = "";
    contentInputEl.value = "";

    displayNotesList();
    applyListeners();

}

function clickDeleteButton(){
    const currentlySelectedId = getCurrentlySelectedId();
    if(!currentlySelectedId) return;

    deleteNote(currentlySelectedId);

    titleInputEl.value ="";
    contentInputEl.value ="";

    displayNotesList();
    applyListeners();

}

function selectNote(id){
    const selectedNoteEl = document.querySelector(`.note-entry[data-id="${id}"]`);

    if(selectedNoteEl.classList.contains("selected-note")) return;

    removeSelectedClassFromAllNotes();

    selectedNoteEl.classList.add("selected-note");

    const notes = getNotes();
    const selectedNote = notes.find((note) => note.id === Number(id));
    if(!selectedNote) return;

    titleInputEl.value = selectedNote.title;
    contentInputEl.value = selectedNote.content;

}

function newNote(){
    titleInputEl.value ="";
    contentInputEl.value ="";
    removeSelectedClassFromAllNotes();
}

function removeSelectedClassFromAllNotes(){
    const noteEntriesEls = document.querySelectorAll(`.note-entry`);
    noteEntriesEls.forEach((noteEntry) => {
        noteEntry.classList.remove("selected-note");
    });
}

function getCurrentlySelectedId(){
    let currentId = undefined;

    const currentlySelectedNoteEl = document.querySelector(".selected-note");

    if(currentlySelectedNoteEl){
        currentId = currentlySelectedNoteEl.getAttribute("data-id");
    }

    return currentId;
}


function escapeHtml(unsafe)
{
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }