export interface Message {
    type: string,
}

export interface MessageContent<T> extends Message {
    content: T
}