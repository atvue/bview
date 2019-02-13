require( `babel-register` )

const { fileExist , hyphenate } = require( `./util` ) ,
    { createTemp } = require( `./createTemp` ) ,
    { createConfig } = require( `./config` ) ,
    { components: componentPath } = require( `../project-path` ) ,
    chalk = require( `chalk` )

const path = require( `path` )

let name = process.argv[ 2 ] ,
    fullPath ,
    config

if ( name ) {
    // 必须小写
    name = hyphenate( name ).toLowerCase()
} else {
    console.error( `[模版名称必填！具体可运行make help查看]` )
    process.exit( 1 )
}

let nameColor = chalk.keyword( `orange` )( name )

fullPath = path.resolve( componentPath , name )

if ( fileExist( fullPath ) ) {
    console.error( chalk.red( `${nameColor}已存在，请重试` ) )
    process.exit( 1 )
}

//生成模版文件目录
config = createConfig( name )

// console.log('config: ', JSON.stringify(config, null, 1))

createTemp( componentPath , config , name )

let successMsg = `success! you can check src/components/${nameColor}`

console.info( chalk.green( successMsg ) )
