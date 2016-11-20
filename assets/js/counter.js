/* Class for the score indicator */

var GridElement = require('./grid_element.js');
var Block = require('./block.js');

// Alias

var TextureCache = PIXI.utils.TextureCache;
var magnitude_abbreviations = 'KMBTQ';

function Counter(column, row, columns, value) {
  this.value = value || 0;
  this.last_value = null;
  Block.call(this, column, row, columns);

  this.type_string = 'Counter';

  this.digits = [];

  this.update = function Counter_update(timedelta) {

    Counter.prototype.update.call(this, timedelta);

    if (this.value != this.last_value) {
      // remove old sprites
      for (var i in this.digits) {
        this.removeChild(this.digits[i]);
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
        var offset = -delta_length + this.digits.length;
        sprite.x = offset * GridElement.WIDTH;
        this.addChild(sprite);
        this.digits.push(sprite);
      }

      this.last_value = this.value;
    }
  };
}
Counter.prototype = new Block(0, 0);

module.exports = Counter;
