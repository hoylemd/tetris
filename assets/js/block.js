/* Class for individual tetromino blocks */

var GridElement = require('./grid_element.js');

var DEFAULT_BACKGROUND_COLOUR = 0x777777;
var DEFAULT_BORDER_COLOUR = 0x555555;


function Block(column, row, columns, rows, colour, border_colour) {
  GridElement.call(this, column, row);

  this.colour = colour;
  this.border_colour = colour;

  this.columns = columns || 1;
  this.rows = rows || 1;

  this.type_string = 'Block';

  var background = new PIXI.Graphics();
  background.beginFill(colour || DEFAULT_BACKGROUND_COLOUR);
  background.lineStyle(2, border_colour || DEFAULT_BORDER_COLOUR, 1);

  background.drawRect(0, 0,
                      this.columns * GridElement.WIDTH,
                      this.rows * GridElement.HEIGHT);

  background.endFill();

  this.background = background;
  this.background_set = false;

  this.update = function Block_update(timedelta) {
    if (!this.background_set) {
      this.addChild(this.background);
      this.background_set = true;
    }

    Block.prototype.update.call(this, timedelta);
  };
}
Block.prototype = new GridElement(0, 0);

module.exports = Block;
