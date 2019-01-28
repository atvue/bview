exports.babelParseOptions = {
    plugins: [
        `transform-object-rest-spread` ,
        [ `@babel/plugin-transform-modules-commonjs` , { strictMode: true } ]
    ]
} ;
