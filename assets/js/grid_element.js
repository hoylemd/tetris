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
  this.type_string = 'GridElement';

  function GridElement_updatePosition(column, row) {
    this.column = column;
    this.x = WIDTH * column;
    this.row = row;
    this.y = HEIGHT * row;
  }
  GridElement_updatePosition.call(this, column, row);

  this.stringify = function GridElement_stringify() {
    return this.type_string + ' at ' + this.positionString();
  };

  this.positionString = function GridElement_positionString() {
    return '(' + this.column + ', ' + this.row + ')';
  };

  this.updatePosition = GridElement_updatePosition;
  // engine methods
  this.update = function GridElement_update(timedelta) {

    // update children
    for (var i in this.children) {
      if (this.children[i].update) {
        this.children[i].update(timedelta);
      }
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
