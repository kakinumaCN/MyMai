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
    console.log(_canvco2area(x,y));
}
