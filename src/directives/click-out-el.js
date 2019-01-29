let store = new Map()

export default {
    bind( el , { value } ) {
        function documentHandler( event ) {
            if ( el.contains( event.target ) ) {
                return
            } else {
                if ( value ) {
                    value( event )
                }
            }
        }
        store.set( el , documentHandler )
        document.addEventListener( `click` , documentHandler )
    } ,
    unbind( el ) {
        let handler = store.get( el )
        document.removeEventListener( `click` , handler )
        store.delete( el )
    }
}
