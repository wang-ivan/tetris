<template>
  <div class="container">
    <button @click="processGame">{{ buttonText }}</button>
  </div>
</template>

<script setup>
  import {ref} from 'vue'
  import {initGame} from '../game/initGame'

  const buttonText = ref('start')
  const emit = defineEmits(['GameStop'])
  function processGame() {
    if (buttonText.value == 'start') {
      buttonText.value = 'terminate'

    } else {
      buttonText.value = 'start'
    }
    emit('GameStop', buttonText.value)
    initGame.emit('html-content', buttonText)
  }
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;

}

button {
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
