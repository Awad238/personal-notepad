import { neboa } from 'neboa';

export type User = {
	name: string;
	lastName?: string;
	username: string;
	password: string;
	createdAt?: number | Date;
	lastModified?: number | Date;
	_id?: number | string
}


export type Note = {
	title: string;
	content: string;
	createdAt?: number | Date;
	lastModified?: number | Date;
	_id?: number | string;
	userId: string;
};

export type Notes = Note[];

const database = neboa('app.db', {
	fileMustExist: false
});

export function getAllNotes(username: string): Notes | null {
	const notes = database.collection<Note>('notes');
	const user = getUser(username)
	if (user) {
		// const query = notes.query();
		const query = notes.query().equalTo("userId", user._id!);
		const result: Notes = query.find();
		return result;
	}
	return null
}

export function getSomeNotes(limit: number, username: string): Notes | null {
	const notes = database.collection<Note>('notes');
	const user = getUser(username)
	if (user !== null) {
		const query = notes.query().equalTo("userId", user._id!).limit(limit);
		// const query = notes.query().limit(limit);
		const result: Notes = query.find();
		return result;
	}
	return null
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


// User
export function addNewUser(user: User): string | null {
	const conn = database.collection<User>('User')
	
	const isNewUser = conn.query().equalTo('username', user.username).first() as User
	
	if (!isNewUser) {
		const now = Date.now();
		user.createdAt = now
		user.lastModified = now
		return conn.insert(user)._id
	}
	return null
}


export function getUser(username: string): User | null {
	const conn = database.collection<User>('User')
	const query = conn.query().equalTo('username', username);
	let result = query.find();
	if (result.length !== 0) {
		return result[0] as User;
	}
	return null
}


export function fetchUser(username: string, password:string): User | null {
	const conn = database.collection<User>('User')
	const user = conn.query().equalTo('username', username).first();
	
	if (user.password == password) {
		return user;
	}
	return null
}


export function editUser(user: User): string | null {
	const conn = database.collection<User>('User')
	const userUpdate = conn.query().equalTo('_id', user._id!).first();
	if (userUpdate) {
		user.lastModified = Date.now();
		const result = conn.update(user._id as string, user);
		return result._id;
	}
	return null
}


export function changePassword(user_id: string, oldPassword: string, newPassword: string): boolean {
	const conn = database.collection<User>('User')
	const user = conn.query().equalTo("_id", user_id).first()
	
	if (user && user.password === oldPassword) {
		console.log(user)
		user.password = newPassword
		conn.update(user._id, user)
		console.log(user)
		return true
	}
	return false
}


export function deleteUser(user_id: string | number, password: string): boolean {
	const conn = database.collection<User>('User')
	const user = conn.query().equalTo('_id', user_id).first();

	if (user && password) {
		const result = conn.delete(user_id as string);
		console.log(result);
		return result as boolean;
	} else return false;
}
