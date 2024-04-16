import React , {useContext, useState} from 'react'
import counterContext from '../Context/counterContext';

const AddNote = () => {

  const context = useContext(counterContext);
  const {addNotefun} = context;

  const [note , setNote] = useState({title:"" , description:"" , tag:""});

  const handleChange = (e) =>{
    // e.prevetDefault(); --> don't reload the page.
    e.preventDefault();
    // Set the values of the note.
    addNotefun(note.title , note.description , note.tag);
    setNote({title:"" , description:"" , tag:""});
  }

  const onChangehandler = (e) =>{
    // Here we are using spread operater.
    // set all the value of the note (...note) but add & overRight the above properties ([e.target.name] : e.target.value).
    setNote({...note , [e.target.name] : e.target.value});
  }

  return (
    <div className="container my-3">
        <h1>Add Notes</h1>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" aria-describedby="emailHelp" value={note.title} placeholder="Enter Title Here.."  name="title" onChange={onChangehandler}/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" value={note.description} placeholder="Enter Description Here.." name='description' onChange={onChangehandler}/>
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input type="text" className="form-control" id="tag" value={note.tag} placeholder="Enter Tag Here.." name='tag' onChange={onChangehandler}/>
          </div>
          <button disabled={note.title.length < 3 || note.description.length <= 5 || note.tag.length === 0} type="submit" className="btn btn-primary my-2" onClick={handleChange}>Add Note</button>
        </form>
    </div>
  )
}

export default AddNote;