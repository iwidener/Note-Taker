const path = require("path");
const util = require("util");
const fs = require("fs");

//const uuidv1 = require("uuid/v1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    getAll() {
        return readFileAsync(path.join(__dirname, "../db/db.json"), "utf8");
    }

    writeOne(note) {
        return this.getAll().then(notes => {
            console.log(notes);
            let notesArray;
            try {
                notesArray = JSON.parse(notes);
            } catch{
                notesArray = [];
            }

            console.log(notesArray);
            if (!note.id) {
                if (notesArray.length > 0) {
                    note.id = notesArray[0].id + 1;
                } else {
                    note.id = 1;
                }
            }
            notesArray.unshift(note);
            return notesArray.sort((a, b) => (a.id > b.id) ? -1: 1)
        }).then(notesArray => writeFileAsync(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArray))
        ).then(() => note);
    }

    deleteOne(id) {
        return this.getAll().then(notes => {
            let notesArray = JSON.parse(notes);
            let newNotesArray = notesArray.filter(note => note.id != id);
            console.log(newNotesArray);
            return newNotesArray;
        }).then(newNotesArray => writeFileAsync(path.join(__dirname, "../db/db.json"), JSON.stringify(newNotesArray)));

    }

    updateOne(id, note) {
        return this.deleteOne(id)
            .then(() => this.writeOne(note))
    }
}

const store = new Store();

module.exports = new Store;

