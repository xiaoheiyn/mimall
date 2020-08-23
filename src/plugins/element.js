import Vue from 'vue'
import {
  Button,
  FormItem,
  Input,
  Form,
  icon,
  Message,
  MessageBox,
  Dialog,
  Cascader
} from 'element-ui'

Vue.use(Button)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Form)
Vue.use(icon)
Vue.use(Dialog)
Vue.use(Cascader)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm