function onMouseDown(e) {
    e.preventDefault();
    _onDown(e.clientX, e.clientY);
}

function onTouchDown(e){
    e.preventDefault();
    for (var i = e.touches.length; i--;) {
        down();
    }
}

function _onDown(x,y){
    _debuglog(0,'tap' + _canvco2area(x,y));
    if(gm.beatmap[0][_canvco2area(x,y)].length)
        gm.beatmap[0][_canvco2area(x,y)][0].judge(gm.audiores[0].getTime())
}
