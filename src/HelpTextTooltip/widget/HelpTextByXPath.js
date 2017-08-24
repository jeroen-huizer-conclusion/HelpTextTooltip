define([
    "dojo/_base/declare",
    "HelpTextTooltip/widget/HelpTextTooltip",

    "dojo/_base/lang"
    ], 
    function (declare, _ToolTip, lang) {
    "use strict";

    return declare("HelpTextTooltip.widget.HelpTextByXPath", [_ToolTip], {

        // Widget
        helpEntity: null,
        keyConstraint: '',
        helpAttribute: null,
        displayIcon: true,

        // Local
        _contextObj: {},
        _helpText : '',

        _getHelpText: function(node){

            if(this._contextObj && !this._helpText.length){
                var xpath = "//"+this.helpEntity+this.keyConstraint.replace(/\[\%CurrentObject\%\]/gi, this._contextObj.getGuid());
                var filter = {attributes: [this.helpAttribute], amount: 1};
                mx.data.get({xpath: xpath, callback: lang.hitch(this, this._setHelpText, node), filter: filter});
            }
            else{
                this._setHelpText(node);
            }
        }
    });
});

require(["HelpTextTooltip/widget/HelpTextByXPath"]);
