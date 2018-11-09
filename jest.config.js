


module.exports = {
    verbose: true ,
    moduleFileExtensions: [ "js" , "json" , "vue" ] ,
    transform: {
        "^.+\\.js$": "babel-jest" ,
        ".*\\.(vue)$": "vue-jest" ,
    } ,
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1" ,
    } ,
    transformIgnorePatterns: [ '<rootDir>/node_modules/' ] ,
}