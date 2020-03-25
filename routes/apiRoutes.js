const store = require("../db/store");
const notesData = require("../db/store")

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        notesData.getAll().then(currentNotes => res.json(JSON.parse(currentNotes)));
        // console.log(currentNotes);
        // res.json(currentNotes);
    });

    app.post("/api/notes", function (req, res) {
        notesData.writeOne(req.body).then(response => res.json(response));
    });

    app.get("/api/notes/:id", function (req, res) {
        var chosenNote = req.params.id;
        console.log(chosenNote);

        for (var i = 0; i < notes.length; i++) {
            if (chosenNote === notesData[i])
                return res.json(true);
        }
        return res.json(false);
    });

    app.post("/api/clear", function (req, res) {
        notesData.length = 0;
        res.json({ ok: true });
    });

};

