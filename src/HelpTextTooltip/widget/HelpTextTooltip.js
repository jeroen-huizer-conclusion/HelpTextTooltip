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
        noHelpFound: 'No help text found.',
        displayIcon: true,

        // Local
        _contextObj: {},
        _helpText : '',

        postCreate: function () {
            domquery("label" , this.domNode.previousSibling).forEach(function attachMouseOver(node){
                var supNode = domConstruct.create("sup",{style:"padding-left:1px;"}, node);
                if(this.displayIcon){
                    domConstruct.create("div", {class: "glyphicon glyphicon-question-sign"}, supNode);
                }
                on(node, "mouseover", lang.hitch(this, this._getHelpText, node));
            }, this);
        },

        update: function (obj, callback) {
            if(obj){
                this._contextObj = obj;
            }
            callback && callback();
        },

        _getHelpText: function(node){

            if(this._contextObj && !this._helpText.length){
                var xpath = "//"+this.helpEntity+"["+this.keyAttribute+" = '"+this._contextObj.getEntity()+"."+this.contexAttribute+"']";
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
            } else if (!this._helpText.length){
                this._helpText = this.noHelpFound;
            } 
            node.setAttribute("title", this._helpText);
        }
    });
});

require(["HelpTextTooltip/widget/HelpTextTooltip"]);
