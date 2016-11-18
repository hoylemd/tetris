/* Class for retro-style text sprites */

var Block = require('./block.js');

// Alias
var TextureCache = PIXI.utils.TextureCache;

function TextBlock(column, row, text) {
  Block.call(this, column, row);

  this.last_text = '';
  this.text = text;

  this.update = function TextBlock_update(timedelta) {
    this.type_string = 'TextBlock'

    TextBlock.prototype.update.call(this, timedelta);

    if (this.text != this.last_text) {
      this.text = this.text.toUpperCase();

      // remove old sprites
      for (var i = this.children.length - 1; i >= 0; i -= 1) {
        this.removeChild(this.children[i]);
      }

      for (var c in this.text) {
        var texture = TextureCache[this.text[c]];
        var sprite = new PIXI.Sprite(texture);
        sprite.x = this.children.length * Block.BLOCK_WIDTH;
        this.addChild(sprite);
      }

      this.last_text = this.text;
    }
  }
}
TextBlock.prototype = new Block(0, 0)

module.exports = TextBlock;
