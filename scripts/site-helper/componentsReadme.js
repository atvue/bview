const fs = require( 'fs' )
const path = require( 'path' )
const { components: pathComponents } = require( '../project-path' )
const getReadMeConfig = require( './readMeConfig' )
const suffix = '.st' ,
    readMeFileName = `README${suffix}`


function readDir(){
    return new Promise( ( r , j ) => {
        fs.readdir( pathComponents , ( error , files ) => {
            if ( error ) {
                return j( error )
            }
            r( files )
        } )
    } )
}

async function mapFileToConfig( fileName ) {
    let file = path.resolve( pathComponents , fileName , readMeFileName ) ,
        obj = {
            name: fileName ,
            readMeConfig: undefined ,
        }
        readMeConfig = await getReadMeConfig( file )
    Object.assign( obj , { readMeConfig } )
    return obj
}

async function readComponentsReadme(){
    try {
        let dirs = await readDir() ,
            componentsConfig = await Promise.all( dirs.map( mapFileToConfig ) )
        return componentsConfig
    }catch( e ) {
        throw e
    }
}
/**
 * 1. 定义order的，按order大小排序
 * 2. 未定义order的统一按name大小排序
 * 3. 未定义需要的字段的统一在前面
 *  */
function sortComponents( arr ){
    arr.sort( ( a , b ) => {
        let { readMeConfig: aConfig } = a ,
            { readMeConfig: bConfig  } = b
        if ( aConfig && bConfig ) {
            let { order: aOrder } = aConfig ,
                { order: bOrder } = bConfig ,
                hasAOrder = aOrder !== undefined ,
                hasBOrder = bOrder !== undefined
            if ( hasAOrder && hasBOrder ) {
                return aOrder - bOrder
            } else {
                if ( hasAOrder ) {
                    return 1
                }
                if ( hasBOrder ) {
                    return -1
                }
                return a.name < b.name ? -1 : 1
            }
        } else {
            if ( aConfig ) {
                return 1
            }
            if ( bConfig ) {
                return -1
            }
            return a.name < b.name ? -1 : 1
        }
    } )
    return arr
}

exports.siteComponentsReadMeSortedConfig = async function(){
    let componentsConfig = await readComponentsReadme() ,
        sorted = sortComponents( componentsConfig )
    return sorted
}