<template>
  <field :class="classNames" v-bind="{id, inline, problems, label, validate, title, tooltip, editable, visible}">
    <div slot="component">
      <div v-show="editable" :class="{'has-error': problems.length}">
        <div class="control is-clearfix">
          <input ref="input" class="input" autocomplete="off"
          v-bind="{id, type, name, placeholder, maxlength, disabled}"
          @keypress="keypress" @keyup="keyup" @blur="blur" @focus="focus" @keydown.enter.stop.prevent="enter"
          @input="updateValue($event.target.value)"/>
        </div>
        <div class="input-bar"></div>
      </div>
    </div>
  </field>
</template>

<script>
import Field from './base.vue'
import FieldAbstract from '../abstract'
import { mask } from '../../format'

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