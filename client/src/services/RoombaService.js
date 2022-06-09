import axios from 'axios';

const url = 'http://localhost:5000/api/game';

class RoombaService {
  // Start Roomba Game
  static startGame() {
    return axios.get(url);
  }

  // Move Roomba
  static moveRoomba() {
    return axios.get(`${url}/move`);
  }

  // Simulate Roomba
  static simulate() {
    return axios.get(`${url}/simulate`);
  }
}

export default RoombaService;