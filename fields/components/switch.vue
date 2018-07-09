<template>
<field :class="classNames" v-bind="{id, inline, problems, label, validate, title, tooltip, editable, visible}">
  <div slot="component" class="control">
    <label
        class="switch"
        :class="[this.size, { 'is-disabled': this.disabled }]"
        ref="label"
        :disabled="disabled"
        :tabindex="disabled ? false : 0"
        @keydown.prevent.enter.space="$refs.label.click()"
        @mousedown="isMouseDown = true"
        @mouseup="isMouseDown = false"
        @mouseout="isMouseDown = false"
        @blur="isMouseDown = false">
        <input
            v-model="model"
            type="checkbox"
            @click.stop
            :disabled="disabled"
            :name="name"
            :true-value="valueTrue"
            :false-value="valueFalse">
        <span class="check" :class="[{ 'is-elastic': isMouseDown && !disabled }, type]"/>
        <span class="control-label"><slot/></span>
    </label>
  </div>
</field>
</template>

<script>
import Field from './base.vue'
import FieldAbstract from '../abstract'

export default {
  extends: FieldAbstract,
  components: {
    Field
  },
  name: 'field-switch',
  props: {
    type: {
      type: String,
      default: 'is-primary'
    },
    valueTrue: {
      type: [Object, Array, String, Number],
      default: () => true
    },
    valueFalse: {
      type: [Object, Array, String, Number],
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    size: {
      type: String,
      default: 'is-small'
    }
  },
  data: () => ({
    model: null,
    isMouseDown: false
  }),
  methods: {
    applyValue (value) {
      this.model = value
      this.$emit('input', value)
      return
    },
    clearValue () {
      this.model = this.cleaning
      this.updateValue(this.value)
    }
  },
  watch: {
    value (value) {
      this.applyValue(value)
    },
    model (value) {
      this.applyValue(value)
    }
  },
  mounted () {
    this.applyValue(this.value)
  }
}
</script>