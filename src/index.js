import Button from './components/button'
import Select from './components/select'
import Input from './components/Input'
import Switch from './components/Switches'
import Textarea from './components/Textarea'

const components = {
    Button,
    Select,
    Input,
    Switch,
    Textarea
}

const install = function(Vue, opts = {}) {
    Object.keys(components).forEach(key => {
        Vue.component(key, components[key])
    })
}

export {
    Button,
    Select,
    Input,
    Switch,
    Textarea
}

export default {
    install
}


const ENV = process.env.NODE_ENV;
if (ENV !== 'production' && ENV !== 'test' && typeof console !== 'undefined' && console.warn && typeof window !== 'undefined') {
    console.warn('You are using a whole package of bui, ' + 'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.')
}