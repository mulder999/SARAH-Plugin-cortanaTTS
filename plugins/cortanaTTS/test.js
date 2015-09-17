var edge = require('./lib/edge');

var helloWorld = edge.func(function () {/*
            async (input) => { 
                return ".NET Welcomes " + input.ToString(); 
            }
        */
});

helloWorld('JavaScript', function (error, result) {
    if (error) throw error;
    console.log(result);
});

var dll = require('path').join(__dirname, 'CortanaTTS.dll');
var speakClr = edge.func(dll);

console.log("Cortana should be ready yet");

function speak(text) {
    speakClr(text, function (error, result) {
        if (error) throw error;
        console.log(result);
    });
}

var text = "Bonjour je m'appelle Cortana et je suis là pour vous servir";

console.log('Sending: ' + text);
speak(text);
var sec = 4
console.log('init done, now waiting ' + sec.toString() + ' sec');

function sleep(milliseconds) {
    var start = new Date().getTime();
    while (true) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

sleep(1000 * sec);
console.log('did wait ' + sec.toString() + ' sec');