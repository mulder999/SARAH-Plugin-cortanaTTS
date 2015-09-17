var edge = require('./lib/edge');

var dll = require('path').join(__dirname, 'CortanaTTS.dll');
var cortanaSpeakAsyncClr = edge.func(dll);

function cortanaSpeakClr(text)
{
    cortanaSpeakAsyncClr(text, function (error, result) {
        if (error) throw error;
        console.log(result);
    });
}

function standardSpeak(tts, async, SARAH) {
    //SARAH.speak.tts(tts);
    // no return;
    return tts;
}

function debugSpeak(tts, async, SARAH) {
    console.log("Cortana says: " + tts);
    // no return;
}

function cortanaSpeak(tts, async, SARAH) {
    cortanaSpeakClr(tts);
    // no return;
}

var CortanaTTSManager = {
    'init': function () {
        console.log('Cortana initialized');
        return CortanaTTSManager;
    },

    'speak': function (tts, async, SARAH) {
        var config = SARAH.ConfigManager.getConfig().modules.cortanaTTS;

        if (config.enable && config.enable == "True") {
            return cortanaSpeak(tts, async, SARAH);
        } else {
            return standardSpeak(tts, async, SARAH);
        }
    }
};

// Public stuff
exports.CortanaTTSManager = CortanaTTSManager.init();
exports.init = function (SARAH) {

    var config = SARAH.ConfigManager.getConfig().modules.cortanaTTS;
    exports.speak = exports.CortanaTTSManager.speak;

    if (config.enable && config.enable == "True"
        && config.welcomeText && config.welcomeText != "") {
        SARAH.speak(config.welcomeText);
    }
};

