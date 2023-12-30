"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var neboa_1 = require("neboa");
var myDb = (0, neboa_1.neboa)('app.db');
var two = [];
var notes = myDb.collection('notes');
// notes.insert({title: "One", content: "One two three"})
var query = notes.query();
var n = query.find();
function getAllNotes() {
    var notes = myDb.collection('notes');
    var query = notes.query();
    var result = query.find();
    return result;
}
function getOneNote(id) {
    var notes = myDb.collection('notes');
    var query = notes.query().equalTo('_id', id);
    var result = query.find();
    if (result.length !== 0) {
        var _a = result[0], _id = _a._id, note = __rest(_a, ["_id"]);
        return note;
    }
    return null;
}
function addNote(newNote) {
    var note = myDb.collection('notes');
    // set createdAt Data
    var now = Date.now();
    newNote.createdAt = now;
    newNote.lastModified = now;
    return note.insert(newNote)._id;
}
function editNote(id, content) {
    var conn = myDb.collection('notes');
    var note = conn.query().equalTo('_id', id).first();
    if (note) {
        content.lastModified = Date.now();
        var result = conn.update(note._id, content);
        return result._id;
    }
}
function deleteNote(id) {
    var conn = myDb.collection('notes');
    var note = conn.query().equalTo('_id', id).first();
    if (note) {
        var result = conn.delete(note._id);
        console.log(result);
        return result;
    }
}
// let id = "658ed0b9f3e43b0f52b60926"
var id = "65903d04d372c904a9b3e0f4";
// const b: Notes = getAllNotes()
// console.log(b[0])
// const c = getOneNote(id)
// console.log(c?.content)
// console.log(addNote({title: "Real Note 5", content: "Real note's content"}))
// editNote(id, {title: "Real note 2", content: "Content modified"})
var to_delete = "659046280ae2aa059e9e71ef";
deleteNote(to_delete);
