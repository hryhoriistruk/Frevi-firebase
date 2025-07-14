'use client';

export class ChatSocket {
    constructor(url) {
        this.socket = new WebSocket(url);
        this.listeners = [];

        this.socket.onmessage = (event) => {
            this.listeners.forEach((listener) => listener(JSON.parse(event.data)));
        };
    }

    onMessage(callback) {
        this.listeners.push(callback);
    }

    send(message) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        }
    }

    close() {
        this.socket.close();
    }
}