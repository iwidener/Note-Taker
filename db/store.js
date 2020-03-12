const bodyParser = require("body-parser");
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
    read() {
        return readFileAsync("../db/db.json", "utf8");
    }

    write() {
        return writeFileAsync("../db/db.json", "utf8");
    }
}

const store = new Store();

module.exports = notesArray;
module.exports = store;

