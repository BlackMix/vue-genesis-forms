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
    maxlength: '',
    isFocused: false
  }),
  render (h, el = this) {
    return fieldRender(h, el,
      h('div', { slot: 'component' }, [
        el.editable ?
        h('div', { class: { 'has-error': el.problems.length } }, [
          h('div', { class: 'control is-clearfix' }, [
            h(el.input, { class: 'input', ref: 'input', props: {
                id: Number,
                type: String,
                name: String,
                placeholder: String,
                maxlength: Number,
                disabled: Boolean
              },
              attrs: {
                maxlength: el.max,
                type: el.type
              },
              style: { 'min-height': el.minHeight },
              on: {
                keypress: el.keypress, keyup: el.keyup,
                blur: () => {
                  el.isFocused = false
                },
                focus: () => {
                  el.isFocused = true
                },
                'keydown.enter.stop.prevent': el.enter,
                input: (event) => el.updateValue(event.target.value)
              }
            })
          ])
        ])
        : null,
        el.maxlength ?
          h('small', { class: ['help counter', { 'is-invisible': !el.isFocused }] }, el.valueLength + '/' + el.maxlength)
        : null
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
  computed: {
    valueLength () {
      if (typeof this.value === 'string') {
        return this.value.length
      } else if (typeof this.value === 'number') {
        return this.value.toString().length
      }
      return 0
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