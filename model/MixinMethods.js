import * as Validators from 'vuelidate/lib/validators'

const arrayToObject = (accumulate, item) => {
  accumulate[item.field] = item
  return accumulate
}

export default {
  methods: {
    /**
     */
    touch () {
      this.$v.$touch()
    },
    /**
     */
    reset () {
      this.$v.$reset()
    },
    /**
     * @param fields
     * @returns {Object}
     */
    generateValidations (fields) {
      if (!Array.isArray(fields)) {
        return {}
      }
      const validations = {}
      fields
        .filter(schema => !!schema.validate)
        .forEach(schema => {
          validations[schema.field] = this.configureValidation(schema.validate)
        })
      return validations
    },
    /**
     * @param {Object} validate
     * @return {Object}
     */
    configureValidation (validate) {
      const configure = {}
      Object.keys(validate).forEach(property => {
        let action = Validators[property]
        if (!action.length) {
          configure[property] = action
          return true
        }
        configure[property] = action((validate[property]))
      })
      return configure
    },
    /**
     */
    updateComponents () {
      const components = {}
      if (this.tabs.length) {
        this.tabs.forEach(tab => {
          components[tab.name] = this.fields.filter(field => field.tab === tab.name).reduce(arrayToObject, {})
        })
      }
      if (this.steps.length) {
        this.steps.forEach(step => {
          components[step.name] = this.fields.filter(field => field.step === step.name).reduce(arrayToObject, {})
        })
      }
      this.components = components
    },
    /**
     */
    updateSchemas () {
      this.schemas = this.fields.reduce(arrayToObject, {})
    },
    /**
     */
    updateRecord () {
      const reduce = (accumulate, field) => {
        accumulate[field] = this.data[field] || this.schemas[field].default
        if (this.$route.query[field]) {
          accumulate[field] = this.$route.query[field]
        }
        return accumulate
      }
      const record = Object.keys(this.schemas).reduce(reduce, {})
      this.setRecord(record)
    },
    /**
     * @param {Object} record
     * @returns this
     */
    setRecord (record) {
      this.record = record
      this.executeChange()
      return this
    },
    /**
     * @param {string} field
     * @param {Object} parameters
     */
    isProgrammatically (parameters) {
      if (typeof parameters !== 'object') {
        return false
      }
      const args = [...parameters]
      if (args.length <= 1) {
        return false
      }
      return parameters[1] === true
    },
    /**
     * @param {string} field
     * @param {Object} parameters
     */
    formInput (field, parameters = []) {
      const programmatically = this.isProgrammatically(parameters)
      if (programmatically) {
        return
      }
      if (this.$v.record[field]) {
        this.$v.record[field].$touch()
      }
      // pass errors to fields
      this.schemas[field].errors = this.getErrors(field)

      // emit changes to parent
      if (!this.readonly) {
        this.fireEvent(field, 'change')
        this.$emit('form~input', this.record)
      }

      // get invalid fields
      const reduce = (accumulate, key) => {
        if (this.$v.record[key].$invalid) {
          accumulate[key] = true
        }
        return accumulate
      }
      const invalids = Object.keys(this.$v.record).reduce(reduce, {})
      // emit invalids to parent
      this.$emit('form~valid', !this.$v.$invalid, invalids)
    },
    /**
     * @param {string} event
     * @param {Vue} $field
     * @param {Object} parameters
     */
    formEvent (event, $field, parameters = {}) {
      const field = $field.field
      this.fireEvent(field, event, parameters)
    },
    /**
     * @param {string} field
     * @param {string} event
     * @param {Object} parameters
     */
    fireEvent (field, event, parameters = {}) {
      if (this.schemas[field] && this.schemas[field].events && typeof this.schemas[field].events[event] === 'function') {
        this.schemas[field].events[event](this.record, this.schemas, this, parameters)
      }
    },
    /**
     */
    executeChange () {
      if (typeof this.change === 'function') {
        this.change(this.record, this.schemas, this)
      }
      this.modified = true
    },
    /**
     * @param {String} field
     * @return {Array}
     */
    getErrors (field) {
      const errors = []
      if (this.schemas[field].validate && this.$v.record[field] && this.$v.record[field].$error) {
        Object.keys(this.schemas[field].validate).forEach(rule => {
          const status = this.$v.record[field][rule]
          const parameters = this.$v.record[field].$params[rule]
          errors.push({rule, status, parameters})
        })
      }
      return errors
    },
    /**
     * @param {string} namespace
     * @param {AxiosResponse} response
     */
    fireWatch (namespace, response) {
      if (this.watches[namespace] && typeof this.watches[namespace] === 'function') {
        this.watches[namespace](this.record, this.schemas, this, response)
      }
    }
  }
}
