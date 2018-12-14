import placement from './placement'

const win = window ,
    doc = document ,
    offsetLay = { top: 0 , left: 0 }

function windowSize(){
    let width = Math.max( doc.documentElement.clientWidth , win.innerWidth ) ,
        height = Math.max( document.documentElement.clientHeight , window.innerHeight ) ,
        { scrollTop , scrollLeft } = doc.documentElement
    return {
        width ,
        height ,
        scrollTop ,
    }
}

const calcPlacement = ( trigger , overlay , type ) => {
    let rectTrigger = trigger.getBoundingClientRect() ,
        rectOverlay = overlay.getBoundingClientRect() ,
        { left: triLeft , top: triTop , bottom: triBottom ,
            width: triWidth , height: triHeight } = rectTrigger ,
        { left: layLeft , top: layTop ,
            width: layWidth , height: layHeight } = rectOverlay ,
        { width: winWidth , height: winHeight , scrollTop } = windowSize() ,
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
    top += scrollTop
    return { top , left }
}


export { calcPlacement }