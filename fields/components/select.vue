<template>
  <field :class="classNames" v-bind="{id, inline, problems, label, validate, title, tooltip, editable, visible}">
    <div slot="component" class="control" :class="{ 'is-expanded': expanded, 'has-icons-left': icon }">
      <span class="select" :class="divClasses">
        <select 
          v-model="model"
          ref="select"
          :size="nativeSize"
          v-bind="{disable, multiple}"
          @change="$emit('input', model)"
          >
          <option
            v-if="placeholder"
            :value="null"
            selected
            disabled
            hidden
            >
            {{ placeholder }}
          </option>
         
          <option v-if="options" v-for="option in options" :key="option" :value="option.value">{{option.label}}</option>
          
        </select>
          <b-icon
            v-if="icon"
            class="is-left"
            :icon="icon"
          />

      </span>

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
