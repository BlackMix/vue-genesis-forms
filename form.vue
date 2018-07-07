<template>
  <div class="fix columns is-multiline">
    <component v-for="schema in schemas" :key="schema.field" :is="schema.component"
        v-bind="schema" v-model="record[schema.field]"
        @input="formInput(schema.field, arguments)" @event="formEvent"></component>
  </div>
</template>

<script>
import { validationMixin as validation } from 'vuelidate'
import { data, methods, props, watch } from './model'
export default {
  mixins: [validation, data, methods, props, watch],
  name: 'app-form',
  validations () {
    const validations = this.generateValidations(this.fields)
    return {
      record: validations
    }
  },
  created () {
    this.updateComponents()
    this.updateSchemas()
    this.updateRecord()
  }
}
</script>

<style>

</style>
