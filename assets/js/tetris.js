var Game = require('./game.js');
var Block = require('./block.js');
var game_states = require('./states.js');

function TetrisGame() {
  // game-specific dimensions

  this.TOP_MARGIN = 1;
  this.BOTTOM_MARGIN = 2;
  this.LEFT_MARGIN = 2;
  this.RIGHT_MARGIN = 2;

  this.TITLE_WIDTH = 6;
  this.TITLE_HEIGHT = 1;

  this.PLAYAREA_COLUMNS = 10;
  this.PLAYAREA_ROWS = 22;
  this.PLAYAREA_VISIBLE_ROWS = 20;
  this.PLAYAREA_TOP_MARGIN = 1;
  this.PLAYAREA_RIGHT_MARGIN = 1;

  this.PREVIEW_TITLE_HEIGHT = 2;
  this.PREVIEW_TITLE_WIDTH = 5;
  this.PREVIEW_COLUMNS = 4;
  this.PREVIEW_ROWS = 4;

  this.BACKGROUND_COLOUR = 0x999999;
  this.PLAYAREA_COLOUR = 0x777777;
  this.PLAYAREA_BORDER_COLOUR = 0x555555;

  this.width = (this.LEFT_MARGIN + this.PLAYAREA_COLUMNS +
                this.PLAYAREA_RIGHT_MARGIN + this.PREVIEW_TITLE_WIDTH +
                this.RIGHT_MARGIN) * Block.BLOCK_WIDTH;
  this.height = (this.TOP_MARGIN + this.TITLE_HEIGHT +
                 this.PLAYAREA_TOP_MARGIN + this.PLAYAREA_ROWS +
                 this.BOTTOM_MARGIN) * Block.BLOCK_HEIGHT;

  this.cheats = {
  };

  this.tetrominos = []
  this.score = 0;

  Game.call(this, game_states);

  this.reset = function TetrisGame_reset() {
    for (var i in this.tetrominos) {
      tetrominos[i].visible = false;
      this.stage.removeChild(tetrominos[i]);
    }
    this.tetrominos = [];
    this.score = 0;
    Game.prototype.reset.apply(this);
  };
}
TetrisGame.prototype = Object.create(Game.prototype);

module.exports = TetrisGame;
