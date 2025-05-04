import {createRouter, createWebHistory} from 'vue-router'

import TetrisGame from '@/pages/TetrisGame.vue'
import ScoreHistory from '@/pages/ScoreHistory.vue'



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/tetris', component: TetrisGame},
    {path: '/scoreHistory', component: ScoreHistory}
  ]
})

export default router
