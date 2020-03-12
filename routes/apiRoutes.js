const store = require("../db/store");
const notesData = require("../db/store")

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        res.json(notesData);
    });

    app.post("api/notes", function (req, res) {
        if (notesData.length < 10) {
            notesData.push(req.body);
            res.json(true);
        }
        else {
            res.json(false);
            console.log("This note taker can hold max 10 notes.")
        }
    });

    app.get("/api/notes/:id", function (req, res) {
        var chosenNote = req.params.id;
        console.log(chosenNote);

        for (var i = 0; i < notes.length; i++) {
            if (chosenNote === notesData[i]) {
                return res.json(true);
            }
        }
        return res.json(false);
    });

    app.post("/api/clear", function (req, res) {
        notesData.length = 0;
        res.json({ ok: true });
    });

    app.get("/api/notes", function (req, res) {
        store
            .getNotes(req.params.notes)
            .then(notes => res.json(notes))
            .catch(err => res.status(500).json(err));

    });

    app.post("/api/notes", function (req, res) {
        store
            .addNote(req.params.note)
            .then((note) => res.json(note))
            .catch(err => res.status(500).json(err));
    });

    app.delete("/api/notes/:id", function (req, res) {
        store
            .deleteNote(req.params.id)
            .then((id) => res.json(id))
            .catch(err => res.status(500).json(err))
    });
};

