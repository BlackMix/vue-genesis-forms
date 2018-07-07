import Vue from 'vue'
import * as FieldsComponents from './fields'
const components = Object.assign({}, FieldsComponents)

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})

import fields from './configure/field'
export { default as AppForm } from './form.vue'

export const field = (field, label, component, scopes = []) => {
  return fields(field, label, component, scopes)
}

export const filter = (fields, scope) => {
  return fields.filter(field => scope ? field.scopes && field.scopes.includes(scope) : true)
}
