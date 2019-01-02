/*eslint no-console: ["error", { allow: ["warn", "error"] }] */

export default ( component ) => ( ...args ) => console.warn( `${component}` , ...args )