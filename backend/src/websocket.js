import socketio from 'socket.io';
import parseStringAsArray from './app/utils/parseStringAsArray';
import calculateDistance from './app/utils/calculateDistance';

const connection = [];

let io;
export function setUpWebSocket(app) {
  io = socketio(app);

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query;

    connection.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: parseStringAsArray(techs)
    });
  });
}

export function findConnections(coordinates, techs) {
  return findConnections.filter(c => {
    return (
      calculateDistance(coordinates, c.coordinates) < 10 &&
      c.techs.some(item => techs.includes(item))
    );
  });
}

export function sendMessage(to, message, data) {
  to.forEach(c => {
    io.to(c.id).emit(message, data);
  });
}
