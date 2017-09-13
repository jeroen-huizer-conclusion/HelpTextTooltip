/* global define, require, mx*/ 
"use strict";

define([
    "dojo/_base/declare",
    "HelpTextTooltip/widget/HelpTextTooltip",

    "dojo/query",
    "dojo/NodeList-traverse"
    ], 
    function (declare, _ToolTip, domquery) {

    return declare("HelpTextTooltip.widget.HelpTextForButton", [_ToolTip], {

        // Widget
        helpEntity: null,
        keyConstraint: '',
        helpAttribute: null,
        displayIcon: true,

        // Local
        _contextObj: {},
        _helpText : '',

        update: function (obj, callback) {
            if(obj){
                this._contextObj = obj;
            }
            if(this.domNode.previousSibling)
                this._getHelpTextInBackground(this.domNode.previousSibling)
            callback && callback();
        },

    });
});

require(["HelpTextTooltip/widget/HelpTextForLabel"]);
