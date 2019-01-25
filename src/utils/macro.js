/* eslint-disable no-undef */
if ( process.env.NODE_ENV === `test` ) {
    exports.bviewPrefix = `bview`;
} else if ( process.env.NODE_ENV !== `production` ) {
    exports.bviewPrefix = process.env.BVIEWPREFIX;
} else {
    exports.bviewPrefix = PRODUCTIONBVIEWPREFIX;
}
