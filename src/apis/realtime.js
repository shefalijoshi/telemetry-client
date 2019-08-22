//connect/close web sockets
//subscribes / unsubscribes for data

import { REALTIME_API, SUBSCRIBE_PREFIX, UNSUBSCRIBE_PREFIX, CONNECTED_EVENT, RECEIVED_EVENT } from "../constants";

let conn;

const connect = () => {
    conn = new WebSocket(REALTIME_API);

    conn.onerror = (error) => {
        console.log('Error: ' + error);
    };

    conn.onopen = (evt) => {
        let event = new CustomEvent(CONNECTED_EVENT);
        window.dispatchEvent(event);
    };

    conn.onmessage = (evt) => {
        let event = new CustomEvent(RECEIVED_EVENT, { detail: evt.data });
        window.dispatchEvent(event);
    };
};

const subscribe = (point) => {
    conn.send(SUBSCRIBE_PREFIX+point);
};

const unsubscribe = (point) => {
    conn.send(UNSUBSCRIBE_PREFIX+point);
};

const disconnect = (evt) => {
    conn.close();
};

export { connect, disconnect, subscribe, unsubscribe };
