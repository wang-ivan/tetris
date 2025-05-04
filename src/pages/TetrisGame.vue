
<template>
  <div class="wrapper">
    <div class="container">
      <h3>score : {{ score }}</h3>
    </div>
  </div>

  <div class="wrapper">
    <table>
      <tbody>
        <tr v-for="i in 20" :key="i">
          <td v-for="j in 10" :key="j" :id="i+'-'+j" :style="map[i][j]"></td>
        </tr>
      </tbody>
    </table>
    <div class="rightWoed">
      <p>Ａ：左移</p>
      <p>Ｄ：右移</p>
      <p>Ｓ：向下加速</p>
      <p>Ｑ：左轉</p>
      <p>Ｅ：右轉</p>
    </div>

  </div>
  <div class="wrapper">
    <GameButton @GameStop="handleStop"/>
  </div>

</template>

<script setup>
  import GameButton from '../components/GameButton.vue'
  import {ref, onMounted, onBeforeUnmount, reactive} from 'vue'
  import { initGame, updateMoveBlockColor, score, scoreList } from '@/game/initGame'
  const boxList = ref([])
  const ROWS = 21
  const COLS = 11
  let map = reactive(Array.from({length: ROWS}, () =>
                      Array.from({length: COLS}, () => ({backgroundColor: ''}))))
  function handleBlockUpdate(data) {
    boxList.value = data.boxList
    updateMoveBlockColor(map, data.boxList, data.color)
  }

  function handleKeyDown(e) {

    if (e.key === 'a' || e.key === 'A') {
      initGame.emit('key-input', 'left')
    } else if (e.key === 'd' || e.key === 'D') {
      initGame.emit('key-input', 'right')
    } else if (e.key === 's' || e.key === 'S') {
      initGame.emit('key-input', 'down')
    } else if (e.key ==='q' || e.key === 'Q') {
      initGame.emit('key-input', 'left rotation')
    } else if ( e.key === 'e' || e.key === 'E') {
      initGame.emit('key-input', 'right rotation')
    }
  }

  onMounted(() => {
    initGame.on('block-update', handleBlockUpdate)
    window.addEventListener('keydown', handleKeyDown)
  })

  onBeforeUnmount(() => {
    initGame.off('block-update', handleBlockUpdate)
    window.removeEventListener('keydown', handleKeyDown)
  })

  function handleStop(option){
    if (option === 'start') {
      window.removeEventListener('keydown', handleKeyDown)
      scoreList.push(score.value)
      score.value = 0
    } else window.addEventListener('keydown', handleKeyDown)
  }

</script>

<style scoped>

table {
  margin-top: 0rem;
  margin-bottom: 1rem;
  border-collapse: collapse;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
}


td {
  border: 1px solid rgb(160 160 160);
  padding: 10px;
}

.rightWoed {
  padding-left: 0rem;
}

.wrapper {
  display: grid;
  grid-template-columns: 70% 30%;
}
</style>
