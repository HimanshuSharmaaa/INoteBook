const express = require("express");
const router = express.Router();
const NotesModel = require("../models/NotesModel");
const fetchUserData = require("../MiddleWare/fetchuserdata");
const { body, validationResult } = require("express-validator");

// Route 1 : Get All the notes form the database : using GET : /api/notes/fetchAllNotes : LOGIN REQUIED
router.get("/fetchAllNotes", fetchUserData, async (req, res) => {
    try {
        const notes = await NotesModel.find({ user: req.user.id });
        res.send(notes);
        console.log("Fetched Notes successfully");    
    } catch (error) {
        res.status(500).json({error:"Some Error Occur In Finding & Create New User Details. Check in the try and catch."});
        console.error(error.message);
    }
});

// Route 2 : Add the notes in the database : using POST : /api/notes/addnote : LOGIN REQUIED
router.post("/addNote", fetchUserData ,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", " Description must be atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {

    // If there are errors , return Bad Request and the errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error : error.array() });
    }

    try {
        let note = await NotesModel.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag : req.body.tag
        });
        res.json(note);  
    } 
    catch (error) {
      res.status(401).json("Failed in Adding the notes in the database.");
      console.log(error);
    }
  }
);

// Route 3 : update the existing note in the database : using PUT : /api/notes/update : LOGIN REQUIED
router.put("/update/:id", fetchUserData, async (req, res) => {
    const {title , description , tag} = req.body;
    // Create a new note object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // Find the note for update
    let note = await NotesModel.findById(req.params.id);
    if(!note){ return res.status(404).json("Notes not exists in the database."); }

    // note.user.toString() --> gives the id of the user which is requested for the note updation by sending there id in the URL(in the form of params)
    if(note.user.toString() !== req.user.id){ return res.status(401).json("NOT ALLOWED."); }

    // {new : true} --> if new new contact come , then create it.
    note = await NotesModel.findByIdAndUpdate(req.params.id , {$set : newNote} , {new : true});
    res.json(note);
});

// Route 4 : deleting the existing note in the database : using DELETE : /api/notes/update : LOGIN REQUIED
router.delete("/deleteNote/:id", fetchUserData, async (req, res) => {
    // Find the note for deletion
    let note = await NotesModel.findById(req.params.id);
    if(!note){ return res.status(404).json("Notes not exists in the database."); }

    // note.user.toString() --> gives the id of the user which is requested for the note updation by sending there id in the URL(in the form of params)
    if(note.user.toString() !== req.user.id){ return res.status(401).json("DELETE ONLY YOUR NOTES. ANOTHER NOTES DELETION NOT ALLOWED."); }

    try {
      note = await NotesModel.findByIdAndDelete(req.params.id);
      res.json({ "DELETION" :  "NOTES HAS BEEN COMPLETED SUCCESSFULLY" , note : note});
    } catch (error) {
      return res.json({error : error});
    }
});

module.exports = router;