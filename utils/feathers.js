import io from 'socket.io-client';
import feathers from '@feathersjs/client';

// Establish a Socket.io connection
const socket = io(process.env.API_URL);

// Initialize our Feathers client application
export const client = feathers();

// Conncet the Feathers client with Socket.io
client.configure(feathers.socketio(socket));
