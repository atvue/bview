const path = require( 'path' )
const { src , transform2RelativePath } = require('./project-path')
const fs = require( 'fs' )
const pathLessFile = path.resolve( src , 'style/default.less' ) ,
    lessPrefixKey = '@bview-prefix'


function parseLessVars( filtPath ) {
    const sheet = fs.readFileSync(filtPath).toString();
    const lessVars = {};
    const matches = sheet.match(/@(.*:[^;]*)/g) || [];

    matches.forEach( variable => {
        const definition = variable.split(/:\s*/);
        const varName = definition[0].replace(/['"]+/g, "").trim();
        const value = definition.splice(1).join("").trim()
        lessVars[varName] = value
    } ) ;
    return lessVars
}

function getNamePrefix(){
    let lessConfig = parseLessVars( pathLessFile ) ,
        namePrefix = lessConfig[ lessPrefixKey ] ,
        isStr = typeof namePrefix === 'string'
    if ( isStr === false ) {
        namePrefix = ''
    }
    return namePrefix
}

exports.rlaLessFile = transform2RelativePath( pathLessFile )

exports.lessPrefixKey = lessPrefixKey

exports.getNamePrefix = getNamePrefix
