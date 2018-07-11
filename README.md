# 📚 vue-genesis-forms

` 🔥 support working: `
* input, textarea, switch, select, colorpick

` 🎨 next `
* mult select, toggle, datepicker, radio

`example usage:`
App.vue

```html
<template>
  <div>
    <app-form v-bind="{fields, data}" @form~input="input" @form~valid="valid"></app-form>
  </div>
</template>

<script>
import { AppForm, filter, field } from 'vue-genesis-forms'

export const fields = (scope) => {
  return filter(
    [
      field('name', 'Name').$text().$scopes(['settings']).$form({width: 12}).$validate('required').$render(),
      field('email', 'E-mail').$text().$scopes(['settings']).$form({width: 6})
        .$validate('email', true).$required().$render(),
      field('color', 'Color Nick').$color('rgba').$scopes(['settings']).$form({width: 3}).$render(),
      field('date', 'Date').$date().$scopes(['settings']).$form({width: 3}).$render(),
      field('about', 'About you').$textarea('max', 200).$scopes(['settings']).$form({width: 12, minHeight: '100px'})
        .$validate('maxLength', 20).$render(),
      field('things', 'Things').$select(select, false).$scopes(['settings']).$form({width: 3}).$render(),
      field('notifications', 'Active Messages').$switch(1, 0).$scopes(['settings']).$form({width: 3}).$render(),
      field('logs', 'Active Logs').$switch(1, 0).$scopes(['settings']).$form({width: 3}).$render(),
      field('sockets', 'Active Sockets').$switch(1, 0).$scopes(['settings']).$form({width: 3}).$render()
    ],
    scope
  )
}

export const select = [
  {label: 'test 1', value: 'test1'},
  {label: 'test 2', value: 'test2'}
]

export default {
  name: 'app',
  components: { AppForm },
  data: () => ({
    fields: fields('settings'), // settings is scope
    ok: false,
    errors: {},
    data: {}
  }),
  methods: {
    input (data) {
      this.data = data
    },
    valid (status, errors) {
      this.ok = status === true
      this.errors = errors
    }
  },
  mounted () {
    this.data = {
      name: 'Vue.js',
      email: 'test@test.com',
      things: 'test2',
      about: 'I love Vue.js <3',
      notifications: 1,
      sockets: 0,
      logs: 0
    }
  }
}
</script>
```

# Result:
![image](https://raw.githubusercontent.com/BlackMix/vue-forms/master/result.jpg)

# Credits:
*Genesis* [Link](https://github.com/phpzm/genesis)