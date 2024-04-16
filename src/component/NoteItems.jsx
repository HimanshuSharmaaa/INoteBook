import React , {useContext} from "react";
import counterContext from '../Context/counterContext';

const NoteItems = ({ note , updateNote }) => {
  const context = useContext(counterContext);
  const {deleteNotefun} = context;
  const {title , description , tag , _id} = note;
  return (
    <div className="col-md-3">
        <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">{tag}</p>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNotefun(_id)}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
        </div>
        </div>
    </div>
  );
};

export default NoteItems; 