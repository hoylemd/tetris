/* Class for individual tetromino blocks */

var GridElement = require('./grid_element.js');

function Block(column, row, colour, border_colour) {
  GridElement.call(this, column, row);

  this.colour = colour;
  this.border_colour = colour;

  var primitives = new PIXI.Graphics();
  primitives.beginFill(colour);
  primitives.lineStyle(2, border_colour, 1);

  primitives.drawRect(0, 0, GridElement.WIDTH, GridElement.HEIGHT);
}
Block.prototype = GridElement(0, 0);

module.exports = Block;
