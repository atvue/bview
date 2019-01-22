import Button from './components/button'
import Select from './components/select'
import Input from './components/input'
import Switches from './components/switches'
import Radio from './components/radio'
import Checkbox from './components/checkbox'
import Icon from './components/icon'
import Textarea from './components/textarea'

const components = {
    Button,
    Select,
    Input,
    Switches,
    Textarea,
    Radio,
    Checkbox,
    Icon
}

const install = function(Vue) {
    Object.keys(components).forEach(key => {
        Vue.component(key, components[key])
    })
}

export {
    Button,
    Select,
    Input,
    Switches,
    Textarea,
    Radio,
    Checkbox,
    Icon
}

export default {
    install
}


const ENV = process.env.NODE_ENV

/* eslint-disable no-console */
if (ENV !== 'production' && ENV !== 'test' && typeof console !== 'undefined' && console.warn && typeof window !== 'undefined') {
    console.warn('You are using a whole package of bui, ' + 'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.')
}