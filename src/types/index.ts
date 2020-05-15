export class Note {
    subject: string
    body: string
    constructor(subject = "", body = "") {
        this.subject = subject
        this.body = body
    }
    isEmpty() {
        return !this.subject && !this.body
    }
    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    }
}

export type OnNoteChange = {
    onNoteChange?: (note: Note) => void,
}