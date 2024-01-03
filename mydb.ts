import { neboa } from 'neboa';

type Note = {
	title: string;
	content: string;
	createdAt?: number | Date;
	lastModified?: number | Date;
};

type Notes = Note[];

const database = neboa('app.db');

function getAllNotes(): Notes {
	const notes = database.collection<Note>('notes');
	const query = notes.query();
	const result: Notes = query.find();
	return result;
}

function getOneNote(id: string): Note | null {
	const notes = database.collection<Note>('notes');
	const query = notes.query().equalTo('_id', id);
	let result = query.find();
	if (result.length !== 0) {
		let { _id, ...note } = result[0];
		return note as Note;
	}
	return null;
}

function addNote(newNote: Note): string {
	const note = database.collection<Note>('notes');

	// set createdAt Data
	const now = Date.now();
	newNote.createdAt = now;
	newNote.lastModified = now;
	return note.insert(newNote)._id;
}

function editNote(id: string | number, content: Note) {
	const conn = database.collection<Note>('notes');
	const note = conn.query().equalTo('_id', id).first();

	if (note) {
		content.lastModified = Date.now();
		const result = conn.update(note._id, content);
		return result._id;
	}
}

function deleteNote(id: string | number): boolean {
	const conn = database.collection<Note>('notes');
	const note = conn.query().equalTo('_id', id).first();

	if (note) {
		const result = conn.delete(note._id);
		console.log(result);
		return result as boolean;
	} else return false;
}
