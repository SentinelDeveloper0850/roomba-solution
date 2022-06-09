// #region Roomba Logic
const numberOfRows = 8;
const numberOfColumns = 8;

let gameStatus = 'Offline';

let floor = {
  numberOfTiles: 64,
  dirtyTileIDs: [],
  boardRows: [],
  tiles: [],
  dirtyTiles: [],
};

const dock = {
  id: 8,
  name: `1:8`,
  xCoordinate: 1,
  yCoordinate: 8,
};

let destination = null;
let currentPosition = dock;
let roombaMoves = [];

let roomba = {
  batteryCharge: 1000,
  points: 0,

  cleanTile() {
    let updatedDirtyTiles = [...floor.dirtyTiles];
    let index = updatedDirtyTiles.findIndex((tile) => tile.id === currentPosition.id);
    let updatedBoardRows = [...floor.boardRows];

    if (index !== -1) {
      updatedDirtyTiles.splice(index, 1);
      destination = null;
      floor.dirtyTiles = updatedDirtyTiles;
      roomba.points += 250;

      let updatedRows = [];

      updatedBoardRows.forEach(row => {
        let updatedTiles = [];

        row.forEach(tile => {
          let updatedTile = {...tile};
          if (tile.id === currentPosition.id) {
            updatedTile.isDirty = false;
          }
          updatedTiles.push(updatedTile);
        });

        updatedRows.push(updatedTiles);
      });

      floor.boardRows = updatedRows;

      roombaMoves.push('Roomba cleaned tile ' + currentPosition.name);
    }
  },

  moveToTile() {
    let hasMoved = false;

    if (currentPosition.xCoordinate > destination.xCoordinate && !hasMoved) {
      hasMoved = true;

      let _xCoordinate = currentPosition.xCoordinate - 1;

      let updatedPosition = floor.tiles.find(
        (tile) => tile.xCoordinate === _xCoordinate && tile.yCoordinate === currentPosition.yCoordinate
      );

      let moveInfo = `Roomba moved LEFT from ${currentPosition.name} to ${updatedPosition?.name} toward destination ${destination.name}`;

      roombaMoves.push(updatedPosition.name === dock.name ? 'Roomba has docked' : moveInfo);

      currentPosition = {
        ...updatedPosition,
      };
    }

    if (currentPosition.xCoordinate < destination.xCoordinate && !hasMoved) {
      hasMoved = true;

      let _xCoordinate = currentPosition.xCoordinate + 1;

      let updatedPosition = floor.tiles.find(
        (tile) => tile.xCoordinate === _xCoordinate && tile.yCoordinate === currentPosition.yCoordinate
      );

      let moveInfo = `Roomba moved RIGHT from ${currentPosition.name} to ${updatedPosition?.name} toward destination ${destination.name}`;

      roombaMoves.push(updatedPosition.name === dock.name ? 'Roomba has docked' : moveInfo);

      currentPosition = {
        ...updatedPosition,
      };
    }

    if (currentPosition.yCoordinate > destination.yCoordinate && !hasMoved) {
      hasMoved = true;

      let _yCoordinate = currentPosition.yCoordinate - 1;

      let updatedPosition = floor.tiles.find(
        (tile) => tile.yCoordinate === _yCoordinate && tile.xCoordinate === currentPosition.xCoordinate
      );

      let moveInfo = `Roomba moved UP from ${currentPosition.name} to ${updatedPosition?.name} toward destination ${destination.name}`;

      roombaMoves.push(updatedPosition?.name === dock.name ? 'Roomba has docked' : moveInfo);

      currentPosition = {
        ...updatedPosition,
      };
    }

    if (currentPosition.yCoordinate < destination.yCoordinate && !hasMoved) {
      hasMoved = true;

      let _yCoordinate = currentPosition.yCoordinate + 1;

      let updatedPosition = floor.tiles.find(
        (tile) => tile.yCoordinate === _yCoordinate && tile.xCoordinate === currentPosition.xCoordinate
      );

      let moveInfo = `Roomba moved DOWN from ${currentPosition.name} to ${updatedPosition?.name} toward destination ${destination.name}`;

      roombaMoves.push(updatedPosition.name === dock.name ? 'Roomba has docked' : moveInfo);

      currentPosition = {
        ...updatedPosition,
      };
    }

    if (currentPosition.name === destination.name) {
      if (floor.dirtyTiles.length > 0) {
        this.cleanTile();
      } else {
        if (currentPosition.name === dock.name) {
          gameStatus = 'Docked';
          currentPosition = dock;
          destination = null;
        }
      }
    }

    if (hasMoved) {
      this.batteryCharge -= 1;
      this.points -= 10;
    }
  },
};

