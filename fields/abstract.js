import { unMask } from '../format'

export default {
  props: {
    value: {
      default: undefined
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    input: {
      type: String,
      default: 'input'
    },
    field: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    small: {
      type: String,
      default: ''
    },
    width: {
      default: '12'
    },
    minHeight: {
      default: null
    },
    validate: {
      default: undefined
    },
    tooltip: {
      default: ''
    },
    title: {
      type: String,
      default: 'Este campo possui critérios de validação'
    },
    mask: {
      type: String,
      default: ''
    },
    className: {
      type: Array,
      default: () => ([])
    },
    inline: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    errors: {
      type: Array,
      default: () => ([])
    },
    visible: {
      type: Boolean,
      default: true
    },
    events: {
      type: Object,
      default: () => ({})
    },
    max: {
      default: () => undefined
    },
    cleanable: {
      type: Boolean,
      default: () => true
    },
    cleaning: {
      default: () => undefined
    }
  },
  computed: {
    classNames () {
      const classNames = []

      const width = 'column is-' + String(this.inline ? '100' : this.width)
      classNames.push(width)
      // classNames.push(this.$options.name)
      return classNames
    },
    problems () {
      if (!Array.isArray(this.errors)) {
        return []
      }
      return this.errors.filter(error => !error.status).map(error => ({
        path: 'validation.' + error.rule,
        parameters: error.parameters
      }))
    },
    name () {
      return this.field
    }
  },
  data: () => ({
    id: '',
    maxlength: ''
  }),
  methods: {
    updateValue (value) {
      if (this.mask) {
        value = unMask(this.mask, value)
      }
      if (this.pattern) {
        value = unMask(this.pattern, value)
      }
      this.$emit('input', value, this)
    },
    /**
     * @param {Object} 
     */
    focus () {
      if (this.events.focus && typeof this.events.focus === 'function') {
        this.$emit('event', 'focus', this)
      }
    },
    /**
     * @param {Object} 
     */
    blur () {
      if (this.events.blur && typeof this.events.blur === 'function') {
        this.$emit('event', 'blur', this)
      }
    },
    /**
     * @param {Object} 
     */
    keypress () {
      if (this.events.keypress && typeof this.events.keypress === 'function') {
        this.$emit('event', 'keypress', this)
      }
    },
    /**
     * @param {Object} 
     */
    keyup () {
      if (this.events.keyup && typeof this.events.keyup === 'function') {
        this.$emit('event', 'keyup', this)
      }
    },
    /**
     * @param {Object} 
     */
    enter () {
      if (this.events.enter && typeof this.events.enter === 'function') {
        this.$emit('event', 'enter', this)
      }
    }
  },
  created () {
    this.id = Math.random()
    this.maxlength = this.max
  }
}
