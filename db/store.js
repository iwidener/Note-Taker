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
            let notesArray = JSON.parse(notes);
            console.log(notesArray);
            note.id = notesArray[0].id + 1;
            notesArray.unshift(note);
            return notesArray;
        }).then(notesArray => writeFileAsync(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArray))
        );
    }

    deleteOne(id) {
        return this.getAll().then(notes => {
            let notesArray = JSON.parse(notes);
            let newNotesArray = notesArray.filter(note => note.id != id);
            console.log(newNotesArray);
            writeFileAsync(path.join(__dirname, "../db/db.json"), JSON.stringify(newNotesArray));
        });
    }

    updateOne() {

    }
}

const store = new Store();

module.exports = new Store;

