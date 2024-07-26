export interface RTCContent {
    origin: number;
    destination: number;
}

export interface RTCMessage<T> extends RTCContent {
    packet: T;
}