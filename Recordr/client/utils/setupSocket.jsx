import io from 'socket.io-client';

const socketio = io();

const setupSocket = () => {
    socketio.on('connect',  () => {
        console.log('Connected to the server');
    });
}

export default setupSocket;