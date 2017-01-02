/* Class for tetrominos */

var GridElement = require('./grid_element.js');
var Block = require('./block.js');
var random_int = require('./utils.js').random_int;
var tetromino_types = require('./tetromino_types.js');

var type_list = Object.keys(tetromino_types);

function Tetromino(type) {

  GridElement.call(this, 0, 0);

  this.type_string = 'Tetromino';

  this.type = type || type_list[random_int(type_list.length)];

  var spec = tetromino_types[this.type];

  if (!spec) {
    raise('Cannot instantiate a Tetromino of type "' + this.type + '"');
  }

  this.rotation = 0;
  this.last_rotation = -1;
  this.time_since_fall = 0;
  this.locking = false;

  // create the blocks
  this.blocks = [];
  this.block_matrix = null;

  this.mark_block_matrix = function Tetromino_mark_block_matrix(x, y) {
    var mark = true;
    this.block_matrix[x + 2][y + 2] = mark;
  };

  this.check_block_matrix = function Tetromino_check_block_matrix(x, y) {
    return this.block_matrix[x + 2][y + 2];
  };

  this.redraw_blocks = function Tetromino_redraw_blocks() {
    for (var i in this.blocks) {
      this.removeChild(this.blocks[i]);
    }
    this.blocks = [];
    this.block_matrix = [[false, false, false, false, false],
                         [false, false, false, false, false],
                         [false, false, false, false, false],
                         [false, false, false, false, false],
                         [false, false, false, false, false]];

    this.blocks.push(new Block(0, 0, 1, 1, spec.colour, spec.border));
    var shape = spec.shapes[this.rotation];
    for (var j in shape) {
      var coords = shape[j];
      var x = coords[0];
      var y = coords[1];
      this.mark_block_matrix(x, y);
      this.blocks.push(new Block(x, y, 1, 1, spec.colour, spec.border));
    }
    this.addChild.apply(this, this.blocks);
  };

  this.update = function Tetromino_update(timedelta) {
    Tetromino.prototype.update.call(this, timedelta);

    if (!this.parent || !this.parent.time_to_fall) return;

    this.time_since_fall += timedelta;

    var falling = this.time_since_fall > this.parent.time_to_fall;
    var rotated_or_new = this.rotation !== this.last_rotation;

    if (falling) {
      if (this.locking) {
        falling = false;
        return {'locked': true};
        // game state should check for lose state when handling the locked event
      }

      if (this.check_collision(0, 1)) {
        falling = false;
        this.locking = true;
      } else {
        this.updatePosition(this.column, this.row + 1);
        this.time_since_fall = 0;
      }
    }

    if (rotated_or_new || falling) {
      this.redraw_blocks();
      this.last_rotation = this.rotation;
    }

    // hide blocks that are above the playarea
    if (falling || rotated_or_new) {
      for (var i in this.blocks) {
        var block = this.blocks[i];
        block.visible = block.row + this.row >= 0;
      }
    }
  };

  this.check_collision = function Tetromino_check_collision(column_offset,
                                                            row_offset) {
    console.log('checking collisions for tetromino at ' + this.column + ', ' + this.row);
    for (var i in this.blocks) {
      var block = this.blocks[i];
      var prop_column = block.column + column_offset;
      var prop_row = block.row + row_offset;
      var abs_column = this.column + prop_column;
      var abs_row = this.row + prop_row;

      // check for playarea boundaries
      if (abs_column < 0 || abs_column >= this.parent.columns) {
        return true;
      }
      // don't check for row < 0 because they can be popping out the top.
      if (abs_row >= this.parent.rows) {
        return true;
      }

      // check for other blocks
      var not_already_here = !this.check_block_matrix(prop_column, prop_row);
      var other_block_here = this.parent.block_matrix[abs_column][abs_row];
      if (not_already_here && other_block_here){
        return true;
      }
    }

    console.log('clear!');
    return false;
  };
}
Tetromino.prototype = new GridElement(0, 0);

module.exports = Tetromino;
