$(function(){

    // Model object
    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    // Octopus object
    var octopus = {

        // adds a new note with the string passed as parameter
        addNewNote: function(noteStr) {
            if (noteStr === "clear") {
                this.clearNotes();
                model.init();
                view.init();
            }
            else {
                model.add({
                    content: noteStr,
                    date: Date.now()
                });
                view.render();
            }
        },

        // get the notes
        getNotes: function() {
            return model.getAllNotes();
            // return model.getAllNotes().reverse();    // do this to reverse the order of the notes
        },

        // clear notes when input "clear"
        clearNotes: function() {
                localStorage.clear();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    // View Object
    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');

            // do when user submits something on the field (works as an event listener)
            newNoteForm.submit(function(e){
                // call addNewNote method from the Octopus with the current form value that was input by the user
                octopus.addNewNote(newNoteContent.val());
                // clear the form
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },

        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += 
                    '<li class="note">' +
                        '<span class="note-content">' +
                            note.content + 
                        '</span>' +
                        '<span class="note-date">' +
                            note.date + 
                        '</span>' + 
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});