export class Note implements Note {
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