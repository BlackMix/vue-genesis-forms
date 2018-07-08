<script>
import Field from './base.vue'
import FieldAbstract from '../abstract'
export default {
  extends: FieldAbstract,
  components: {
    Field
  },
  name: 'field-select',
  props: {
    type: {
      type: String,
      default: 'radio'
    },
    options: {
      type: Array,
      default: () => ([])
    },
    multiple: {
      type: Boolean,
      default: () => false
    },
    expanded: {
      type: Boolean,
      default: () => false
    },
    nativeSize: [String, Number],
    icon: {
      type: String,
      default: ''
    },
    separator: {
      type: Boolean,
      default: () => false
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    rounded: {
      type: Boolean,
      default: () => false
    },
    source: {
      type: Function
    },
    empty: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    model: null
  }),
  render (h, el = this) {
    return h('field', { 
        class: el.classNames, props: {
        id: el.id, 
        inline: el.inline, 
        problems: el.problems,
        label: el.label, 
        validate: el.validate,
        title: el.title,
        tooltip: el.tooltip,
        editable: el.editable,
        visible: el.visible
      } 
    },
    [
      h('div', { slot: 'component', class: { 'control': true, 'is-expanded': el.expanded, 'has-icons-left': el.icon } }, [
        h('span', { class: [ 'select', el.divClasses ]}, [
          h('select', { domprops: el.model, ref: 'select', props: { size: el.nativeSize, disable: el.disable, multiple: el.multiple },
            on: { change: (event) => el.$emit('input', event.target.value) } }, [
              el.placeholder ?
                h('option', { attrs: { value: null, selected: true, disabled: true, hidden: true }}, el.placeholder)
              : null,
              el.options ?
                el.options.map(option => h('option', { attrs: { value: option.value }}, option.label))
              : null
            ])
        ]),
        el.icon ?
          h('b-icon', { class: 'is-left', props: { icon: el.icon } })
        : null
      ])
    ])
  },
  computed: {
    divClasses () {
      return [this.size, {
        'is-fullwidth': this.expanded,
        'is-loading': this.loading,
        'is-multiple': this.multiple,
        'is-rounded': this.rounded,
        'is-empty': [undefined, null, ''].includes(this.model),
        'is-danger': this.problems.length
      }]
    }
  },
  methods: {
    applyValue (value) {
      if (!this.multiple) {
        this.model = value
        return
      }
      if (Array.isArray(value)) {
        this.model = value
      }
    },
    clearValue () {
      this.model = this.cleaning
      this.updateValue(this.model)
    }
  },
  watch: {
    value (value) {
      this.applyValue(value)
    }
  },
  created () {
    if (this.multiple) {
      this.model = []
    }
    if (this.source) {
      this.source(options => options.forEach(option => this.options.push(option)))
    }
  },
  mounted () {
    this.applyValue(this.value)
  }
}
</script>
