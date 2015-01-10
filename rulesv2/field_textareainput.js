/**
* textareainput cf. https://github.com/drk123/buildafaq
* @license
* Visual Blocks Editor
*
* Copyright 2012 Google Inc.
* https://blockly.googlecode.com/
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/**
* @fileoverview TextArea input field.
* @author fraser@google.com (Neil Fraser)
* @author dave@optiga.com (Dave Klein) converted field_textinput.js to field_textareainput.js
*/
'use strict';
/*
goog.provide('Blockly.FieldTextAreaInput');

goog.require('Blockly.Field');
goog.require('Blockly.Msg');
goog.require('goog.asserts');
goog.require('goog.userAgent');
*/

/**
* Class for an editable text field.
* @param {string} text The initial content of the field.
* to validate any constraints on what the user entered. Takes the new
* text as an argument and returns either the accepted text, a replacement
* text, or null to abort the change.
* @extends {Blockly.Field}
* @constructor
*/
function isF ( f ) {
/* http://dbj.org/dbj/2012/10/08/isfunction-that-works-in-ie-too/ */
  try {  return /^\s*\bfunction\b/.test(f) ;
  } catch (x) {   return false ;
  }
}

Blockly.FieldTextAreaInput = function(text, opt_onEdit, type) {
  Blockly.FieldTextAreaInput.superClass_.constructor.call(this, text);
  //Blockly.FieldTextAreaInput.constructor.call(this, text);
  //Blockly.Field.call(this, text);
  
  if (!type) type = "object";
  this.type_ = type;

  this.onEdit = null;
  this.select_duplicate_ = 'objects_list'; //null;  
  if (opt_onEdit) {
    //if (typeof opt_onEdit === 'function')
    if (isF(opt_onEdit))
      this.onEdit = opt_onEdit;
    else this.select_duplicate_ = opt_onEdit;
  }  
  
  this.idObject_ = null;
  this.typeObject_ = null;
  
  this.script_ = null;
  
};
goog.inherits(Blockly.FieldTextAreaInput, Blockly.Field);

/**
* Clone this FieldTextAreaInput.
* @return {!Blockly.FieldTextAreaInput} The result of calling the constructor again
* with the current values of the arguments used during construction.
*/
Blockly.FieldTextAreaInput.prototype.clone = function() {
  return new Blockly.FieldTextAreaInput(this.getText(), this.onEdit);
};

/**
* Mouse cursor style when over the hotspot that initiates the editor.
*/
Blockly.FieldTextAreaInput.prototype.CURSOR = 'text';

/**
* Dispose of all DOM objects belonging to this editable field.
*/
Blockly.FieldTextAreaInput.prototype.dispose = function() {
  Blockly.WidgetDiv.hideIfField(this);
  Blockly.FieldTextAreaInput.superClass_.dispose.call(this);
};

/**
* Set the text in this field.
* @param {?string} text New text.
* @override
*/
Blockly.FieldTextAreaInput.prototype.setText = function(text, text_id, typeObject) {
  if (text === null) {
    // No change if null.
    return;
  }
  //this.setText(text);
  this.idObject_ = text_id;
  this.typeObject_ = typeObject;
  
  Blockly.Field.prototype.setText.call(this, text);
};


Blockly.FieldTextAreaInput.prototype.getText = function() {
  // Renvoi l'id et non le "name ou descripition d'un object" idem pour le script ...
  return ((this.idObject_)?this.idObject_:this.script_);
};

/**
* Show the inline free-text editor on top of the text.
* @private
*/
Blockly.FieldTextAreaInput.prototype.showEditor_ = function() {
  
  if ( this.onEdit ) {
    this.onEdit(this,this.externalInputCallback_.bind(this));
    return;
  }
  
  Blockly.WidgetDiv.show(this, this.dispose_());
  var div = Blockly.WidgetDiv.DIV;
  // Create the input.
  var htmlInput = goog.dom.createDom('select', 'blocklyHtmlInput');
  htmlInput.innerHTML = document.getElementById(this.select_duplicate_).innerHTML;
  
  Blockly.FieldTextAreaInput.htmlInput_ = htmlInput;
  div.appendChild(htmlInput);

  htmlInput.value = htmlInput.defaultValue = this.text_;
  htmlInput.oldValue_ = this.text_; //null;
  this.validate_();
  this.resizeEditor_();
  htmlInput.focus();
  
  var event = document.createEvent('MouseEvents');
  event.initMouseEvent('mousedown', true, true, window);
  htmlInput.dispatchEvent(event);
  
  htmlInput.onChangeWrapper_ =
      Blockly.bindEvent_(htmlInput, 'change', this, this.onHtmlInputChange_);
  /*
  // Bind to keyup -- trap Enter and Esc; resize after every keystroke.
  htmlInput.onKeyUpWrapper_ =
      Blockly.bindEvent_(htmlInput, 'keyup', this, this.onHtmlInputChange_);
  // Bind to keyPress -- repeatedly resize when holding down a key.
  htmlInput.onKeyPressWrapper_ =
      Blockly.bindEvent_(htmlInput, 'keypress', this, this.onHtmlInputChange_);
  */
  var workspaceSvg = this.sourceBlock_.workspace.getCanvas();
  htmlInput.onWorkspaceChangeWrapper_ =
      Blockly.bindEvent_(workspaceSvg, 'blocklyWorkspaceChange', this,
      this.resizeEditor_);
  
};

