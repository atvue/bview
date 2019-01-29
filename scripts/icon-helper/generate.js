// svg 文件 to Vue 组件
const fse = require( `fs-extra` )
const path = require( `path` )
const glob = require( `glob` )
const SVGO = require( `svgo` )
const { compile } = require( `vue-template-compiler` )
const stripWith = require( `vue-template-es2015-compiler` )

const root = process.cwd()

const svgDir = path.resolve( root , `src/style/svgs` ) ,
    outputDir = path.resolve( root , `src/icons` )

// SVGO优化svg插件参数
const svgoConfig = {
    plugins: [
        {
            cleanupAttrs: true
        } ,
        {
            removeDoctype: true
        } ,
        {
            removeXMLProcInst: true
        } ,
        {
            removeComments: true
        } ,
        {
            removeMetadata: true
        } ,
        {
            removeTitle: true
        } ,
        {
            removeDesc: true
        } ,
        {
            removeUselessDefs: true
        } ,
        {
            removeEditorsNSData: true
        } ,
        {
            removeEmptyAttrs: true
        } ,
        {
            removeHiddenElems: true
        } ,
        {
            removeEmptyText: true
        } ,
        {
            removeEmptyContainers: true
        } ,
        {
            removeViewBox: false
        } ,
        {
            cleanupEnableBackground: true
        } ,
        {
            convertStyleToAttrs: true
        } ,
        {
            convertColors: true
        } ,
        {
            convertPathData: true
        } ,
        {
            convertTransform: true
        } ,
        {
            removeUnknownsAndDefaults: true
        } ,
        {
            removeNonInheritableGroupAttrs: true
        } ,
        {
            removeUselessStrokeAndFill: true
        } ,
        {
            removeUnusedNS: true
        } ,
        {
            cleanupIDs: true
        } ,
        {
            cleanupNumericValues: true
        } ,
        {
            moveElemsAttrsToGroup: true
        } ,
        {
            moveGroupAttrsToElems: true
        } ,
        {
            collapseGroups: true
        } ,
        {
            removeRasterImages: false
        } ,
        {
            mergePaths: true
        } ,
        {
            convertShapeToPath: true
        } ,
        {
            sortAttrs: true
        } ,
        {
            removeDimensions: true
        } ,
        {
            removeAttrs: { attrs: `(stroke|fill|class|style)` }
        } ,
        {
            removeStyleElement: true
        }
    ]
}

// 获取所有svg文件
async function svgFiles() {
    return await new Promise( ( r , j ) => {
        glob( `${svgDir}/*.svg` , function( er , file ) {
            if ( er ) {
                return j( er )
            }
            return r( file )
        } )
    } )
}

// 简单处理：svg转化为vue组件render函数
// @NOTE 之后可以改成转化为object
// icon组件中解析为render函数
async function svgToVue( cnt , filePath ) {
    let optimizeCnt = await new SVGO( svgoConfig )
            .optimize( cnt , { path: filePath } )
            .then( res => res.data ) ,
        { render: renderFunction } = compile( optimizeCnt , {
            preserveWhitespace: false ,
            modules: [
                {
                    transformNode: () => {
                        // el
                        // @TODO 需要修改输出的render函数
                    }
                }
            ]
        } )

    renderFunction = `
      function render(_h, _vm) {
        ${renderFunction}
      }
    `
    renderFunction = stripWith( renderFunction , {
        transforms: {
            stripWithFunctional: true
        }
    } )
    return `
      export default ${renderFunction}
    `
}

async function main() {
    let files = []
    try {
        files = await svgFiles()
        files.forEach( filePath => {
            let { name } = path.parse( filePath ) ,
                cnt = fse.readFileSync( filePath , `utf-8` )

            svgToVue( cnt , filePath ).then( component => {
                fse.outputFile( `${outputDir}/${name}.js` , component , err => {
                    if ( err ) {
                        throw err
                    }
                } )
            } )
        } )
    } catch ( error ) {
        throw error
    }
}

main()
