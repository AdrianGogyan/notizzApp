
const LOCAL_STORAGE_KEY = "notizapp-notizen";

// const MOCK_NOTES = [
//     {
//         id: 1,
//         title: "Notiz 1",
//         content: "Das hier ist ein BeispielNotiz Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, reprehenderit.",
//         lastUpdated: 1716307711006,
//     },
    
//     {
//         id: 2,
//         title: "Notiz 2",
//         content: "Das hier ist ein BeispielNotiz Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, reprehenderit.",
//         lastUpdated: 1716307721006,
//     },
    
//     {
//         id: 3,
//         title: "Notiz 3",
//         content: "Das hier ist ein BeispielNotiz Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, reprehenderit.",
//         lastUpdated: 1716307731006,
//     },
    
//     {
//         id: 4,
//         title: "Notiz 4",
//         content: "Das hier ist ein BeispielNotiz Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, reprehenderit.",
//         lastUpdated: 1716307741006,
//     },
    
//     {
//         id: 5,
//         title: "Notiz 5",
//         content: "Das hier ist ein BeispielNotiz Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, reprehenderit.",
//         lastUpdated: 1716307751006,
//     },
    
//     {
//         id: 6,
//         title: "Notiz 6",
//         content: "Das hier ist ein BeispielNotiz Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, reprehenderit.",
//         lastUpdated: 1716307761006,
//     },
    
//     {
//         id: 7,
//         title: "Notiz 7",
//         content: "Das hier ist ein BeispielNotiz Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, reprehenderit.",
//         lastUpdated: 1716307771006,
//     },
// ];


localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(MOCK_NOTES));

function getNotes(){
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
}

function saveNotes(title, content, id = undefined){
    
    const notes = getNotes();

    if(!id){
        notes.push({
            title,
            content,
            id: getNextId(),
            lastUpdated: new Date().getTime(),
        });
    
    } else {
        const indexOfNoteWithId = notes.findIndex((note) => note.id === id);
        
        if(indexOfNoteWithId > -1){
            notes[indexOfNoteWithId] = {
                title,
                content,
                id,
                lastUpdated: new Date().getTime(),
            };
        }
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

function deleteNote(id){
    if(!id) return;
    const notes = getNotes();
    const filteredNotes = notes.filter((note) => note.id !== Number(id));

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredNotes));
}

function getNextId(){
    const notes = getNotes();
    
    
    const sortedNotes = notes.sort((noteA, noteB) => noteA.id - noteB.id);


    let nextId = 1;	

    for(let note of sortedNotes){
        if(nextId < note.id) 
            {
                break;
            } else {
                nextId = note.id + 1;
            }
    }

    return nextId;
}