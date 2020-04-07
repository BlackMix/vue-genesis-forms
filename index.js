import Vue from 'vue'
import Buefy from 'buefy'

// F // later I fix it, no time to fix it now, so add full Buefy
Vue.use(Buefy)

import fields from './configure/field'
import * as FieldsComponents from './fields'

const components = Object.assign({}, FieldsComponents)

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})

export const field = (field, label, component, scopes = []) => {
  return fields(field, label, component, scopes)
}

export const filter = (fields, scope) => {
  return fields.filter(field => scope ? field.scopes && field.scopes.includes(scope) : true)
}

export { default as AppForm } from './form.vue'
