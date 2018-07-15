// WIP
import Quasar, { QInput } from 'quasar-framework'

export const QuasarInstall = (Vue) => {
  Vue.use(Quasar, { cfg: {}, components: {
      QInput
    } 
  })
}
