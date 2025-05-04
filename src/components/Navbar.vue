<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar">
    <div class="logo">俄羅斯方塊</div>
    <ul class="nav-links" :class="{ open: menuOpen }">
      <li><router-link to="/tetris">遊戲頁面</router-link></li>
      <li><router-link to="/scoreHistory">分數紀錄</router-link></li>
    </ul>
    <button class="hamburger" @click="toggleMenu">
      ☰
    </button>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

const route = useRoute()
watch(() => route.fullPath, () => {
  menuOpen.value = false
})
</script>

<style scoped>

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
}

/* 桌機版選單 */
.nav-links {
  list-style: none;
  display: flex;
  gap: 24px;
}

.nav-links li a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.nav-links li a:hover {
  color: #007bff;
}

.hamburger {
  font-size: 1.5rem;
  background: none;
  border: none;
  display: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .nav-links {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: #fff;
    display: none;
    padding: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .nav-links.open {
    display: flex;
  }

  .hamburger {
    display: block;
  }
}

</style>
