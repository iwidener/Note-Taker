const store = require("../db/store");
const notesData = require("../db/store")

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        notesData.getAll().then(currentNotes => {
            console.log("Made it here!", currentNotes)
            res.json(JSON.parse(currentNotes))
        });
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

    app.delete("/api/notes/:id", function(req, res) {
        console.log("route");
        notesData.deleteOne(req.params.id).then(response => {res.json({message: true})}).catch(err => console.log(err));
    });

    app.post("/api/clear", function (req, res) {
        notesData.length = 0;
        res.json({ ok: true });
    });

    app.put("/api/notes/:id", function(req, res) {
        notesData.updateOne(req.params.id, req.body).then(response => {res.send(true)})
    });

};

