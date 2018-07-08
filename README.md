# mix-vue-forms

example.

App.vue


```vue
<template>
<div>
  <app-form v-bind="{fields, data}" @form~input="input" @form~valid="valid"></app-form>
</div>
</template>

<script>
import { AppForm, filter, field } from 'mix-vue-forms'

export const fields = (scope) => {
  return filter(
    [
      field('name', 'Nome').$text().$scopes(['settings']).$form({width: 12}).$validate('required').$render(),
      field('email', 'E-mail').$text().$scopes(['settings']).$form({width: 6}).$validate('email', true).$required().$render(),
      field('color', 'Cor do Nick').$text().$scopes(['settings']).$form({width: 3}).$render(),
      field('about', 'Sobre você').$text().$scopes(['settings']).$form({width: 3}).$render(),
      field('coisas', 'Coisas').$select(select, false).$scopes(['settings']).$form({width: 3, same: true}).$render(),
      field('notifications', 'Ativar Mensagens').$switch(1, 0).$scopes(['settings']).$form({width: 3}).$render(),
      field('logs', 'Ativar Logs').$switch(1, 0).$scopes(['settings']).$form({width: 3}).$render(),
      field('sockets', 'Ativar Sockets').$switch(1, 0).$scopes(['settings']).$form({width: 3}).$render()
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
      name: 'Test quem é melhor Vue ou React',
      email: 'test@test.com',
      coisas: 'test2',
      notifications: 1,
      sockets: 1
    }
  }
}
</script>
```
# Result:
![image](https://raw.githubusercontent.com/BlackMix/vue-forms/master/result.jpg)

# Credits:
*Genesis* [Link](https://github.com/phpzm/genesis)