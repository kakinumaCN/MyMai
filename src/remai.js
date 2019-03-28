var GAMEVIEWSIZE = 900;
var GAMECIRCLESIZE = 0.9; // by GAMEVIEWSIZE
var GAMESTARTCIRCLESCALE = 0.2; // by GAMEVIEWSIZE
var NOTESIZE = 0.09*GAMEVIEWSIZE;
var GAMESPEED = 366; // 0area -> judge area in GAMESPEED ms
var SPEEDSCALE = 0.55 // SPEEDSCALE time to scale
var ISDEBUG = 1;
var JUDGETIME = [45,75,100,130]; //perfect,great,good,miss
var COJUDGE = _setcojudge();
var COSTART = [[0,0]];
var AUTOGAME = true;

var app = new PIXI.Application(GAMEVIEWSIZE, GAMEVIEWSIZE*4/3,{backgroundColor : 0x39c5bb});
// app.view.style.width = window.innerWidth + 'px';
// app.view.style.height = window.innerWidth + 'px';
app.stage.transform.position.x = _canvco2viewco(0,0)[0];
app.stage.transform.position.y = _canvco2viewco(0,0)[1];
// var c =  app.view
// var ctx = c.getContext("2d");
// ctx.translate(_canvco2viewco(0,0)[0],_canvco2viewco(0,0)[1]);
document.body.appendChild(app.view);

var gm = new GameManager();
gm.init();

_debugprintgamearea();

// function mainloop(){
//     gm.update();
//     requestAnimationFrame(mainloop);
// }
function mainloop(){
    app.ticker.add(function() {
        gm.update();
    });
}