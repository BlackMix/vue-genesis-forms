<script>
import Field from './base.vue'
import FieldAbstract from '../abstract'
import { mask } from '../../format'
import { fieldRender } from '../render-field'

export default {
  extends: FieldAbstract,
  components: {
    Field
  },
  name: 'field-text',
  data: () => ({
    html: '',
    maxlength: ''
  }),
  render (h, el = this) {
    return fieldRender(h, el,
      h('div', { slot: 'component' }, [
        el.editable ?
        h('div', { class: { 'has-error': el.problems.length } }, [
          h('div', { class: 'control is-clearfix' }, [
            h('input', { ref: 'input', class: 'input', props: {
                id: Number,
                type: String,
                name: String,
                placeholder: String,
                maxlength: Number,
                disabled: Boolean
              },
              on: {
                keypress: el.keypress, keyup: el.keyup, blur: el.blur, focus: el.focus, 'keydown.enter.stop.prevent': el.enter,
                input: (event) => el.updateValue(event.target.value)
              }
            })
          ])
        ])
        : null,
        h('div', { class: 'input-bar' })
      ])
    )
  },
  methods: {
    applyValue (value) {
      if (value === undefined) {
        return
      }
      if (value === null) {
        return
      }
      if (this.mask) {
        this.maxlength = this.mask.length
        value = mask(this.mask, String(value))
      }
      this.html = value
      if (this.$refs.input) {
        this.$refs.input.value = value
      }
    }
  },
  watch: {
    value (value) {
      this.applyValue(value)
    },
    mask () {
      this.applyValue(this.value)
    }
  },
  mounted () {
    this.applyValue(this.value)
  }
}
</script>