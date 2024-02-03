const express = require("express");
const router = express.Router();
const controller = require('../Controller/Notes')

router.get('/getAllNotes', controller.getAllNotes)
    .get('/getNote/:id', controller.getNote)
    .post('/addNote', controller.addNote)
    .patch('/updateNote/:id', controller.updateNote)
    .delete('/deleteNote/:id', controller.deleteNote)

exports.router = router