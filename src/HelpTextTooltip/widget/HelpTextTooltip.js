define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "dojo/_base/lang",
    "dojo/dom-construct",
    "dojo/on",
    "dojo/query"
    ], 
    function (declare, _WidgetBase, lang, domConstruct, on, domquery) {
    "use strict";

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

        postCreate: function () {
        },

        update: function (obj, callback) {
            if(obj){
                this._contextObj = obj;

                // There might be a better way to 'act rendered', but I don't know it
                var that = this; 
                domquery("label" , this.domNode.previousSibling).forEach(function(node){
                    setTimeout(function(){
                        that._getHelpText(node);})
                }, 1); 
            }
            callback && callback();
        },

        _getHelpText: function(node){
            this._setHelpText(node);
        },

        _setHelpText: function(node, objs){
            if(objs && objs.length){
                this._helpText = objs[0].get(this.helpAttribute);
                if(!this._helpText || !this._helpText.length)
                    return;
                                    
                node.setAttribute("title", this._helpText);
                if(this.displayIcon){
                    var supNode = domConstruct.create("sup",{style:"padding-left:3px;"}, node);
                    domConstruct.create("div", {class: "glyphicon glyphicon-question-sign"}, supNode);
                }
            } 
        }
    });
});

require(["HelpTextTooltip/widget/HelpTextTooltip"]);
