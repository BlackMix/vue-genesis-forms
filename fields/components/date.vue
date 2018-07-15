<template>
<field :class="classNames" v-bind="{id, inline, problems, label, validate, title, tooltip, editable, visible}">
  <div slot="component" class="control">
    <b-datepicker
        v-model="model"
        :placeholder="placeholder"
        :min-date="minDate"
        :max-date="maxDate"
        :date-formatter="dateFormat"
        :size="size"
        @input="applyValue"
        >
    </b-datepicker>
  </div>
</field>
</template>

<script>
import Field from "./base.vue";
import FieldAbstract from "../abstract";

export default {
  extends: FieldAbstract,
  components: {
    Field
  },
  name: "field-date",
  props: {
    type: {
      type: String,
      default: "is-primary"
    },
    format: {
      type: String,
      default: 'pt-BR'
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    minDate: {
      type: String,
      default: null
    },
    maxDate: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: "is-small"
    }
  },
  data: () => ({
    model: null,
    isMouseDown: false
  }),
  methods: {
    applyValue (value) {
      this.$emit("input", value)
      return
    },
    dateFormat (date) {
      let formated = date.toLocaleDateString(this.format)
      this.applyValue(formated)
      return formated
    },
    clearValue () {
      this.model = this.cleaning
      this.updateValue(this.value)
    }
  },
  mounted() {
    this.applyValue(this.value)
  }
};
</script>

<style>
.datepicker {
  font-size: 0.875rem;
}
.datepicker .dropdown,
.datepicker .dropdown-trigger {
  width: 100%;
}
.datepicker .dropdown-item {
  font-size: inherit;
}
.datepicker .datepicker-header {
  padding-bottom: 0.875rem;
  margin-bottom: 0.875rem;
  border-bottom: 1px solid #666;
}
.datepicker .datepicker-footer {
  padding-top: 0.875rem;
  border-top: 1px solid #666;
}
.datepicker .datepicker-table {
  display: table;
  margin: 0 auto 0.875rem auto;
}
.datepicker .datepicker-table .datepicker-cell {
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  border-radius: 50%;
  padding: 0.5rem 0.75rem;
}
.datepicker .datepicker-table .datepicker-header {
  display: table-header-group;
}
.datepicker .datepicker-table .datepicker-header .datepicker-cell {
  color: grey;
  font-weight: 12px;
}
.datepicker .datepicker-table .datepicker-body {
  display: table-row-group;
}
.datepicker .datepicker-table .datepicker-body .datepicker-row {
  display: table-row;
}
.datepicker
  .datepicker-table
  .datepicker-body
  .datepicker-row
  .datepicker-cell.is-unselectable {
  color: #999;
}
.datepicker
  .datepicker-table
  .datepicker-body
  .datepicker-row
  .datepicker-cell.is-today {
  border: solid 1px #ccc;
}
.datepicker
  .datepicker-table
  .datepicker-body
  .datepicker-row
  .datepicker-cell.is-selectable {
  color: #333333;
}
.datepicker
  .datepicker-table
  .datepicker-body
  .datepicker-row
  .datepicker-cell.is-selectable:hover:not(.is-selected),
.datepicker
  .datepicker-table
  .datepicker-body
  .datepicker-row
  .datepicker-cell.is-selectable:focus:not(.is-selected) {
  background-color: #000;
  color: #fff;
  cursor: pointer;
}
.datepicker
  .datepicker-table
  .datepicker-body
  .datepicker-row
  .datepicker-cell.is-selected {
  background-color: #222;
  color: #fff;
}
.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell {
  padding: 0.3rem 0.75rem 0.75rem;
}
.datepicker
  .datepicker-table
  .datepicker-body.has-events
  .datepicker-cell.has-event {
  position: relative;
}
.datepicker
  .datepicker-table
  .datepicker-body.has-events
  .datepicker-cell.has-event
  .events {
  bottom: 0.425rem;
  display: flex;
  justify-content: center;
  left: 0;
  padding: 0 0.35rem;
  position: absolute;
  width: 100%;
}
.datepicker
  .datepicker-table
  .datepicker-body.has-events
  .datepicker-cell.has-event
  .events
  .event.is-primary {
  background-color: #333;
}
.datepicker
  .datepicker-table
  .datepicker-body.has-events
  .datepicker-cell.has-event.dots
  .event {
  border-radius: 50%;
  height: 0.35em;
  margin: 0 0.1em;
  width: 0.35em;
}
.datepicker
  .datepicker-table
  .datepicker-body.has-events
  .datepicker-cell.has-event.bars
  .event {
  height: 0.25em;
  width: 100%;
}
.datepicker
  .datepicker-table
  .datepicker-body.has-events
  .datepicker-cell.is-selected {
  overflow: hidden;
}
.datepicker
  .datepicker-table
  .datepicker-body.has-events
  .datepicker-cell.is-selected
  .events
  .event.is-primary {
  background-color: #333;
}
</style>
