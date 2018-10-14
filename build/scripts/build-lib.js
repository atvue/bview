
const fse = require('fs-extra')
const { compileJS } = require( './compile-js' )
const { compileVue } = require( './compile-vue' )
const { libDir } = require( './config' )


async function init(){
    await fse.remove( libDir )
    compileJS()
    compileVue()
}


init()