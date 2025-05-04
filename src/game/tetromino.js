
import { fixedBlocks } from "./initGame"

export class Tetromino {

  constructor(shape, color) {
    // shape: I, J, L, O, S, T, Z
    // data structure: [[2, 3], [2, 4], [3,4], [4, 4]]
    // 第三格式旋轉點
    this.boxList
    this.color = color
    this.blockType
    this.produceTetromino(shape)
  }

  produceTetromino(shape) {
      this.blockType = shape
      let firstColumn = Math.floor(Math.random()*8+1)
      switch (shape) {
        case 'I':
          this.boxList = [[1, firstColumn], [0, firstColumn], [-1, firstColumn], [-2, firstColumn]]
          break
        case 'J':
          this.boxList = [[1, firstColumn], [1, firstColumn+1], [0, firstColumn+1], [-1, firstColumn+1]]
          break
        case 'L':
          this.boxList = [[1, firstColumn], [0, firstColumn], [1, firstColumn+1], [-1, firstColumn]]
          break
        case 'O':
          this.boxList = [[1, firstColumn], [1, firstColumn+1], [0, firstColumn], [0, firstColumn+1]]
          break
        case 'S':
          this.boxList = [[1, firstColumn], [1, firstColumn+1], [0, firstColumn+1], [0, firstColumn+2]]
          break
        case 'T':
          this.boxList = [[0, firstColumn], [0, firstColumn+1], [0, firstColumn+2], [1, firstColumn+1]]
          break
        case 'Z':
          this.boxList = [[0, firstColumn], [0, firstColumn+1], [1, firstColumn+1], [1, firstColumn+2]]
          break
      }
  }

  move(direction) {
    switch (direction) {
      case 'left':
        for (let i in this.boxList) {
          this.boxList[i][1] = this.boxList[i][1]-1
        }
        break
      case 'right':
        for (let i in this.boxList) {
          this.boxList[i][1] = this.boxList[i][1]+1
        }
        break
      case 'down':
        for (let i in this.boxList) {
          this.boxList[i][0] = this.boxList[i][0]+1
        }
    }
  }

  rotation(direction) {
    if (this.blockType === 'O') return

    const center = this.boxList[1]
    const newBoxList = []

    for (let i = 0; i < this.boxList.length; i++) {
      const [x, y] = this.boxList[i]
      const dx = x - center[0]
      const dy = y - center[1]
      let newX, newY

      if (direction === 'right') {
        newX = center[0] - dy
        newY = center[1] + dx

      } else if (direction === 'left') {
        newX = center[0] + dy
        newY = center[1] - dx
      }
      // 如果選轉後衝突，則取消旋轉
      if (fixedBlocks[newX][newY].have === 1) return
      newBoxList.push([newX, newY])
    }
    const isValid = newBoxList.every(([r, c]) => r >= 0 && r < 20 && c >= 1 && c < 10)
    if (isValid) this.boxList = newBoxList

  }
}