const resetGame = () => {
  gameStatus = 'Online';

  floor = {
    numberOfTiles: 64,
    dirtyTileIDs: [],
    boardRows: [],
    tiles: [],
    dirtyTiles: [],
  };

  destination = null;
  currentPosition = dock;
  roombaMoves = [];

  roomba.batteryCharge = 1000;
  roomba.points = 0;
  roomba.currentPosition = dock;
};

const sortByNumber = (a, b) => {
  if (Number(a) - Number(b) > 1) return 1;
  if (Number(a) - Number(b) < 1) return -1;
  return 0;
};

const _calculateDestination = () => {
  let movesToDirtyTiles = [];

  if (floor.dirtyTiles.length !== 0) {
    floor.dirtyTiles.forEach((tile) => {
      let xDiff = Math.abs(currentPosition.xCoordinate - tile.xCoordinate);
      let yDiff = Math.abs(currentPosition.yCoordinate - tile.yCoordinate);

      let movesRequired = xDiff + yDiff;

      movesToDirtyTiles.push({ id: tile.id, movesRequired });
    });

    movesToDirtyTiles.sort(sortByNumber);

    let targetId = movesToDirtyTiles.shift().id;

    destination = floor.dirtyTiles.find((tile) => tile.id === targetId);
  } else {
    destination = dock;
  }
};

const _getRandomNumber = () => {
  return Math.floor(Math.random() * floor.numberOfTiles) + 1;
};

const generateDirtyTileIDs = () => {
  let tileIDs = [];

  while (tileIDs.length < 18) {
    const tileId = _getRandomNumber();

    if (!tileIDs.includes(tileId) && tileId !== 8) tileIDs.push(tileId);
  }

  tileIDs.sort(sortByNumber);

  floor.dirtyTileIDs = tileIDs;
};

const buildFloor = () => {
  let tileId = 1;

  let boardRows = [];

  //Loop through rows
  for (let row = 1; row <= numberOfRows; row++) {
    let boardRow = [];

    //Loop through columns
    for (let column = 1; column <= numberOfColumns; column++) {
      const isDirty = floor.dirtyTileIDs.includes(tileId);

      boardRow.push({ id: tileId, name: `${row}:${column}`, xCoordinate: row, yCoordinate: column, isDirty });

      if (isDirty)
        floor.dirtyTiles.push({ id: tileId, name: `${row}:${column}`, xCoordinate: row, yCoordinate: column, isDirty });

      tileId = tileId + 1;
    }

    boardRows.push(boardRow);
  }

  floor.boardRows = boardRows;
  floor.tiles = boardRows.flat();
};

const simulate = async (res) => {
  while (gameStatus === 'Online') {
    _calculateDestination();
    roomba.moveToTile();
  }

  res.json({
    gameStatus,
    roombaMoves,
    destination,
    currentPosition,
    boardTiles: floor.boardTiles,
    boardRows: floor.boardRows,
    dirtyTiles: floor.dirtyTiles,
    roomba: { ...roomba, currentPosition },
  });
}

const moveRoomba = (res) => {
  if (gameStatus !== 'Docked') {
    _calculateDestination();
    roomba.moveToTile();
    res.json({
      gameStatus,
      roombaMoves,
      destination,
      currentPosition,
      boardTiles: floor.boardTiles,
      boardRows: floor.boardRows,
      dirtyTiles: floor.dirtyTiles,
      roomba: { ...roomba, currentPosition },
    });
  } else {
    res.json({
      gameStatus,
      roombaMoves,
      destination,
      currentPosition,
      boardTiles: floor.boardTiles,
      boardRows: floor.boardRows,
      dirtyTiles: floor.dirtyTiles,
      roomba: { ...roomba, currentPosition },
    });
  }
};

const turnOnRoomba = async (res) => {
  resetGame();
  generateDirtyTileIDs();
  buildFloor();

  res.json({
    gameStatus,
    boardRows: floor.boardRows,
    boardTiles: floor.boardTiles,
    dirtyTiles: floor.dirtyTiles,
    roomba: { ...roomba, currentPosition },
    currentPosition,
    destination,
    roombaMoves,
  });
};
// #endregion

module.exports = {
  turnOnRoomba,
  moveRoomba,
  simulate
};
