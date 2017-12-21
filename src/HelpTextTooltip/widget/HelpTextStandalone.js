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
        _textnode: {},

        postCreate: function(){
            // Prevent parent.
        },


        update: function (obj, callback) {
            if(obj){
                this._contextObj = obj;
            }
            this._getHelpTextInBackground(this.domNode);
            callback && callback();
        },

        _updateRendering: function(node){
            // Cleanup existing nodes
            if(this._textNode && this._textNode.nodeType)
                domConstruct.destroy(this._textNode);

            if(!this._helpText || !this._helpText.length)
                return;

            if(this.displayText && this.displayText.length){
                this._textNode = domConstruct.create("label",{innerHTML: this.displayText}, node);

                this._addTooltipToNode(this._helpText, this._textNode);

                if (this.displayIcon.length && this.displayIcon !== "none") {
                    var glyphClass = 'glyphicon-'+this.displayIcon.replace('_','-');
                    var supNode = domConstruct.create("sup",{style:"padding-left:3px;"}, this._textNode);

                    domConstruct.create("div", {class: "glyphicon "+glyphClass}, this._textNode);
                }
                            
            } else if(this.displayAsLabel){
                this._textNode = domConstruct.create("label",{innerHTML: this._helpText}, node);
            }
        }

    });
});

require(["HelpTextTooltip/widget/HelpTextStandalone"]);
