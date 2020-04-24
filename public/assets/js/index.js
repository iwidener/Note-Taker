var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");
var $noteEdit = $(".edit-note");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};
var editNote = false;

// A function for getting all notes from the db
var getNotes = function () {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

// A function for saving a note to the db
var saveNote = function (note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// A function for deleting a note from the db
var deleteNote = function (id) {
  console.log('deleteNote')
  return $.ajax({
    url: "/api/notes/" + id,
    method: "DELETE"
  });
};

//Update the note
var updateNote = function (note) {
  console.log("update a note");
  return $.ajax({
    url: "/api/notes/" + note.id,
    method: "PUT",
    data: note
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function () {
  $saveNoteBtn.hide();
  $noteEdit.show();

  if (activeNote.id && !editNote) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val(activeNote.title || "");
    $noteText.val(activeNote.text || "");
  }
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function () {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };

  if (editNote) {
    newNote.id = activeNote.id;
    updateNote(newNote)
      .then(function (data) {
        console.log(data);
        getAndRenderNotes();
        renderActiveNote();
        editNote = false;
      })
  }
  else {
    saveNote(newNote).then(function (data) {
      console.log(data);
      getAndRenderNotes();
      renderActiveNote();
    });
  }
};

// Delete the clicked note
var handleNoteDelete = function (event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  console.log('DELETE NOTE')

  var note = $(this)
    .parent(".list-group-item")
    .data();
    console.log(note);
  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(function () {
    getAndRenderNotes();
    renderActiveNote();
  }).catch(err => console.log('ERROR', err));
};

// Sets the activeNote and displays it
var handleNoteView = function () {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function () {
  activeNote = {};
  renderActiveNote();
};

// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function () {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render's the list of note titles
var renderNoteList = function (notes) {
  console.log('RENDER!')
  $noteList.empty();
  console.log(notes);
  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];
    console.log("line117: " + note);
    var $li = $("<li class='list-group-item'>").data(note);
    var $span = $("<span>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function () {
  console.log('GET AND RENDER')
  return getNotes().then(function (data) {
    renderNoteList(data);
  });
};

var handleNoteEdit = function () {
  console.log("Notes edit");
  editNote = true;
  renderActiveNote();
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);
$noteEdit.on("click", handleNoteEdit);

// Gets and renders the initial list of notes
getAndRenderNotes();
