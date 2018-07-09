<template>
  <div class="vc-checkerboard" :style="bgStyle"></div>
</template>

<script>
let _checkboardCache = {}

export default {
  name: 'Checkboard',
  props: {
    size: {
      type: [Number, String],
      default: 8
    },
    white: {
      type: String,
      default: '#fff'
    },
    grey: {
      type: String,
      default: '#e6e6e6'
    }
  },
  computed: {
    bgStyle () {
      return {
        'background-image': 'url(' + getCheckboard(this.white, this.grey, this.size) + ')'
      }
    }
  }
}

function renderCheckboard (c1, c2, size) {
  // Dont Render On Server
  if (typeof document === 'undefined') {
    return null
  }
  let canvas = document.createElement('canvas')
  canvas.width = canvas.height = size * 2
  let ctx = canvas.getContext('2d')
  // If no context can be found, return early.
  if (!ctx) {
    return null
  }
  ctx.fillStyle = c1
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = c2
  ctx.fillRect(0, 0, size, size)
  ctx.translate(size, size)
  ctx.fillRect(0, 0, size, size)
  return canvas.toDataURL()
}

function getCheckboard (c1, c2, size) {
  let key = c1 + ',' + c2 + ',' + size

  if (_checkboardCache[key]) {
    return _checkboardCache[key]
  } else {
    let checkboard = renderCheckboard(c1, c2, size)
    _checkboardCache[key] = checkboard
    return checkboard
  }
}
</script>

<style>
.vc-checkerboard {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-size: contain;
}
</style>
