(function () {

    var panelHtml = '<div class="console-panel-container">' +
        '<div class="console-header">' +
        '<ul class="left-action-button"><li><a id="clear" href="#">clear</a></li></ul>' +
        ' <ul class="console-action-btn">' +
        '<li><a id="minimize" href="#"><i class="fa fa-minus"></i></a></li>' +
        '<li><a id="close" href="#"><i class="fa fa-times"></i></a></li>' +
        '</ul>' +
        '</div>' +
        '<div class="console-body"><ul id="log-container"></ul></div>' +
        '</div>';



    var defaults = {
        'enableKeys': true,
        'keys': {
            'open': 'alt+o',
            'clear': 'alt+c'
        }
    }


    // define a new console
    var logObject = {
        log: function (text) {
            var postData = '';
            postData = JSON.stringify(text);
            logErrorToScreen(postData, 'log-error');

        },
        info: function (text) {
            var postData = '';
            postData = JSON.stringify(text);
            logErrorToScreen(postData, 'info-error');
        },
        warn: function (text) {
            var postData = '';
            postData = JSON.stringify(text);
            logErrorToScreen(postData, 'warn-error');
        },
        error: function (text) {
            var postData = '';
            postData = JSON.stringify(text);
            logErrorToScreen(postData, 'error-error');
        }
    };



    /**
     * @description create the console panel
     * @author Tushar Borole
     */
    var createThePanel = function () {
        $('body').append(panelHtml);
    };

    /**
     * @description remove the panel and destroy the objects related to it
     * @author Tushar Borole
     */
    var removeThePanel = function () {
        $('.console-panel-container').remove();
    };


    var enableKeyMode = function () {
        $(document).on('keydown', null, defaults.keys.clear, function () {
            clearTheConsole()
        });
        $(document).on('keydown', null, defaults.keys.open, function () {

            if ($(".console-panel-container").length) {
                removeThePanel();
            } else {
                createThePanel();
            }


        });
    }



    /**
     * @description initialize events
     * @author Tushar Borole
     */
    var initializeEvents = function () {
        $('.console-panel-container #minimize').click(function () {
            minimizeThePanel();
        });
        $('.console-panel-container #close').click(function () {
            removeThePanel();
        });
        $('.console-panel-container #clear').click(function () {
            clearTheConsole();
        });


    };

    /**
     * @description clear the console   
     * @author Tushar Borole
     */
    var clearTheConsole = function () {
        $('#log-container').empty();
    }








    var logErrorToScreen = function (text, classname) {
        var textHTML = '<li class=' + classname + '>' + text + '<li>';
        $('#log-container').append(textHTML);

    };



    /**
     * @description minimize the panel  
     * @author Tushar Borole
     */
    var minimizeThePanel = function () {
        var isVisible = $('.console-body').is(":visible");
        if (isVisible) {
            $('.console-body').hide();
            $('#minimize i').attr('class', 'fa fa-square-o');
        } else {
            $('.console-body').show();
            $('#minimize i').attr('class', 'fa fa-minus');
        }



    };

    var init = function (data) {
        defaults = $.extend(defaults, data);
        createThePanel();
        initializeEvents();

        if (defaults.enableKeys) {
            enableKeyMode()
        }
        window.console = logObject; // overrite the log functionnality

    };




    // Public API
    window.debuggerLog = {
        init: init,
        destroy: removeThePanel
    };







    window.onerror = function (msg, url, line, col, error) {
        logErrorToScreen(msg, 'error-error');
    };

})();


(function (jQuery) {

    jQuery.hotkeys = {
        version: "0.2.0",

        specialKeys: {
            8: "backspace",
            9: "tab",
            10: "return",
            13: "return",
            16: "shift",
            17: "ctrl",
            18: "alt",
            19: "pause",
            20: "capslock",
            27: "esc",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down",
            45: "insert",
            46: "del",
            59: ";",
            61: "=",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
            106: "*",
            107: "+",
            109: "-",
            110: ".",
            111: "/",
            112: "f1",
            113: "f2",
            114: "f3",
            115: "f4",
            116: "f5",
            117: "f6",
            118: "f7",
            119: "f8",
            120: "f9",
            121: "f10",
            122: "f11",
            123: "f12",
            144: "numlock",
            145: "scroll",
            173: "-",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'"
        },

        shiftNums: {
            "`": "~",
            "1": "!",
            "2": "@",
            "3": "#",
            "4": "$",
            "5": "%",
            "6": "^",
            "7": "&",
            "8": "*",
            "9": "(",
            "0": ")",
            "-": "_",
            "=": "+",
            ";": ": ",
            "'": "\"",
            ",": "<",
            ".": ">",
            "/": "?",
            "\\": "|"
        },

        // excludes: button, checkbox, file, hidden, image, password, radio, reset, search, submit, url
        textAcceptingInputTypes: [
      "text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime",
      "datetime-local", "search", "color", "tel"],

        // default input types not to bind to unless bound directly
        textInputTypes: /textarea|input|select/i,

        options: {
            filterInputAcceptingElements: true,
            filterTextInputs: true,
            filterContentEditable: true
        }
    };

    function keyHandler(handleObj) {
        if (typeof handleObj.data === "string") {
            handleObj.data = {
                keys: handleObj.data
            };
        }

        // Only care when a possible input has been specified
        if (!handleObj.data || !handleObj.data.keys || typeof handleObj.data.keys !== "string") {
            return;
        }

        var origHandler = handleObj.handler,
            keys = handleObj.data.keys.toLowerCase().split(" ");

        handleObj.handler = function (event) {
            //      Don't fire in text-accepting inputs that we didn't directly bind to
            if (this !== event.target &&
                (jQuery.hotkeys.options.filterInputAcceptingElements &&
                    jQuery.hotkeys.textInputTypes.test(event.target.nodeName) ||
                    (jQuery.hotkeys.options.filterContentEditable && jQuery(event.target).attr('contenteditable')) ||
                    (jQuery.hotkeys.options.filterTextInputs &&
                        jQuery.inArray(event.target.type, jQuery.hotkeys.textAcceptingInputTypes) > -1))) {
                return;
            }

            var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[event.which],
                character = String.fromCharCode(event.which).toLowerCase(),
                modif = "",
                possible = {};

            jQuery.each(["alt", "ctrl", "shift"], function (index, specialKey) {

                if (event[specialKey + 'Key'] && special !== specialKey) {
                    modif += specialKey + '+';
                }
            });

            // metaKey is triggered off ctrlKey erronously
            if (event.metaKey && !event.ctrlKey && special !== "meta") {
                modif += "meta+";
            }

            if (event.metaKey && special !== "meta" && modif.indexOf("alt+ctrl+shift+") > -1) {
                modif = modif.replace("alt+ctrl+shift+", "hyper+");
            }

            if (special) {
                possible[modif + special] = true;
            } else {
                possible[modif + character] = true;
                possible[modif + jQuery.hotkeys.shiftNums[character]] = true;

                // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
                if (modif === "shift+") {
                    possible[jQuery.hotkeys.shiftNums[character]] = true;
                }
            }

            for (var i = 0, l = keys.length; i < l; i++) {
                if (possible[keys[i]]) {
                    return origHandler.apply(this, arguments);
                }
            }
        };
    }

    jQuery.each(["keydown", "keyup", "keypress"], function () {
        jQuery.event.special[this] = {
            add: keyHandler
        };
    });

})(jQuery || this.jQuery || window.jQuery);