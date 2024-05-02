const notesRouter = require('express').Router();
const fs = require('fs');

notesRouter.get('/notes', (req, res) => {

    fs.readFile('./db/db.json', (err, noteData) => {
        if (err) {
            console.error(err)
        }
        let data = JSON.parse(noteData)
        res.json(data)
    })
})

module.exports = notesRouter