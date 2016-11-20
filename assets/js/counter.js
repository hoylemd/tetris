/* Class for the score indicator */

var GridElement = require('./grid_element.js');

// Alias

var TextureCache = PIXI.utils.TextureCache;
var magnitude_abbreviations = 'KMBTQ';

function Counter(column, row, columns, value) {
  this.value = value || 0;
  this.last_value = null;
  GridElement.call(this, column, row, '' + value);

  this.columns = columns;
  this.width = columns * GridElement.WIDTH;

  this.type_string = 'Counter';

  this.update = function Counter_update(timedelta) {

    Counter.prototype.update.call(this, timedelta);

    if (this.value != this.last_value) {
      // remove old sprites
      for (var i = this.children.length - 1; i >= 0; i -= 1) {
        this.removeChild(this.children[i]);
      }

      var value_string = '' + this.value;
      var delta_length = value_string.length - this.columns;

      var shifts = 0;
      while (delta_length > 0) {
        value_string = value_string.slice(0, shifts ? -4 : -3);
        value_string += magnitude_abbreviations[shifts];
        shifts += 1;
        delta_length = value_string.length - this.columns;
      }

      for (var c in value_string) {
        var texture = TextureCache[value_string[c]];
        var sprite = new PIXI.Sprite(texture);
        var offset = -delta_length + this.children.length;
        sprite.x = offset * GridElement.WIDTH;
        this.addChild(sprite);
      }

      this.last_value = this.value;
    }
  };
}
Counter.prototype = new GridElement(0, 0);

module.exports = Counter;
