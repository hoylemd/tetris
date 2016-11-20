/* Class for game GridElements */

// Alias
var TextureCache = PIXI.utils.TextureCache;

var WIDTH = 32;
var HEIGHT = 32;

function GridElement(column, row) {
  if (!column && column !== 0) {
    console.error('GridElement instantiated with invalid column: ' + column);
    column = 0;
  }

  if (!row && row !== 0) {
    console.error('GridElement instantiated with invalid row: ' + row);
    row = 0;
  }

  // graphics objects
  PIXI.Container.call(this);

  this.events = {};

  // positioning
  this.column = column;
  this.x = WIDTH * column;
  this.row = row;
  this.y = WIDTH * row;

  this.type_string = 'GridElement';

  this.stringify = function GridElement_stringify() {
    return this.type_string + ' at ' + this.positionString();
  };

  this.positionString = function GridElement_positionString() {
    return '(' + this.column + ', ' + this.row + ')';
  };

  this.updatePosition = function GridElement_updatePosition(column, row) {
    this.x = column * WIDTH;
    this.y = row * HEIGHT;
  };

  // engine methods
  this.update = function GridElement_update(timedelta) {
    // snap to the grid
    var x_drift = this.x % WIDTH;
    var y_drift = this.y % HEIGHT;
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
GridElement.prototype = Object.create(PIXI.Container.prototype);

GridElement.WIDTH = WIDTH;
GridElement.HEIGHT = HEIGHT;

module.exports = GridElement;
