// import { formatOptions, formatPhone, formatMoney, formatDateTime, formatDate, formatBoolean } from '@/bootstrap/support/format'

export default (field, label, component = 'text', scopes = []) => {
  const defaults = ['index', 'view', 'create', 'edit']

  if (!Array.isArray(scopes)) {
    scopes = defaults
  }
  if (!scopes.length) {
    scopes = defaults
  }

  return {
    field: field,
    label: label,
    scopes: scopes,
    form: {component: component},
    grid: {},
    all: {},
    $scopes (scopes) {
      this.scopes = scopes
      return this
    },
    $in (scope) {
      this.scopes = [scope]
      return this
    },
    $out (scope) {
      this.scopes = defaults.filter(item => item !== scope)
      return this
    },
    $form (form) {
      return this.$assign('form', form)
    },
    $grid (grid) {
      return this.$assign('grid', grid)
    },
    $all (all) {
      return this.$assign('all', all)
    },
    $assign (property, options) {
      this[property] = Object.assign({}, this[property], options)
      return this
    },
    $filter (rule = 'like', value = '', component = '') {
      this.grid.filter = {rule, value, component}
      return this
    },
    $tab (name) {
      this.form.tab = name
      return this
    },
    $readonly () {
      this.form.disabled = true
      return this
    },
    $pk () {
      this.primaryKey = true
      return this.$readonly().$out('create').$grid({is: '60px'})
    },
    $validate (rule, value = true) {
      if (!this.form.validate) {
        this.form.validate = {}
      }
      this.form.validate[rule] = value
      return this
    },
    $required (require = true) {
      if (require) {
        this.$validate('required')
      }
      return this
    },
    $link (path) {
      this.grid.format = (value, row) => {
        let href = String(path)
        Object.keys(row).forEach(property => {
          href = href.replace(`{${property}}`, row[property])
        })
        return `<a href="#${href}">${value}</a>`
      }
      return this
    },
    $img (className = 'avatar') {
      this.grid.format = (value) => {
        return `<img class="grid-${className}-image" src="${value}"/>`
      }
      return this
    },
    $checkbox () {
      this.form.component = 'checkbox'
      // this.grid.format = formatBoolean
      return this
    },
    $color () {
      this.form.component = 'color'
      return this
    },
    $date () {
      this.form.component = 'date'
      // this.grid.format = formatDate
      return this
    },
    $datetime () {
      this.form.component = 'date'
      this.form.time = true
      // this.grid.format = formatDateTime
      return this
    },
    $file () {
      this.form.component = 'file'
      return this
    },
    $html () {
      this.form.component = 'html'
      return this
    },
    $input () {
      this.form.component = 'field-text'
      this.form.input = 'input'
      return this
    },
    $money () {
      this.form.component = 'money'
      // this.grid.format = formatMoney
      return this
    },
    $numeric () {
      this.form.component = 'numeric'
      return this
    },
    $password () {
      this.form.component = 'field-text'
      this.form.input = 'input'
      this.form.type = 'password'
      return this
    },
    $phone () {
      this.form.component = 'phone'
      // this.grid.format = formatPhone
      return this
    },
    $radio (options = []) {
      this.form.component = 'radio'
      if (!options.length) {
        options = [{value: 1, label: 'Sim'}, {value: 0, label: 'Não'}]
      }
      this.form.options = options
      // this.grid.format = formatOptions(options)
      return this
    },
    $search () {
      this.form.component = 'select'
      return this
    },
    $select (options = [], multiple = false) {
      this.form.component = 'field-select'
      this.form.placeholder = '.:. Selecione uma opção .:.'
      this.form.multiple = multiple
      this.form.options = options
      this.form.expanded = true
      // this.grid.format = formatOptions(options)
      return this
    },
    $switch (valueTrue, valueFalse) {
      this.form.component = 'field-switch'
      this.form.valueTrue = valueTrue
      this.form.valueFalse = valueFalse
      return this
    },
    $pivot (options = {}) {
      this.form.component = 'pivot'
      this.form.options = options
      return this
    },
    $separator () {
      this.form.component = 'separator'
      return this
    },
    $text () {
      this.form.component = 'field-text'
      this.form.input = 'input'
      return this
    },
    $textarea (options = null, value) {
      if (options) {
        this.form[options] = value
      }
      this.form.component = 'field-text'
      this.form.input = 'textarea'
      return this
    },
    $time () {
      this.form.component = 'time'
      return this
    },
    $toggle () {
      this.form.component = 'toggle'
      return this
    },
    $wysiwyg () {
      this.form.component = 'wysiwyg'
      return this
    },
    $event (type, action) {
      if (!this.form.events) {
        this.form.events = {}
      }
      this.form.events[type] = action
      return this
    },
    $render () {
      const base = {
        field: this.field,
        label: this.label,
        primaryKey: this.primaryKey,
        scopes: this.scopes
      }
      if (this.grid.filter && !this.grid.filter.component) {
        this.grid.filter.component = this.form.component
      }
      return Object.assign({}, base, this.form, this.all)
    }
  }
}