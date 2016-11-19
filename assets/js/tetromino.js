/* Class for tetrominos */

var Block = require('./block.js');

function Tetromino(column, row, type) {

}
Tetromino.prototype = Block(0, 0);

module.exports = Tetromino;
