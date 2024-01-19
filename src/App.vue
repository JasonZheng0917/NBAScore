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
    const res = await axios.get(`${corsURL}${apiURL}`);
    toDayGames.value = res.data.scoreboard.games;
    console.log(toDayGames.value);
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

  <!-- 客隊 -->
  <div class="content">
    <div class="">
      <div class="awayTeam" v-for="(away, index) in toDayGames" :key="index">
        <img
          :src="
            'https://cdn.nba.com/logos/nba/' +
            `${away.awayTeam.teamId}` +
            '/global/L/logo.svg'
          "
        />
        <p>{{ away.awayTeam.teamName }}</p>
        <p>{{ away.awayTeam.wins }}-{{ away.awayTeam.losses }}</p>
      </div>
    </div>

    <!-- 客隊分數 -->
    <div class="">
      <div class="awayScore" v-for="(away, index) in toDayGames" :key="index">
        {{ away.awayTeam.score }}
      </div>
    </div>

    <!-- 狀態 -->
    <div class="">
      <div
        class="text-center"
        v-for="(status, index) in toDayGames"
        :key="index"
      >
        <div
          v-if="status.gameStatus === 3"
          class="bg-slate-400 text-black font-bold w-full"
        >
          {{ status.gameStatusText }}
        </div>
        <div v-if="status.gameStatus === 2" class="font-bold w-full">
          <p class="bg-red-500 text-white">Live</p>
          {{ status.gameStatusText }}
        </div>
        <div v-if="status.gameStatus === 1" class="text-black font-bold w-full">
          {{ status.gameStatusText }}
        </div>
      </div>
    </div>

    <!-- 主隊分數 -->
    <div class="">
      <div class="homeScore" v-for="(home, index) in toDayGames" :key="index">
        {{ home.homeTeam.score }}
      </div>
    </div>

    <!-- 主隊 -->
    <div class="">
      <div class="homeTeam" v-for="(home, index) in toDayGames" :key="index">
        <img
          :src="
            'https://cdn.nba.com/logos/nba/' +
            `${home.homeTeam.teamId}` +
            '/global/L/logo.svg'
          "
        />
        <p>{{ home.homeTeam.teamName }}</p>
        <p>{{ home.homeTeam.wins }}-{{ home.homeTeam.losses }}</p>
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
  display: flex;
  justify-content: space-around;
  margin-top: 60px;
  width: 100vw;
  height: 100vh;
}
.awayTeam {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px;
  font-size: 30px;
  border-top: 4px;
  margin-bottom: 50px;
}
.awayScore {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px;
  font-size: 30px;
  border-top: 4px;
  margin-bottom: 50px;
}
.text-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px;
  font-size: 30px;
  margin-bottom: 50px;
}
.homeTeam {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px;
  font-size: 30px;
  border-top: 4px;
  margin-bottom: 50px;
}
.homeScore {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px;
  font-size: 30px;
  border-top: 4px;
  margin-bottom: 50px;
}
</style>
