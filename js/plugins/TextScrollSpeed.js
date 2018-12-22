//=============================================================================
// No Limit Text Scroll Speed
// Version 1.01 (2015.10.30)
//=============================================================================

/*:
* @plugindesc Removes limits on scrolling text speed by overriding editor value
* @author NoInkling
*
* @help
*
* Plugin Command:
*   TextScrollSpeed x  # Where x is any number above 0
*
* Notes:
*  * Decimal values can be used, e.g: TextScrollSpeed 0.5
*    (numbers below 1 can be very slow!)
*  * It makes no sense for the scroll speed to be 0 or lower, in these cases
*    the editor value will be used instead.
*  * Very high values may cause unexpected behavior, use caution.
*
* The plugin command will only have effect on the next executed
* "Show Scrolling Text" command.
* If your event has more than one set of scrolling text where you wish to avoid
* the limits, you will need to use the plugin command before each one.
*
* A specific plugin command is only valid for the current event page; if a
* "Show Scrolling Text" command is not subsequently encountered on the page,
* that particular plugin command won't do anything.
*/

(function() {

  var textScrollSpeed;

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'TextScrollSpeed') {
      textScrollSpeed = Number(args[0]);
      if (textScrollSpeed <= 0) textScrollSpeed = null;
    }
  };

  var _Game_Interpreter_command105 = Game_Interpreter.prototype.command105;
  Game_Interpreter.prototype.command105 = function() {
    if (textScrollSpeed) {
      if (!$gameMessage.isBusy()) {
        $gameMessage.setScroll(textScrollSpeed, this._params[1]);
        textScrollSpeed = null;
        while (this.nextEventCode() === 405) {
          this._index++;
          $gameMessage.add(this.currentCommand().parameters[0]);
        }
        this._index++;
        this.setWaitMode('message');
      }
      return false;
    }
    _Game_Interpreter_command105.call(this);
  };

  var _Game_Interpreter_terminate = Game_Interpreter.prototype.terminate;
  Game_Interpreter.prototype.terminate = function() {
    _Game_Interpreter_terminate.call(this);
    textScrollSpeed = null;
  };

})();
