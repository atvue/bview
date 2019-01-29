const path = require( `path` )

const fse = require( `fs-extra` )

// sfc解析工具
const VSFCParser = require( `@vue/component-compiler-utils` ).parse

// template编译工具
const vueTemplateCompiler = require( `vue-template-compiler` )

const babelParse = require( `@babel/parser` ).parse

const { parseJs , parseTpl } = require( `./parser` ) ,
    render = require( `./render` )

// const path = require('path');
// debugger;

// 分析出单文件组件的AST
const getAst = async file => {
    let source = await fse.readFile( file , `utf-8` )
    const sfc = VSFCParser( {
        source: source ,
        compiler: vueTemplateCompiler ,
        needMap: false
    } )

    let astRes = {}

    if ( sfc.script && sfc.script.content !== `` ) {
        // 使用babel parser解析js文件
        // @TODO plugin传入支持
        astRes.astJs = babelParse( sfc.script.content , {
            sourceType: `module`
        } )
    }
    if ( sfc.template && sfc.template.content !== `` ) {
        // 使用vue-template-compiler解析模板
        astRes.astTpl = vueTemplateCompiler.compile( sfc.template.content , {
            comments: true ,
            preserveWhitespace: false //去掉标签直接的空格换行便于查找slot之前的注释
        } ).ast
    }

    return astRes
}

module.exports = async file => {
    let { astJs , astTpl } = await getAst( file ) ,
        name = path.basename( file , `.vue` )
    // @NOTE 之后改成Promise.all 不需要保证顺序 拿到数据即可
    let { propsRes , emitEvents , apiMethods } = await parseJs( astJs ) ,
        slotsRes = await parseTpl( astTpl )
    // console.log(propsRes);
    return {
        render: render( { propsRes , emitEvents , slotsRes , apiMethods } ) ,
        name: name
    }
}

/*
async function test(){
    let ast = await babelParse( `
    let a = 1 ;
    // -@doc 不触发
    a.$emit( 'click' , 123 )
    ` , {
        sourceType: 'module'
    } )
    let { propsRes, emitEvents, apiMethods } = await parseJs(ast)
    console.log( emitEvents )
}

test() */

/*


const output = async (result, outputfile) => {
    let tpl = `## props\n\n${result.propsRes}\n\n## methods\n\n${
        result.apiMethods
    }\n\n## emits\n\n${result.emitEvents}\n\n## slots\n\n${result.slotsRes}\n
    `;
    // debugger;
    try {
        await fse.outputFile(outputfile, tpl);
    } catch (error) {}
};

const parseEntry = async config => {
    let { file } = config,
        { astJs, astTpl } = await getAst(file);
    // debugger;
    // @NOTE 之后改成Promise.all 不需要保证顺序 拿到数据即可
    let { propsRes, emitEvents, apiMethods } = await parseJs(astJs),
        slotsRes = await parseTpl(astTpl);

    return { propsRes, emitEvents, slotsRes, apiMethods };
};

const testfile = './test.vue',
   testoutput = './test.md';
parseEntry({ file: testfile, output: testoutput })
    .then(render)
    .then(result => {
        output(result, testoutput);
    });

*/
