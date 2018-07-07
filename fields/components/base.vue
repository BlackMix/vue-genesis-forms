<template>
  <div class="field" v-show="visible">
    <slot name="label">
      <div v-if="label" class="label">
        <label v-if="!inline" :class="{'label-with-error': problems.length}">
          {{ label }} <span v-if="!!validate" :title="title">*</span>
          <mix-tooltip v-if="tooltip">
            <span v-html="tooltip"></span>
          </mix-tooltip>
        </label>
      </div>
    </slot>
    <slot name="component"></slot>
    <slot name="error">
      <div v-if="label" class="field-base-error">
        <div v-if="showError" class="text-right error-message">
          <span v-for="problem in problems" :key="problem.path">{{ $t(problem.path, problem.parameters) }}</span>
        </div>
      </div>
    </slot>
  </div>
</template>

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
