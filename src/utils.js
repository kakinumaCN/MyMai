function _canvco2viewco(x,y)
{
    return [x + app.screen.width / 2, y + app.screen.height / 2 + app.screen.height/8]; 
}

function _viewco2canvco(x,y)
{
    return [x - app.screen.width / 2, y - (app.screen.height / 2 + app.screen.height/8)]; 
}

function _canvco2area(cx,cy)
{   if(cy < GAMEVIEWSIZE/3)
        return -1;
    x = _viewco2canvco(cx,cy)[0];
    y = _viewco2canvco(cx,cy)[1];
    if(x>0){if(y>0){if(x>y){return 2;}else{return 3;}}else{if(x>-y){return 1;}else{return 0;}}}else{if(y>0){if(-x>y){return 5;}else{return 4;}}else{if(-x>-y){return 6;}else{return 7;}}}
}

function _debuglog(type,lg)
{
    if(ISDEBUG)
    {
        console.log(lg);
    }
}

function _debugprint(type,lg)
{
    if(ISDEBUG)
    {
        debugprinttext = new PIXI.Text("0", {
            fontFamily: 'Arial',
            fontSize: 35,
            fill: 'green',
            fontWeight: 'bold'
        }); 
        debugprinttext.text = lg;
        debugprinttext.position.set(0,0);
        app.stage.addChild(debugprinttext);
    }
}

function _debugprintgamearea()
{
    //print cojudge
    var graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0x0000FF, 1);
    for(i in COJUDGE){
        graphics.drawCircle(COJUDGE[i][0],COJUDGE[i][1], 5);
    }
    for(i in COJUDGE){
        graphics.drawCircle(GAMESTARTCIRCLESCALE*COJUDGE[i][0],GAMESTARTCIRCLESCALE*COJUDGE[i][1], 5);
    }

    //print 0,0
    graphics.drawCircle(0,0,5)

    //print big area bnound    
    graphics.moveTo(-0.5*GAMEVIEWSIZE,-0.5*GAMEVIEWSIZE);
    graphics.lineTo(0.5*GAMEVIEWSIZE,-0.5*GAMEVIEWSIZE);

    app.stage.addChild(graphics);
}

function _setcojudge()
{
    var SIN675 = 0.9238795;
    var COS675 = 0.3825834;
    var gameR = GAMEVIEWSIZE / 2 * GAMECIRCLESIZE; 
    return [
        [gameR*COS675, -gameR*SIN675],
        [gameR*SIN675, -gameR*COS675],

        [gameR*SIN675, gameR*COS675],
        [gameR*COS675, gameR*SIN675],

        [-gameR*COS675, gameR*SIN675],
        [-gameR*SIN675, gameR*COS675],

        [-gameR*SIN675, -gameR*COS675],
        [-gameR*COS675, -gameR*SIN675],
    ];
}