import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import counterContext from "./Context/counterContext";
import Alert from "./component/Alert";
import Login from "./component/Login";
import Signup from "./component/Signup";

function App() {
  const host = "http://localhost:5000";
  let initialNote = [];

  const [notes, setNotes] = useState(initialNote);
  const [alert , setAlert] = useState(null);

  const showAlert = (msg , type)=>{
    setAlert({
      msg : msg,
      type : type
    })
    
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  const getAllNotefun = async () => {
    let response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "content-Type": "application-json",
        "auth-token": localStorage.getItem('authToken')
      },
    });
    const dataJson = await response.json();
    console.log(dataJson);
    setNotes(dataJson);
  };

  const addNotefun = async (title, description, tag) => {
    let response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "auth-token": localStorage.getItem('authToken')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log("Adding a new Note");
    const note = await response.json();
    setNotes(notes.concat(note));
    showAlert('Note Added Successfully.' , 'success');
  };
  
  const deleteNotefun = async (id) => {
    let response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application-json",
        "auth-token": localStorage.getItem('authToken')
      },
    });
    const dataJson = await response.json();
    console.log(dataJson);
    
    // Filter returns all the notes who's id is not matched.
    const NewNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(NewNote);
    showAlert('Note Deleted Successfully.' , 'success');
  };
  
  const updateNotefun = async (id, title, description, tag) => {
    let response = await fetch(`${host}/api/notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authToken')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const dataJson = await response.json();
    // console.log(dataJson);
    
    // making a copy of notes with the name of newNote. because we can't change the value of notes. 
    const newNote =  JSON.parse(JSON.stringify(notes));
    
    for (let i = 0; i < newNote.length; i++) {
      const element = newNote[i];
      if (element._id === id) {
        newNote[i].title = title;
        newNote[i].description = description;
        newNote[i].tag = tag;
        break;
      }
    }
    console.log(newNote);
    setNotes(newNote);
    showAlert('Note Updated Successfully.' , 'success');
  };

  return (
    <>
      <counterContext.Provider value={{ notes, setNotes, addNotefun, deleteNotefun, updateNotefun, getAllNotefun }}>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About showAlert={showAlert} />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </counterContext.Provider>
    </>
  );
}

export default App;