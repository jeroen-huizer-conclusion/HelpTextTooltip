/* global define, require, mx*/ 
"use strict";

define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "dojo/_base/lang",
    "dojo/dom-construct",

    "dijit/Tooltip"
    ], 
    function (declare, _WidgetBase, lang, domConstruct, Tooltip) {

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

        postCreate: function(){
            if(this.domNode)
                this.domNode.style.display = "none"; // Don't want to use space
        },

        update: function (obj, callback) {
            if(obj){
                this._contextObj = obj;
            }
            if(callback){ callback(); }
        },

        _getHelpTextInBackground: function(node){
            // There might be a better way to 'act rendered', but I don't know it
            var that = this; 
            setTimeout(function(){that._getHelpText(node);}, 1);
        },

        _getHelpText: function(node){

            if(!this._helpText.length){
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

            this._addTooltipToNode(this._helpText, node);

            // node.setAttribute("title", this._helpText);
            if(this.displayIcon){
                var supNode = domConstruct.create("sup",{style:"padding-left:3px;"}, node);
                domConstruct.create("div", {class: "glyphicon glyphicon-question-sign"}, supNode);
            }
        },

        _addTooltipToNode: function(tooltipText, node){
            // Overwrites all tooltips..
            Tooltip.defaultPosition = ['below-alt','below', 'after', 'before', 'above-alt', 'above'];

            new Tooltip({
                label: this._helpText,
                showDelay: 250,
                connectId: [node]
            });

        }
    });
});

require(["HelpTextTooltip/widget/HelpTextTooltip"]);
