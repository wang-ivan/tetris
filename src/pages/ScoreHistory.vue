

<template>
  <div class="container">
    <div class="row">
      <h3>歷史成績</h3>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <table>
        <thead>
          <tr>
            <th scope="col">第幾次</th>
            <th scope="col">分數</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in scoreList" :key="i">
            <td>第 {{ scoreList.indexOf(i)+1 }} 次</td>
            <td>{{ i }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
  import {scoreList} from '@/game/initGame'

</script>

<style scoped>
table {
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

th, td {
  border: 1px solid rgb(160 160 160);
}
</style>