Blockly.FieldTextAreaInput.prototype.externalInputCallback_ = function(text, id , type)
{
  this.setText(text, id , type);
};

/**
* Handle a change to the editor.
* @param {!Event} e Keyboard event.
* @private
*/
Blockly.FieldTextAreaInput.prototype.onHtmlInputChange_ = function(e) {
  var htmlInput = Blockly.FieldTextAreaInput.htmlInput_;
 /* if (e.keyCode == 13) {
// Enter
// Blockly.WidgetDiv.hide();
} else */if (e.keyCode == 27) {
    // Esc
   // this.setText(htmlInput.defaultValue);
    Blockly.WidgetDiv.hide();
  } else {
    // Update source block.
    var text = htmlInput.value;
    
    text = htmlInput.options[htmlInput.selectedIndex].text;
    var idObject = htmlInput.options[htmlInput.selectedIndex].value;
    var typeObject = htmlInput.options[htmlInput.selectedIndex].getAttribute('data-type');
    htmlInput.oldValue_ = text;
    this.setText(text, idObject, typeObject);
    this.validate_();
  }
};

/**
* Check to see if the contents of the editor validates.
* Style the editor accordingly.
* @private
*/
Blockly.FieldTextAreaInput.prototype.validate_ = function() {
  var valid = true;
  goog.asserts.assertObject(Blockly.FieldTextAreaInput.htmlInput_);
  var htmlInput = /** @type {!Element} */ (Blockly.FieldTextAreaInput.htmlInput_);
  
  if (valid === null) {
    Blockly.addClass_(htmlInput, 'blocklyInvalidInput');
  } else {
    Blockly.removeClass_(htmlInput, 'blocklyInvalidInput');
  }
};

/**
* Resize the editor and the underlying block to fit the text.
* @private
*/
Blockly.FieldTextAreaInput.prototype.resizeEditor_ = function() {
  var div = Blockly.WidgetDiv.DIV;
  var bBox = this.fieldGroup_.getBBox();
  div.style.width = 20 + bBox.width + 'px';
  var xy = Blockly.getAbsoluteXY_(/** @type {!Element} */ (this.borderRect_));
  // In RTL mode block fields and LTR input fields the left edge moves,
  // whereas the right edge is fixed.  Reposition the editor.
  if (Blockly.RTL) {
    var borderBBox = this.borderRect_.getBBox();
    xy.x += borderBBox.width;
    xy.x -= div.offsetWidth;
  }
  // Shift by a few pixels to line up exactly.
  xy.y += 1;
  if (goog.userAgent.WEBKIT) {
    xy.y -= 3;
  }
  div.style.left = xy.x + 'px';
  div.style.top = xy.y + 'px';
};

/**
* Close the editor, save the results, and dispose of the editable
* text field's elements.
* @return {!Function} Closure to call on destruction of the WidgetDiv.
* @private
*/
Blockly.FieldTextAreaInput.prototype.dispose_ = function() {
  //return function() {};
  var thisField = this;
  return function() {
    var htmlInput = Blockly.FieldTextAreaInput.htmlInput_;
    var text, idObject, typeObject;
    // Save the edit (if it validates).
    //text = htmlInput.value;
    
    if (htmlInput.options[htmlInput.selectedIndex]){ 
      text = htmlInput.options[htmlInput.selectedIndex].text;
      idObject = htmlInput.options[htmlInput.selectedIndex].value;
      typeObject = htmlInput.options[htmlInput.selectedIndex].getAttribute('data-type');
    } else text = thisField.oldValue_;
    
    thisField.setText(text, idObject, typeObject);
    thisField.sourceBlock_.render();
    Blockly.unbindEvent_(htmlInput.onChangeWrapper_);
    /*
    Blockly.unbindEvent_(htmlInput.onKeyUpWrapper_);
    Blockly.unbindEvent_(htmlInput.onKeyPressWrapper_);
    */
    Blockly.unbindEvent_(htmlInput.onWorkspaceChangeWrapper_);
    Blockly.FieldTextAreaInput.htmlInput_ = null;
  };
};