function onMouseDown(e) {
    e.preventDefault();
    _onDown(e.clientX, e.clientY);
}

function onTouchDown(e){
    e.preventDefault();
    // for (var i = e.touches.length; i--;) {
        _onDown(e.clientX, e.clientY);
    // }
}

function _onDown(x,y){
    if(gm.isupdate == false)
        {gm.start();
            _debugprint(0,'start');}
    _debuglog(0,['tap' + _canvco2area(x,y), x, y]);
    if(_canvco2area(x,y) > -1 && gm.beatmap[0][_canvco2area(x,y)].length)
        gm.beatmap[0][_canvco2area(x,y)][0].judge(gm.audiores[0].getTime())
}
