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
    equals(other: Note) {
        return this.subject === other.subject && this.body === other.body
    }
}

export type OnNoteChange = {
    onNoteChange?: (note: Note) => void,
}

export type ReadOnly = {
    readOnly?: boolean
}

export type NoteEditor = {
    note: Note,
    onComplete?: () => void
} & OnNoteChange & ReadOnly