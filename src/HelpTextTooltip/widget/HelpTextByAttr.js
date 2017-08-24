/* global define, require, mx*/ 
"use strict";

define([
    "dojo/_base/declare",
    "HelpTextTooltip/widget/HelpTextTooltip",
    "dojo/_base/lang"], 
    function (declare, _tooltip, lang) {

    return declare("HelpTextTooltip.widget.HelpTextByAttr", [_tooltip], {

        // Widget
        contexAttribute: null,
        helpEntity: null,
        keyAttribute: null,
        helpAttribute: null,
        displayIcon: true,

        // Local
        _contextObj: {},
        _helpText : '',

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
    });
});

require(["HelpTextTooltip/widget/HelpTextByAttr"]);
