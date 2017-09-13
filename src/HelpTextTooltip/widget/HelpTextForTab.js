/* global define, require*/ 
"use strict";

define([
    "dojo/_base/declare",
    "HelpTextTooltip/widget/HelpTextTooltip",

    "dojo/_base/lang",
    "dojo/query!css3"
    ], 
    function (declare, _ToolTip, lang, domquery) {

    return declare("HelpTextTooltip.widget.HelpTextForTab", [_ToolTip], {

        // Widget
        helpEntity: null,
        keyConstraint: '',
        helpAttribute: null,
        displayIcon: true,
        tabIndex: 1,

        // Local
        _contextObj: {},
        _helpText : '',

        update: function (obj, callback) {
            if(obj){
                this._contextObj = obj;
            }
            var selector = lang.replace("ul>li:nth-child({tabIndex})>a", this);
            domquery(selector , this.domNode.parentNode).forEach(this._getHelpTextInBackground, this); 

            callback && callback();
        },

    });
});

require(["HelpTextTooltip/widget/HelpTextForTab"]);
