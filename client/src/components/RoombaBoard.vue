<template>
  <div>
    <h1>Roomba {{ gameStatus }}</h1>
    <div class="container">
      <div class="game-container">
        <div class="game-stats">
          <div class="game-stat-container">
            <label>Battery Charge</label>
            <p>{{ roomba.batteryCharge }}</p>
          </div>
          <div class="game-stat-container">
            <label>Points</label>
            <p>{{ roomba.points }}</p>
          </div>
          <div class="game-stat-container">
            <label>Current Position</label>
            <p>C{{ roomba.currentPosition.xCoordinate }} : R{{ roomba.currentPosition.yCoordinate }}</p>
          </div>
          <div class="game-stat-container">
            <a class="button" v-if="gameStatus !== 'Docked'" v-on:click="moveRoomba">Move Roomba</a>
            <a class="button" v-if="gameStatus !== 'Docked'" v-on:click="simulate">Simulate</a>
            <a class="button" v-if="gameStatus === 'Docked'" v-on:click="restartRoomba">Restart Roomba</a>
          </div>
        </div>
        <p class="error" v-if="error">{{ error }}</p>
        <div id="board" class="board">
          <div class="column">
            <div
              class="tile"
              v-for="(tile, index) in row1"
              v-bind:class="tile.isDirty ? 'dirty' : 'clean'"
              v-bind:item="tile.id"
              v-bind:id="tile.id"
              v-bind:index="index"
              v-bind:key="tile.name"
            >
              <p>{{ tile.name }}</p>
              <img
                v-if="
                  tile.xCoordinate === roomba.currentPosition.xCoordinate &&
                  tile.yCoordinate === roomba.currentPosition.yCoordinate
                "
                src="../assets/roomba.png"
              />
            </div>
          </div>
          <div class="column">
            <div
              class="tile"
              v-for="(tile, index) in row2"
              v-bind:class="tile.isDirty ? 'dirty' : 'clean'"
              v-bind:item="tile"
              v-bind:index="index"
              v-bind:key="tile.name"
            >
              <p>{{ tile.name }}</p>
              <img
                v-if="
                  tile.xCoordinate === roomba.currentPosition.xCoordinate &&
                  tile.yCoordinate === roomba.currentPosition.yCoordinate
                "
                src="../assets/roomba.png"
              />
            </div>
          </div>
          <div class="column">
            <div
              class="tile"
              v-for="(tile, index) in row3"
              v-bind:class="tile.isDirty ? 'dirty' : 'clean'"
              v-bind:item="tile"
              v-bind:index="index"
              v-bind:key="tile.name"
            >
              <p>{{ tile.name }}</p>
              <img
                v-if="
                  tile.xCoordinate === roomba.currentPosition.xCoordinate &&
                  tile.yCoordinate === roomba.currentPosition.yCoordinate
                "
                src="../assets/roomba.png"
              />
            </div>
          </div>
          <div class="column">
            <div
              class="tile"
              v-for="(tile, index) in row4"
              v-bind:class="tile.isDirty ? 'dirty' : 'clean'"
              v-bind:item="tile"
              v-bind:index="index"
              v-bind:key="tile.name"
            >
              <p>{{ tile.name }}</p>
              <img
                v-if="
                  tile.xCoordinate === roomba.currentPosition.xCoordinate &&
                  tile.yCoordinate === roomba.currentPosition.yCoordinate
                "
                src="../assets/roomba.png"
              />
            </div>
          </div>
          <div class="column">
            <div
              class="tile"
              v-for="(tile, index) in row5"
              v-bind:class="tile.isDirty ? 'dirty' : 'clean'"
              v-bind:item="tile"
              v-bind:index="index"
              v-bind:key="tile.name"
            >
              <p>{{ tile.name }}</p>
              <img
                v-if="
                  tile.xCoordinate === roomba.currentPosition.xCoordinate &&
                  tile.yCoordinate === roomba.currentPosition.yCoordinate
                "
                src="../assets/roomba.png"
              />
            </div>
          </div>
          <div class="column">
            <div
              class="tile"
              v-for="(tile, index) in row6"
              v-bind:class="tile.isDirty ? 'dirty' : 'clean'"
              v-bind:item="tile"
              v-bind:index="index"
              v-bind:key="tile.name"
            >
              <p>{{ tile.name }}</p>
              <img
                v-if="
                  tile.xCoordinate === roomba.currentPosition.xCoordinate &&
                  tile.yCoordinate === roomba.currentPosition.yCoordinate
                "
                src="../assets/roomba.png"
              />
            </div>
          </div>
          <div class="column">
            <div
              class="tile"
              v-for="(tile, index) in row7"
              v-bind:class="tile.isDirty ? 'dirty' : 'clean'"
              v-bind:item="tile"
              v-bind:index="index"
              v-bind:key="tile.name"
            >
              <p>{{ tile.name }}</p>
              <img
                v-if="
                  tile.xCoordinate === roomba.currentPosition.xCoordinate &&
                  tile.yCoordinate === roomba.currentPosition.yCoordinate
                "
                src="../assets/roomba.png"
              />
            </div>
          </div>
          <div class="column">
            <div
              class="tile"
              v-for="(tile, index) in row8"
              v-bind:class="tile.isDirty ? 'dirty' : 'clean'"
              v-bind:item="tile"
              v-bind:index="index"
              v-bind:key="tile.name"
            >
              <p>{{ tile.name }}</p>
              <img
                v-if="
                  tile.xCoordinate === roomba.currentPosition.xCoordinate &&
                  tile.yCoordinate === roomba.currentPosition.yCoordinate
                "
                src="../assets/roomba.png"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="roombaMoves.length > 0" class="roomba-movement-log">
        <h3>Movement Log</h3>
        <p
          v-for="(move, index) in roombaMoves"
          v-bind:class="move.includes('clean') ? 'success' : move.includes('docked') ? 'docked' : ''"
          v-bind:item="move"
          v-bind:id="move"
          v-bind:index="index"
          v-bind:key="index"
        >
          {{ move }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import RoombaService from '@/services/RoombaService';

export default {
  name: 'RoombaBoard',
  props: {},
  data() {
    return {
      gameStatus: 'Offline',
      dirtyTiles: [],
      roombaMoves: [],
      roomba: {},
      row1: [],
      row2: [],
      row3: [],
      row4: [],
      row5: [],
      row6: [],
      row7: [],
      row8: [],
      error: '',
      name: 'Vue.js',
    };
  },
  methods: {
    async moveRoomba() {
      try {
        let gameData = await RoombaService.moveRoomba();

        this.row1 = gameData.data.boardRows[0];
        this.row2 = gameData.data.boardRows[1];
        this.row3 = gameData.data.boardRows[2];
        this.row4 = gameData.data.boardRows[3];
        this.row5 = gameData.data.boardRows[4];
        this.row6 = gameData.data.boardRows[5];
        this.row7 = gameData.data.boardRows[6];
        this.row8 = gameData.data.boardRows[7];

        this.gameStatus = gameData.data.gameStatus;
        this.dirtyTiles = gameData.data.dirtyTiles;
        this.roomba = gameData.data.roomba;
        this.roombaMoves = gameData.data.roombaMoves.reverse();
      } catch (error) {
        console.log(error);
        this.error = error.message;
      }
    },
    async simulate() {
      try {
        let gameData = await RoombaService.simulate();

        this.row1 = gameData.data.boardRows[0];
        this.row2 = gameData.data.boardRows[1];
        this.row3 = gameData.data.boardRows[2];
        this.row4 = gameData.data.boardRows[3];
        this.row5 = gameData.data.boardRows[4];
        this.row6 = gameData.data.boardRows[5];
        this.row7 = gameData.data.boardRows[6];
        this.row8 = gameData.data.boardRows[7];

        this.gameStatus = gameData.data.gameStatus;
        this.dirtyTiles = gameData.data.dirtyTiles;
        this.roomba = gameData.data.roomba;
        this.roombaMoves = gameData.data.roombaMoves.reverse();
      } catch (error) {
        console.log(error);
        this.error = error.message;
      }
    },
    async restartRoomba() {
      try {
        let gameData = await RoombaService.startGame();

        this.row1 = gameData.data.boardRows[0];
        this.row2 = gameData.data.boardRows[1];
        this.row3 = gameData.data.boardRows[2];
        this.row4 = gameData.data.boardRows[3];
        this.row5 = gameData.data.boardRows[4];
        this.row6 = gameData.data.boardRows[5];
        this.row7 = gameData.data.boardRows[6];
        this.row8 = gameData.data.boardRows[7];

        this.gameStatus = gameData.data.gameStatus;
        this.dirtyTiles = gameData.data.dirtyTiles;
        this.roomba = gameData.data.roomba;
        this.roombaMoves = gameData.data.roombaMoves.reverse();
      } catch (error) {
        console.log(error);
        this.error = error.message;
      }
    },
  },
  async created() {
    try {
      let gameData = await RoombaService.startGame();

      this.row1 = gameData.data.boardRows[0];
      this.row2 = gameData.data.boardRows[1];
      this.row3 = gameData.data.boardRows[2];
      this.row4 = gameData.data.boardRows[3];
      this.row5 = gameData.data.boardRows[4];
      this.row6 = gameData.data.boardRows[5];
      this.row7 = gameData.data.boardRows[6];
      this.row8 = gameData.data.boardRows[7];

      this.gameStatus = gameData.data.gameStatus;
      this.dirtyTiles = gameData.data.dirtyTiles;
      this.roomba = gameData.data.roomba;
      this.roombaMoves = gameData.data.roombaMoves.reverse();
    } catch (error) {
      console.log(error);
      this.error = error.message;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  font-size: 10px;
  color: #2e2e2e;
}
.container {
  display: flex;
  justify-content: center;
}
.game-container {
  /* width: 50%; */
  margin: 1rem 4rem;
}
.roomba-movement-log {
  /* width: 30%; */
  text-align: start;
}
.roomba-movement-log > p {
  font-size: .8rem;
}
.roomba-movement-log > p.success {
  font-weight: bold;
  color: #23c27a;
}
.roomba-movement-log > p.docked {
  font-weight: bold;
  color: #c22323;
}
.game-stats {
  display: flex;
  justify-content: center;
  align-items: center;
}
.game-stat-container {
  padding: 1rem 2rem;
}
.game-stat-container > label {
  display: block;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #afafaf;
  letter-spacing: 0.075rem;
}
.game-stat-container > p {
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: bold;
  /* color: #afafaf; */
  letter-spacing: 0.075rem;
}
.game-stat-container > a.button {
  display: block;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  background: #42b983;
  color: #fefefe;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
.board {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tile {
  width: 5rem;
  height: 5rem;
  background: #77cac6;
  border: 1px solid #fff;
  color: #2e2e2e;
}

.tile > p {
  margin-bottom: 0;
}

.tile > img {
  width: 2rem;
  height: 2rem;
  margin-top: 0.25rem;
}

.dirty {
  background: #e9c80c;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
