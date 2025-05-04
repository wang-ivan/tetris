
//import { watchEffect } from 'vue'
import {Tetromino} from './tetromino'
import mitt from 'mitt'
import { reactive, ref } from 'vue'

export const initGame = mitt()
let shouldDrop = false
let dropping = false

const blockTypeStr = 'IJLOSTZ'
const colorList = ['#CE0000', '#E800E8', '#0072E3', '#02DF82', '#8CEA00', '#D9B300', '#F75000']
const maxIndex = 20
let colorIndex = 0
let block
export let score = ref(0)
export let scoreList = reactive([])
export const fixedBlocks = Array.from({length: 21}, () =>
                      Array.from({length: 11}, () => ({have: 0, backgroundColor: ''})))

initGame.on('html-content', (option) => {

  if (option.value === 'terminate') {
    if (!shouldDrop && !dropping) {
      shouldDrop = true
      dropOneBlock()
    }
  }
  if (option.value === 'start') {
    shouldDrop = false
    for (let i = 0; i < fixedBlocks.length; i++) {
      for (let j = 0; j < fixedBlocks[i].length; j++) {
        fixedBlocks[i][j].have = 0
        fixedBlocks[i][j].backgroundColor = ''
      }
    }
    console.log('game over')
  }
})

function dropOneBlock() {
  if (!shouldDrop) return
  dropping = true
  console.log("start drop block")
  let blockType = blockTypeStr.charAt(Math.floor(Math.random() * blockTypeStr.length))
  block = new Tetromino(blockType, colorList[colorIndex])
  colorIndex += 1
  if (colorIndex > 6) colorIndex = 0

  const interval = setInterval(() => {
    if (!shouldDrop) {
      clearInterval(interval)
      console.log('stop drop')
      dropping = false
      return
    }

    block.move('down')
    initGame.emit('block-update', block)
    //console.log(block.boxList)

    for (let i in block.boxList) {
      if (block.boxList[i][0] >= maxIndex || fixedBlocks[block.boxList[i][0]+1][block.boxList[i][1]].have === 1) {
        clearInterval(interval)
        console.log("block to down")
        dropping = false
        for (let j in block.boxList) {
          fixedBlocks[block.boxList[j][0]][block.boxList[j][1]].have = 1
          fixedBlocks[block.boxList[j][0]][block.boxList[j][1]].backgroundColor = block.color
        }
        if (shouldDrop) {
          dropOneBlock()
        }
        return
      }
    }

  }, 500)
}
// render table
export function updateMoveBlockColor(map, indexList, color) {

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (fixedBlocks[i][j].have === 0) {
        map[i][j] = { backgroundColor: '' }
      } else {
        map[i][j] = { backgroundColor: fixedBlocks[i][j].backgroundColor }
      }
    }
  }

  for (const [r, c] of indexList) {
    if (r >= 0 && r < map.length && c >= 0 && c < map[0].length) {
      map[r][c] = { backgroundColor: color }
    }
  }

  // 連成線消除之
  for (let i = 20; i > 0; i--) {
    let BlockList = []
    for (let j = 0; j < map[i].length; j++) {
      if (fixedBlocks[i][j].have === 1) BlockList.push(1)
    }
    if (BlockList.length === 10) {
      eliminateLine(i)
      upBlocksDown(i)
    }
  }
}

function eliminateLine(removeLine) {
  for (let i = 1; i <= 10; i++) {
    fixedBlocks[removeLine][i].have = 0
    fixedBlocks[removeLine][i].backgroundColor = ''
  }
  score.value += 1
}

function upBlocksDown(removeLine) {
  let currentLine = removeLine
  for (let i = removeLine-1; i > 0; i--) {
    for (let j = 1; j <= 10; j++) {
      fixedBlocks[currentLine][j].have = fixedBlocks[i][j].have
      fixedBlocks[currentLine][j].backgroundColor = fixedBlocks[i][j].backgroundColor
    }
    currentLine--
  }
}

initGame.on('key-input', (direction) => {
  if (!block) return
  let can_move = canMove(direction)
  if (checkPosition(direction)) {
    if (direction === 'left' && can_move) {
      block.move('left')
    } else if (direction === 'right' && can_move) {
      block.move('right')
    } else if (direction === 'down' && can_move) {
      block.move('down')
    } else if (direction === 'left rotation') {
      block.rotation('left')
    } else if (direction === 'right rotation') {
      block.rotation('right')
    }
  }
  initGame.emit('block-update', block)
})

function canMove(direction) {
  if (direction === 'left') {
    for (let i in block.boxList) {
      if (fixedBlocks[block.boxList[i][0]][block.boxList[i][1]-1].have === 1) return false
    }
  } else if (direction === 'right') {
    for (let i in block.boxList) {
      if (fixedBlocks[block.boxList[i][0]][block.boxList[i][1]+1].have === 1) return false
    }
  } else if (direction === 'down') {
    for (let i in block.boxList) {
      if (block.boxList[i][0]+1 >= maxIndex || fixedBlocks[block.boxList[i][0]+2][block.boxList[i][1]].have === 1) return false
    }
  }
  return true
}



function checkPosition(direction) {
  if (direction === 'left') {
    for (let i in block.boxList) {
      if (block.boxList[i][1] <= 1) {
        return false
      }
    }
  } else if (direction === 'right') {
    for (let i in block.boxList) {
      if (block.boxList[i][1] >= 10) {
        return false
      }
    }
  }

  return true
}
