/* Class for individual tetromino blocks */

var GridElement = require('./grid_element.js');

function Block(column, row, colour, border_colour) {
  GridElement.call(this, column, row);
}
Block.prototype = GridElement(0, 0);

module.exports = Block;
