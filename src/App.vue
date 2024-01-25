<script setup>
import { ref } from "vue";
import axios from "axios";
const toDayGames = ref([]);
const date = ref("");

const asyncData = async () => {
  const corsURL = "https://cors-anywhere.herokuapp.com/"; // use cors-anywhere to fetch api data
  const apiURL =
    "https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json";
  try {
    const res = await axios({
      method: "get",
      url: "/",
      headers: {
        Accept: "*/*, application/json, text/plain",
      },
    }).then((res) => console.log(res));

    toDayGames.value = res.data.scoreboard.games;
    date.value = res.data.scoreboard.gameDate;
  } catch (err) {
    console.log(err);
  }
};
asyncData();
</script>

<template>
  <div class="header">
    <h1 class="title">NBA Score!</h1>
    <h1 class="title2">To Day: {{ date }}</h1>
  </div>

  <div class="content">
    <div class="block" v-for="(data, index) in toDayGames" :key="index">
      <!-- 客隊 -->
      <div class="awayTeam">
        <img
          :src="
            'https://cdn.nba.com/logos/nba/' +
            `${data.awayTeam.teamId}` +
            '/global/L/logo.svg'
          "
        />
        <p class="awayName">{{ data.awayTeam.teamName }}</p>
        <p>{{ data.awayTeam.wins }}-{{ data.awayTeam.losses }}</p>
      </div>

      <!-- 客隊分數 -->
      <div class="awayScore">
        {{ data.awayTeam.score }}
      </div>

      <!-- 狀態 -->
      <div class="textCenter">
        <div v-if="data.gameStatus === 3">
          {{ data.gameStatusText }}
        </div>
        <div v-if="data.gameStatus === 2">
          <p class="live">Live</p>
          {{ data.gameStatusText }}
        </div>
        <div v-if="data.gameStatus === 1">
          {{ data.gameStatusText }}
        </div>
      </div>

      <!-- 主隊分數 -->
      <div class="homeScore">
        {{ data.homeTeam.score }}
      </div>

      <!-- 主隊 -->
      <div class="homeTeam">
        <img
          :src="
            'https://cdn.nba.com/logos/nba/' +
            `${data.homeTeam.teamId}` +
            '/global/L/logo.svg'
          "
        />
        <p class="homeName">{{ data.homeTeam.teamName }}</p>
        <p>{{ data.homeTeam.wins }}-{{ data.homeTeam.losses }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
img {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightslategray;
}
.title {
  font-size: 60px;
  font-weight: bold;
  color: white;
  margin-right: 60px;
}
.title2 {
  font-size: 40px;
  font-weight: bold;
}
.content {
  margin-top: 60px;
}
.block {
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;
  height: 150px;
  font-size: 30px;
  border-bottom: 4px dotted #0a6373;
}
.awayTeam {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}
.awayTeam > .awayName {
  margin-bottom: 10px;
}
.awayScore {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}
.textCenter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-bottom: 50px;
}
.live {
  text-align: center;
  background-color: red;
  color: white;
  margin-bottom: 15px;
}
.homeTeam {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}
.homeTeam > .homeName {
  margin-bottom: 10px;
}
.homeScore {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}

@media screen and (max-width: 800px) {
  .title {
    font-size: 48px;
    margin-right: 40px;
  }
  .title2 {
    font-size: 30px;
  }
  .block {
    font-size: 20px;
  }
}

@media screen and (max-width: 576px) {
  .title {
    font-size: 30px;
    margin-right: 20px;
  }
  .title2 {
    font-size: 15px;
  }
  .block {
    font-size: 15px;
  }
}
</style>
