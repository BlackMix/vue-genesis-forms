<script>
export default {
  name: 'field-base',
  props: {
    classNames: {
      type: String
    },
    editable: {
      type: Boolean
    },
    inline: {
      type: Boolean
    },
    visible: {
      type: Boolean
    },
    id: {
      type: Number
    },
    problems: {
      type: Array
    },
    label: {
      type: String
    },
    validate: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String
    },
    tooltip: {
      type: String
    }
  },
  render (h, el = this) {
    return h('div', { class: 'field', style: { 'display: none': el.visible } }, [
      [el.$slots.label, [
        el.label ?
          h('div', { class: 'label' }, [
            !el.inline ?
              h('label', { class: { 'label-with-error': el.problems.length } }, [
                h('span', {}, el.label),
                el.validate && el.validate.required ?
                  h('span', { attrs: { title: el.title } }, '*')
                : null
              ])
            : null
          ])
        : null
      ]],
      [el.$slots.component],
      [el.$slots.error, [
        el.label ?
        h('div', { class: 'field-base-error' }, [
          el.showError ?
            h('div', { class: 'text-right error-message' }, el.problems.map(
                problem => h('span', {}, el.$t(problem.path, problem.parameters))
              )
            )
          : null
        ])
        : null
      ]]
    ])
  },
  computed: {
    showError () {
      if (this.editable) {
        return !!this.problems.length
      }
      return false
    }
  },
  methods: {
    showErrors () {
      const errors = []
      this.problems.forEach(error => {
        errors.push(' - ' + this.$t(error.path, error.parameters))
      })
      console.log('form base - errors', errors)
    }
  }
}
</script>
