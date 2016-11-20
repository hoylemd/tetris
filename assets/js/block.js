/* Class for game Blocks */

// Alias
var TextureCache = PIXI.utils.TextureCache;

var BLOCK_WIDTH = 32;
var BLOCK_HEIGHT = 32;

function Block(column, row) {
  if (!column && column !== 0) {
    console.error('Block instantiated with invalid column: ' + column);
    column = 0;
  }

  if (!row && row !== 0) {
    console.error('Block instantiated with invalid row: ' + row);
    row = 0;
  }

  // graphics objects
  PIXI.Container.call(this);

  this.events = {};

  // positioning
  this.column = column;
  this.x = BLOCK_WIDTH * column;
  this.row = row;
  this.y = BLOCK_WIDTH * row;

  this.type_string = 'Block';

  this.stringify = function Block_stringify() {
    return this.type_string + ' at ' + this.positionString();
  };

  this.positionString = function Block_positionString() {
    return '(' + this.column + ', ' + this.row + ')';
  };

  this.updatePosition = function Block_updatePosition(column, row) {
    this.x = column * BLOCK_WIDTH;
    this.y = row * BLOCK_HEIGHT;
  };

  // engine methods
  this.update = function Block_update(timedelta) {
    // snap to the grid
    var x_drift = this.x % BLOCK_WIDTH;
    var y_drift = this.y % BLOCK_HEIGHT;
    if (x_drift || y_drift) {
      this.updatePosition(this.column, this.row);
      console.warning('a block (' + this.stringify() +
                      ') is not snapped to the grid! Adjusting.');
    }

    var new_events = this.events;
    this.events = {};
    return new_events;
  };

  // Input handlers
  this.interactive = false;
}
Block.prototype = Object.create(PIXI.Container.prototype);

Block.BLOCK_WIDTH = BLOCK_WIDTH;
Block.BLOCK_HEIGHT = BLOCK_HEIGHT;

module.exports = Block;
