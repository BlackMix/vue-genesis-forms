<script>
import Field from '../base.vue'
import FieldAbstract from '../../abstract'
import { fieldRender } from '../../render-field'

import Color from './color'
export default {
  extends: FieldAbstract,
  components: {
    Field, Color
  },
  name: 'field-color',
  data: () => ({
    hex: '',
    show: false
  }),
  props: {
    color: {
      type: String,
      default: 'rgba(18, 246, 118, 0.79)'
    },
    colorType: {
      type: String,
      default: 'rgba'
    }
  },
  render (h, el = this) {
    return fieldRender(h, el, 
      h('div', { slot: 'component', class: { 'control': true, 'is-expanded': el.expanded, 'has-icons-left': el.icon } }, [
        h('div', { class: 'color', style: { 'background': el.hex }, on: {
            click: () => el.show = !el.show
          }
        }),
        el.show ?
        h('color', { class: 'color-select', ref: 'ColorSelect', props: { value: el.hex }, on: {
            input: (colors) => el.updateValue(el.colorTransform(colors))
          }
        })
        : null
      ])
    )
  },
  methods: {
    colorTransform (color) {
      switch (this.colorType) {
        case 'rgba': return 'rgba(' + color.rgba.r + ',' + color.rgba.g + ',' + color.rgba.b + ',' + color.rgba.a + ')'
        case 'hex': return color.hex
        case 'hsl': return 'hsl(' + color.hsl.h + ',' + color.hsl.s + ',' + color.hsl.l + ')'
      }
    },
    updateValue (color) {
      this.hex = color
      this.$emit('input', color)
    },
    outside (event) {
      const out = event.target.className
      if (out !== 'color' && !out.split('vc-')[1]) {
        this.show = false
      }
    }
  },
  watch: {
    value (color) {
      this.hex = color
    }
  },
  created () {
    this.hex = this.color
    this.updateValue(this.color)
    if (typeof window !== 'undefined') {
      document.addEventListener('click', this.outside)
    }
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      document.removeEventListener('click', this.outside)
    }
  }
}
</script>

<style coaped>
.color-select {
  z-index: 5;
  position: absolute;
}
.color {
  cursor: pointer;
  display: inline-block;
  width: 60px;
  height: 37px;
  margin: 0 10px 0 0;
  border-radius: 3px;
  border: 1px solid #e8e5e5;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.22), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>
