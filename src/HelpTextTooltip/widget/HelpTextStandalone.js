/* global define, require*/ 
"use strict";

define([
    "dojo/_base/declare",
    "HelpTextTooltip/widget/HelpTextTooltip",

    "dojo/_base/lang",
    "dojo/dom-construct"
    ], 
    function (declare, _ToolTip, lang, domConstruct) {

    return declare("HelpTextTooltip.widget.HelpTextStandalone", [_ToolTip], {

        // Widget
        helpEntity: null,
        keyConstraint: '',
        helpAttribute: null,
        displayIcon: true,
        displayText: 'Help',

        // Local
        _contextObj: {},
        _helpText : '',

        update: function (obj, callback) {
            if(obj){
                this._contextObj = obj;
                this._getHelpTextInBackground(this.domNode);
            }
            callback && callback();
        },

        _updateRendering: function(node){
            if(!this._helpText || !this._helpText.length)
                    return;

            if(this.displayText && this.displayText.length){
                var textNode = domConstruct.create("label",{innerHTML: this.displayText}, node);

                this._addTooltipToNode(this._helpText, textNode);

                if(this.displayIcon){
                    var supNode = domConstruct.create("sup",{style:"padding-left:3px;"}, textNode);
                    domConstruct.create("div", {class: "glyphicon glyphicon-question-sign"}, supNode);
                }
            }                                    
        }
        
    });
});

require(["HelpTextTooltip/widget/HelpTextStandalone"]);
