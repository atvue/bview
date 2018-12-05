import placement from './placement'

const win = window ,
    doc = document ,
    offsetLay = { top: 10 , left: 0 }

function windowSize(){
    let width = Math.max( doc.documentElement.clientWidth , win.innerWidth ) ,
        height = Math.max( document.documentElement.clientHeight , window.innerHeight )
    return {
        width ,
        height ,
    }
}

const calcPlacement = ( trigger , overlay , type ) => {
    let rectTrigger = trigger.getBoundingClientRect() ,
        rectOverlay = overlay.getBoundingClientRect() ,
        { left: triLeft , top: triTop , bottom: triBottom ,
            width: triWidth , height: triHeight } = rectTrigger ,
        { left: layLeft , top: layTop ,
            width: layWidth , height: layHeight } = rectOverlay ,
        { width: winWidth , height: winHeight } = windowSize() ,
        top ,
        left ,
        { top: offsetTop , left: offsetLeft } = offsetLay
    switch( type ) {
        
        default: {
            let isBottomCovered = triBottom + layHeight > winHeight ,
                isLayRightCovered = triLeft + layWidth > winWidth
            if ( isBottomCovered ) {
                top = triTop - offsetTop - layHeight
            } else {
                top = triBottom + offsetTop
            }
            if ( isLayRightCovered ) {
                left = winWidth - layWidth + offsetLeft
            } else {
                left = triLeft + offsetLeft
            }
            break
        }
    }
    return { top , left }
}


export { calcPlacement }