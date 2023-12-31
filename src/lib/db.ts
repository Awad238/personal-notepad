import { neboa } from 'neboa';

export type Note = {
	title: string;
	content: string;
	createdAt?: number | Date;
	lastModified?: number | Date;
	_id?: number | string;
};

export type Notes = Note[];

const database = neboa('app.db');

export function getAllNotes(): Notes {
	const notes = database.collection<Note>('notes');
	const query = notes.query();
	const result: Notes = query.find();
	return result;
}

export function getSomeNotes(limit: number): Notes {
	const notes = database.collection<Note>('notes');
	const query = notes.query().limit(limit);
	const result: Notes = query.find();
	return result;
}

export function getOneNote(id: string): Note | null {
	const notes = database.collection<Note>('notes');
	const query = notes.query().equalTo('_id', id);
	let result = query.find();
	if (result.length !== 0) {
		return result[0] as Note;
	}
	return null;
}

export function addNote(newNote: Note): string {
	const note = database.collection<Note>('notes');

	// set createdAt, lastModified
	const now = Date.now();
	newNote.createdAt = now;
	newNote.lastModified = now;
	return note.insert(newNote)._id;
}

export function editNote(id: string | number, content: Note) {
	const conn = database.collection<Note>('notes');
	const note = conn.query().equalTo('_id', id).first();

	if (note) {
		content.lastModified = Date.now();
		const result = conn.update(note._id, content);
		return result._id;
	}
}

export function deleteNote(id: string | number): boolean {
	const conn = database.collection<Note>('notes');
	const note = conn.query().equalTo('_id', id).first();

	if (note) {
		const result = conn.delete(note._id);
		console.log(result);
		return result as boolean;
	} else return false;
}


export function searchNote(query: string): Notes {
	const conn = database.collection<Note>('notes')
	let notes = conn.query().like('title', query)
	const result = notes.find()
	return result
}