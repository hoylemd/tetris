function Game(all_states) {
  // Set up graphics
  this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
  this.renderer.backgroundColor = this.BACKGROUND_COLOUR || 0x999999;
  this.stage = new PIXI.Container();

  // Add the canvas to the DOM
  this.canvas = $('.game_canvas');
  this.canvas.append(this.renderer.view);

  // get the states
  this.game_states = all_states;
  this.state_name = this.game_states.__initial__;
  this.transition_arguments = null;
}
Game.prototype = {
  // timing
  start_time: 0,
  last_timestamp: 0,
  running_time: 0,

  // event objects
  game_objects: [],

  // Main driver method
  update: function Game_update(timedelta) {

    // call state update
    if (this.state) {
      this.state.update(timedelta);
    }

    // update objects

    for (var i = 0; i < this.game_objects.length; i += 1) {
      var object = this.game_objects[i];
      var events = object.update(timedelta);

      for (var event in events) {
        if (!this.state.handle_event(event, object, events[event])) {
          console.warn("Unhandled Event '" + event + "'.");
        }
      }
    }

    // render graphics
    this.renderer.render(this.stage);

    // transition state
    if (this.transitioning) {
      var next_state = this.game_states[this.state_name];
      this.state = new next_state(this, this.transition_arguments);
      this.transition_arguments = null;
      this.transitioning = false;
    }

    this.running_time += timedelta;
  },

  state: null,
  state_name: '',
  transitioning: true,
  transition: function Game_transition(next_state, args) {
    this.state_name = next_state;
    this.transition_arguments = args;
    this.transitioning = true;
  },

  log_element: null,
  log: function Game_log(message) {
    if (!this.log_element) {
      this.log_element = $('.game_log');
    }

    var entry = $('<div class="log_entry">' + message + '</div>');
    this.log_element.append(entry);
  },

  reset: function Game_reset() {
    this.log_element.empty();

    this.game_objects = [];
  },

  add_object: function Game_add_object(obj) {
    this.stage.addChild(obj);
    this.game_objects.push(obj);
  },

  remove_object: function Game_remove_object(obj) {
    var index = this.game_objects.indexOf(obj);
    if (index > -1) {
      this.game_objects.splice(index);
    }
    this.stage.removeChild(obj);
  }

};

module.exports = Game;
