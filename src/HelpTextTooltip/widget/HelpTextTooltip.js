/* global define, require, mx*/ 
"use strict";

define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "dojo/_base/lang",
    "dojo/dom-construct"
    ], 
    function (declare, _WidgetBase, lang, domConstruct) {

    return declare("HelpTextTooltip.widget.HelpTextTooltip", [_WidgetBase], {

        // Widget
        contexAttribute: null,
        helpEntity: null,
        keyAttribute: null,
        helpAttribute: null,
        displayIcon: true,

        // Local
        _contextObj: {},
        _helpText : '',

        update: function (obj, callback) {
            if(obj){
                this._contextObj = obj;
            }
            callback && callback();
        },

        _getHelpTextInBackground: function(node){
            // There might be a better way to 'act rendered', but I don't know it
            var that = this; 
            setTimeout(function(){that._getHelpText(node);}, 1);
        },

        _getHelpText: function(node){

            if(this._contextObj && !this._helpText.length){
                var xpath = "//"+this.helpEntity+this.keyConstraint;
                if(this.keyConstraint.indexOf('CurrentObject') > 0 && this._contextObj){
                    xpath.replace(/\[\%CurrentObject\%\]/gi, this._contextObj.getGuid());
                }
                var filter = {attributes: [this.helpAttribute], amount: 1};
                mx.data.get({xpath: xpath, callback: lang.hitch(this, this._setHelpText, node), filter: filter});
            }
            else{
                this._setHelpText(node);
            }
        },

        _setHelpText: function(node, objs){
            if(objs && objs.length){
                this._helpText = objs[0].get(this.helpAttribute);
            } 

            this._updateRendering(node);
        },

        _updateRendering: function(node){
            if(!this._helpText || !this._helpText.length)
                    return;
                                    
            node.setAttribute("title", this._helpText);
            if(this.displayIcon){
                var supNode = domConstruct.create("sup",{style:"padding-left:3px;"}, node);
                domConstruct.create("div", {class: "glyphicon glyphicon-question-sign"}, supNode);
            }
        }
    });
});

require(["HelpTextTooltip/widget/HelpTextTooltip"]);
