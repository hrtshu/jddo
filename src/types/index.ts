export class Note {
    id: string | undefined // TODO 型はstringで良いか？
    subject: string
    body: string
    constructor({ id = undefined, subject = "", body = "" } = {}) {
        this.id = id
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