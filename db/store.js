const path = require("path");
console.log("This is a data file.");
const notesArray = [
    {
        tiitle: "",
        text: "",
        id: "0"
    }
];

console.log(notesArray);

const util = require("util");
const fs = require("fs");

//const uuidv1 = require("uuid/v1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const myJSON = '{"title":"Title","text":"Text", "id":""}';
const newNote = JSON.parse(myJSON);

class Store {
    getAll() {
        return readFileAsync(path.join(__dirname, "../db/db.json"), "utf8");
    }

    writeOne(note) {
       return this.getAll().then(notes => {
        let notesArray = JSON.parse(notes); 
        note.id = notesArray[0].id + 1;  
        notesArray.unshift(note);
        writeFileAsync("../db/db.json", JSON.stringify(note));
       });
    }

    getOne() {

    }

    updateOne() {

    }
}
    
const store = new Store();

module.exports = new Store;

