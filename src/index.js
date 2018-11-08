import Button from './components/button'

const components = {
    Button ,
}

const install = function( Vue , opts = {} ) {
    Object.keys( components ).forEach( key => {
        Vue.component( key , components[ key ] )
    } )
}

export {
    Button ,
}

export default {
    install
}
