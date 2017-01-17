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

  this.event_handlers = {};

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
    var events = null;
    var new_events = [];
    for (var i in this.children) {
      if (this.children[i].update) {
        events = this.children[i].update(timedelta);
      }

      for (var event in events) {
        // handle locally if possible, otherwise, add object to parameters and add to own events
        if (this.event_handlers[event]) {
          this.event_handlers[event](events[event]);
        } else {
          if (this.events[event]) {
            this.events[event].push(events[event]);
          } else {
            this.events[event] = [events[event]];
          }
        }
      }
    }

    var events_to_bubble = this.events;
    this.events = {};
    return events_to_bubble;
  };

  // Input handlers
  this.interactive = false;
}
GridElement.prototype = Object.create(PIXI.Container.prototype);

GridElement.WIDTH = WIDTH;
GridElement.HEIGHT = HEIGHT;

module.exports = GridElement;
