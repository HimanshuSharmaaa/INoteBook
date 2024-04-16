import React, { useContext, useEffect, useRef , useState } from "react";
import { useNavigate } from "react-router-dom";
import counterContext from "../Context/counterContext";
import NoteItems from "./NoteItems";
import AddNote from "./AddNote";

const Notes = () => {
  let naviagte = useNavigate();
  const context = useContext(counterContext);
  const { notes, getAllNotefun , updateNotefun} = context;

  useEffect(() => {
    if(localStorage.getItem('authToken')){
      getAllNotefun();
    }
    else{
      naviagte('/login');
    }
  }, []);

  const [note , setNote] = useState({eid : "" , etitle:"" , edescription:"" , etag:""});
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    // auto click to the target tag
    ref.current.click();
    // here we are access the current note value but can't change the value of the note.
    // setNote(currentNote);
    // Now Here we are access the value of the current note.
    setNote({eid : currentNote._id , etitle : currentNote.title , edescription : currentNote.description , etag : currentNote.tag});
  };

  const handleClick = () =>{
    refClose.current.click();
    updateNotefun(note.eid , note.etitle , note.edescription , note.etag);
    // console.log("Updateing the note..." , note);
  }

  const onChangehandler = (e) =>{
    // Here we are using spread operater.
    // set all the value of the note (...note) but add & overRight the above properties ([e.target.name] : e.target.value).
    setNote({...note , [e.target.name] : e.target.value});
  }

  return (
    <>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
      Launch demo modal</button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Mode</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="etitle">Title</label>
                  <input value={note.etitle} type="text" className="form-control" id="etitle" aria-describedby="emailHelp" placeholder="Enter Title Here.." name="etitle" onChange={onChangehandler} />
                </div>
                <div className="form-group">
                  <label htmlFor="edescription">Description</label>
                  <input value={note.edescription} type="text" className="form-control" id="edescription" placeholder="Enter Description Here.." name="edescription" onChange={onChangehandler}/>
                </div>
                <div className="form-group">
                  <label htmlFor="etag">Tag</label>
                  <input value={note.etag} type="text" className="form-control" id="etag" placeholder="Enter Tag Here.." name="etag" onChange={onChangehandler}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 3 || note.edescription.length <= 5 || note.etag.length === 0} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h1>Your Notes</h1>
        <div className="row my-3">
        {/* using this syntax then only if condition is known. */}
        {notes.length === 0 && 'No Notes to display' }
        {notes.map((note) => {
          return (<NoteItems key={note._id} note={note} updateNote={updateNote} />);
        })}
        </div>
      </div>
    </>
  );
};

export default Notes;