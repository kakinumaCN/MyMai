var Hanabi = function (position, type, genetime) {
    this.position = position;
    this.genetime = genetime;
    this.type = type;

    this._isdrawed = false;
    this._life = 200; //time ms
    this._destroytime = this.genetime + this._life;

    this._text = new PIXI.Text("0", {
        fontFamily: 'Arial',
        fontSize: 35,
        fill: 'green',
        fontWeight: 'bold'
    }); 
};
Hanabi.prototype = {
    update: function(nowtime){
        if(nowtime > this._destroytime)
            this._destroy();
        if(!this._isdrawed){
            this._draw();
        }
    },
    _destroy: function(){
        app.stage.removeChild(this._text);
        gm.displaylist.shift();// TODO early destroy early generate with same this._life, but ...
    },
    _draw: function () {
        this._text.position.set(COJUDGE[this.position][0],COJUDGE[this.position][1]);
        switch(this.type){
            case 0:this._text.text = 'per!';break;
            case 1:this._text.text = 'gr!';break;
            case 2:this._text.text = 'go!';break;
            case 3:this._text.text = 'miss!';break;
        }
        app.stage.addChild(this._text);
        if(this.type!=3)gm.audiores[1].play();
        this._isdrawed = true;
    }
};