// 仅支持当前目录下定义的.sfcdocignore解析，仅支持全名解析

const fs = require( `fs` ) ,
    { existsFileSync } = require( `../fs-helper/existsFile` ) ,
    path = require( `path` ) ,
    sfcDocIgnoreFileName = `.sfcdocignore` ;

function parseRules( content = `` ) {
    let rules = content.split( `\n` ) ;
    return rules.map( rule => rule.trim() ).filter( rule => rule !== `` ) ;
}

function matchedRules( rules , file ) {
    return rules.reduce( ( isMatched , rule ) => {
        if ( isMatched === true ) {
            return true ;
        }
        return file.includes( rule ) ;
    } , false ) ;
}

const checkFileIsNeedIgnore = function( file ) {
    let flag = false ;
    if ( file === undefined || file === null || file === `` ) {
        return false ;
    }
    try {
        let result = path.parse( file ) ,
            { dir } = result ,
            ignoreFile = path.resolve( dir , sfcDocIgnoreFileName ) ,
            existed = existsFileSync( ignoreFile ) ;
        if ( existed ) {
            let content = fs.readFileSync( ignoreFile , `utf8` ) ,
                rules = parseRules( content ) ,
                matched = matchedRules( rules , file ) ;
            return matched ;
        } else {
            return false ;
        }
    } catch ( e ) {
        console.warn( e ) ;
    }
    return flag ;
} ;

exports.checkFileIsNeedIgnore = checkFileIsNeedIgnore ;

/*
function test() {
    let file = `/Users/maotingfeng/github/bview/src/components/dropdown/portal.vue`
    let result = checkFileIsNeedIgnore( file )
    console.log( result )
}

test() */
