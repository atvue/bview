import Vue from 'vue'
if ( typeof window !== `undefined` ) {
    global.window.resizeTo = ( width , height ) => {
        global.window.innerWidth = width || global.window.innerWidth
        global.window.innerHeight = height || global.window.innerHeight
        global.window.dispatchEvent( new Event( `resize` ) )
    }
    global.window.scrollTo = () => {}
}
// The built-in requestAnimationFrame and cancelAnimationFrame not working with jest.runFakeTimes()
// https://github.com/facebook/jest/issues/5147
global.requestAnimationFrame = cb => setTimeout( cb , 0 )
global.cancelAnimationFrame = cb => clearTimeout( cb , 0 )

// jest 暂不支持vue transition组件的一些特性
// https://github.com/eddyerburgh/avoriaz/issues/77
// https://github.com/eddyerburgh/avoriaz/issues/35
const fakeTransitions = () => {
    const { getComputedStyle } = window
    window.getComputedStyle = function getComputedStyleStub( el ) {
        let obj = getComputedStyle( el )
        return {
            ...obj ,
            transitionDelay: `` ,
            transitionDuration: `` ,
            animationDelay: `` ,
            animationDuration: `` ,
            getPropertyValue() {
                return undefined
            } ,
        }
    }
    Vue.component( `transition` , {
        render( createElement ) {
            return createElement( `div` , this.$slots.default )
        } ,
    } )
}
fakeTransitions()
