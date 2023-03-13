import React, { useEffect, useState } from "react";
import Search from './Components/Search/Search';
import NoteContainer from "./Components/NoteContainer/NoteContainer";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from './Components/Header/Header';
import "./App.css";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes-app")) || []
  );
  
  const addNote = (color) => {
    const tempNotes = [...notes];

    tempNotes.push({
      id: Date.now() + "" + Math.floor(Math.random() * 78),
      text: "",
      time: Date.now(),
      color,
    });
    setNotes(tempNotes);
  };

  const deleteNote = (id) => {
    const tempNotes = [...notes];

    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;

    tempNotes.splice(index, 1);
    setNotes(tempNotes);
  };

  const updateText = (text, id) => {
    const tempNotes = [...notes];

    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;

    tempNotes[index].text = text;
    setNotes(tempNotes);
  };
  
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className={`${darkMode && 'dark-mode'}`} id='container'>
        <div style={{display:'flex' ,flexDirection:'column'}}>
          <Header handleToggleDarkMode={setDarkMode} />  <br/>
          <Search handleSearchNote={setSearchText} />
          <Sidebar addNote={addNote} />  <br/>
          <NoteContainer
            notes={notes.filter((note) =>note.text.toLowerCase().includes(searchText))}
            deleteNote={deleteNote}
            updateText={updateText}
          />
        </div>
    </div>
  );
}

export default App;
