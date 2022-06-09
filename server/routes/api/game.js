const express = require('express');
const { turnOnRoomba, moveRoomba, simulate } = require('../../controllers/game.controller');

const router = express.Router();

router.get('/', (req, res) => {
  turnOnRoomba(res);
});

router.get('/move', (req, res) => {
  moveRoomba(res);
});

router.get('/simulate', (req, res) => {
  simulate(res);
});

router.get('/status', (req, res) => {
  res.json({ roombaMoves, destination, currentPosition, dirtyTiles: floor.dirtyTiles, roomba });
});

module.exports = router;