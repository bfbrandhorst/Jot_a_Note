const notesRouter = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

notesRouter.get('/notes', (req, res) => {

    fs.readFile('./db/db.json', (err, noteData) => {
        if (err) {
            console.error(err)
        }
        let data = JSON.parse(noteData)
        res.json(data)
    })
})

notesRouter.post('/notes', (req, res) => {
    const notesDB = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    notesDB.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notesDB))
    res.json(notesDB);
})

notesRouter.delete('/notes/:id', (req, res) => {
    const notesDB = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    const filteredNotes = notesDB.filter((note) => {
        return note.id !== req.params.id
    })
    fs.writeFileSync('./db/db.json', JSON.stringify(filteredNotes))
    res.json({ message: 'note deleted' })
})
module.exports = notesRouter