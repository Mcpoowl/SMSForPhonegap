/*global logger*/
/*
    SMS
    ========================

    @file      : SMS.js
    @version   : 1.0.0
    @author    : Paul Ketelaars & Willem van Zantvoort
    @date      : 2016-04-22
    @copyright : Timeseries Consulting 2016
    @license   : Apache 2

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",

    "mxui/dom",
    "dojo/dom-attr",
    "dojo/dom-construct",
    "dojo/_base/lang",

    "dojo/text!SMS/widget/template/SMS.html"
], function(declare, _WidgetBase, _TemplatedMixin, dom, domAttr, dojoConstruct, dojoLang, widgetTemplate) {
    "use strict";

    // Declare widget's prototype.
    return declare("SMS.widget.SMS", [ _WidgetBase, _TemplatedMixin ], {
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,

        // DOM elements
        inputNodes: null,
        numberNode: null,
        messageNode: null,
        buttonNode: null,

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handles: null,
        _contextObj: null,
        _alertDiv: null,
        _phoneNumber: null,

        // Parameters configured in the Modeler.
        sourceMF: "",
        buttonText: "",
        isReadOnly: "",
        isVisible: "",

        // Parameters from HTML.
        number: "",
        messageString: "",

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function() {
            // Uncomment the following line to enable debug messages
            logger.level(logger.DEBUG);
            logger.debug(this.id + ".constructor");
            this._handles = [];
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function(callback) {
            logger.debug(this.id + ".postCreate");
            // Set the text on the button
            domAttr.set(this.buttonNode, "value", this.buttonText);
            // Set the Read Only attribute
            this.numberNode.disabled = this.isReadOnly;
            // If visibility is set to false, destroy the node
            if(this.isVisible === false) {
                dojoConstruct.destroy(this.numberNode);
            }
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function(obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObj = obj;
            this._updateRendering(callback);

            callback();
        },

        // Rerend the interface.
        _updateRendering: function(callback) {
            logger.debug(this.id + "._updateRendering");
            mx.data.action({
                params       : {
                    actionname  : this.sourceMF,
                    applyto     : "selection",
                    guids       : [this._contextObj.getGuid()]
                },
                callback     : dojoLang.hitch(this, this._processSourceMFCallback, callback),
                error        : dojoLang.hitch(this, function(error) {
                    alert(error.description);
                    this._runCallback(callback);
                }),
                onValidation : dojoLang.hitch(this, function(validations) {
                    alert("There were " + validations.length + " validation errors");
                    this._runCallback(callback);
                })
            });
        },

        _processSourceMFCallback: function (callback, returnedString) {
            logger.debug(this.id + "._processSourceMFCallback");
            // Save the number in a local variable, in case the node gets destroyed (isVisible==false).
            this._phoneNumber = returnedString;
            this.numberNode.value = returnedString;
            this._runCallback(callback);
        },

        _runCallback: function (callback) {
            logger.debug(this.id + "._runCallback");
            if (typeof callback === "function") {
                callback();
            }
        },

        _sendSMS: function() {
            logger.debug(this.id + "._sendSMS");

            // 
            logger.debug(this.id + this.numberNode.value);
            logger.debug(this.id + this.messageNode.value);
            this.number = this.numberNode.value;
	        this.messageString = this.messageNode.value;
	        console.log("number=" + this.number + ", message= " + this.messageString);

	        //CONFIGURATION
	        var options = {
	            replaceLineBreaks: false, // true to replace \n by a new line, false by default
	            android: {
	                //intent: 'INTENT'  // send SMS with the native android SMS messaging
	                intent: '' // send SMS without open any other app
	            }
	        };

	        var success = function () { alert('Message sent successfully'); };
	        var error = function () { alert('Message Failed:'); };
	        sms.send(this.number, this.messageString, options, success, error);
        }
    });
});

require(["SMS/widget/SMS"], function() {
    "use strict";
});
