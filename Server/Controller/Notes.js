const model = require('../Schema/Notes')
const Notes = model.Notes

exports.getAllNotes = async (req, res) => {
    try{
        const userId = req.body.userId
        const allNotes = await Notes.find({userId})
        //console.log(allNotes)
        console.log(req.cookies);
        res.status(200).json(allNotes)
    }
    catch(err){
        res.status(500).json({err}) 
    }
}
exports.getNote = async (req, res) => {
    try{
        const userId = req.body.userId
        const noteId = req.params.id
        const note = await Notes.findOne({_id : noteId, userId})
        //console.log(note)
        res.json(note)
    }
    catch(err){
        res.status(500).json({err})
    }
}
exports.addNote = async (req, res) => {
    try{
        const userId = req.body.userId
        const newNote = new Notes(req.body)
        newNote.userId = userId
        const savedNote = await newNote.save()
        res.status(201).json(savedNote)
    }
    catch(err){
        res.status(500).json({err})
    }
}

exports.updateNote = async (req, res) => {
    try{
        const userId = req.body.userId
        const noteId = req.params.id
        const updatedNote = req.body
        updatedNote.userId = userId                         //for new token
        const savedNote = await Notes.findOneAndUpdate({_id : noteId}, updatedNote, {returnDocument : 'after'})
        //console.log(noteId, updatedNote, savedNote)
        res.status(200).json(savedNote)
    }
    catch(err){
        res.status(500).json({err})
    }
}
exports.deleteNote = async (req, res) => {
    try{
        const noteId = req.params.id
        //console.log(noteId)
        const deletedNote = await Notes.findOneAndDelete({_id : noteId}, {returnDocument : 'after'})
        res.status(200).json(deletedNote)
    }
    catch(err){
        res.status(500).json({err})
    }
}

exports.deleteAllNotes = async (req, res) => {
    try{
        const response = await Notes.deleteMany()
        res.status(200).json(response)
    }
    catch(err){
            res.status(500).json(err)

    }
}