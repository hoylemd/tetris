var Game = require('./game.js');
var Block = require('./block.js');
var game_states = require('./states.js');

function TetrisGame() {
  // game-specific dimensions

  this.MARGIN = 1;

  this.TITLE_WIDTH = 6;
  this.TITLE_HEIGHT = 1;

  this.PLAYAREA_COLUMNS = 10;
  this.PLAYAREA_ROWS = 20

  this.PREVIEW_TITLE_HEIGHT = 1;
  this.PREVIEW_WIDTH = 4;
  this.PREVIEW_HEIGHT = 4;

  this.SCORE_WIDTH = 7;
  this.SCORE_HEIGHT = 1;
  this.SCORE_TITLE_HEIGHT = 1;

  this.BACKGROUND_COLOUR = 0x999999;
  this.PLAYAREA_COLOUR = 0x777777;
  this.PLAYAREA_BORDER_COLOUR = 0x555555;

  this.WIDTH = (this.MARGIN + this.PLAYAREA_COLUMNS +
                this.MARGIN + this.PREVIEW_WIDTH +
                this.MARGIN + this.SCORE_WIDTH + this.MARGIN) // 25
  this.width = this.WIDTH * Block.BLOCK_WIDTH;
  this.HEIGHT = (this.MARGIN + this.TITLE_HEIGHT +
                 this.MARGIN + this.PLAYAREA_ROWS + this.MARGIN);
  this.height = this.HEIGHT * Block.BLOCK_HEIGHT;
  this.TITLE_LEFT = Math.floor((this.WIDTH - this.TITLE_WIDTH) / 2)

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
