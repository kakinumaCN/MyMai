var Tap = function (type, perfecttime, position) {
    this.type = type;
    this.perfecttime = perfecttime;
    this.position = position;

    this._isdrawed = false;
    this._isdstroyed = false;
    this._sprite = this._spriteByType();
    this._rsize = 50 / this._sprite.height;
}
Tap.prototype = {
    update: function(time){
        if(this._isdstroyed){
            return 0;
        }
        if(this.perfecttime - time > GAMESPEED + GAMESPEED*SPEEDSCALE){
            //phase1 disable
        }
        else if(this.perfecttime - time > GAMESPEED){
            //phase2 scale
            if(!this._isdrawed){
                this._draw();
            }
            // this.perfecttime-time-GAMESPEED(T)  : GAMESPEED*SPEEDSCALE -> 0
            // GAMESPEED*SPEEDSCALE - T            : 0 -> GAMESPEED*SPEEDSCALE
            // height(H)                           : 0 -> NOTESIZE
            // H = (GAMESPEED*SPEEDSCALE - (this.perfecttime-time-GAMESPEED))*NOTESIZE/(GAMESPEED*SPEEDSCALE)
            this._sprite.height = (GAMESPEED*SPEEDSCALE - (this.perfecttime-time-GAMESPEED))*NOTESIZE/(GAMESPEED*SPEEDSCALE);
            this._sprite.width = (GAMESPEED*SPEEDSCALE - (this.perfecttime-time-GAMESPEED))*NOTESIZE/(GAMESPEED*SPEEDSCALE);
        }
        else if(((this.perfecttime - time < GAMESPEED)&&(this.perfecttime>time))||((time - this.perfecttime < JUDGETIME[3])&&(this.perfecttime<time))){
            //phase3 move2perfect
            // time : this.perfecttime-GAMESPEED -> this.perfecttime
            // time-(this.perfecttime-GAMESPEED) : 0 -> GAMESPEED
            // coscale : GAMESTARTCIRCLESCALE -> 1
            // coscale - GAMESTARTCIRCLESCALE: 0 -> 1- GAMESTARTCIRCLESCALE
            // coscale = ((1-GAMESTARTCIRCLESCALE)*(time-(this.perfecttime-GAMESPEED))/GAMESPEED)+GAMESTARTCIRCLESCALE
            var sc = ((1-GAMESTARTCIRCLESCALE)*(time-(this.perfecttime-GAMESPEED))/GAMESPEED)+GAMESTARTCIRCLESCALE
            this._setco(COJUDGE[this.position][0]*sc,COJUDGE[this.position][1]*sc);  //set start position            
        // }
        // else if((time - this.perfecttime < JUDGETIME[3])&&(this.perfecttime<time)){
        //     //phase4 move2miss
        }
        else{
            //phase5 disable
            this.judge(time);
        }
    },
    judge: function (judgetime) {
        //0p1gr2go3mi
        app.stage.removeChild(this._sprite);
    },
    _destroy: function (judgetime) {
        //0p1gr2go3mi
        app.stage.removeChild(this._sprite);
    },
    _draw: function () {
        //init draw
        this._setco(COJUDGE[this.position][0]*GAMESTARTCIRCLESCALE,COJUDGE[this.position][1]*GAMESTARTCIRCLESCALE);  //set start position
        this._sprite.height=0;
        this._sprite.width=0;
        this._sprite.anchor.set(0.5);
        app.stage.addChild(this._sprite);
        this._isdrawed = true;
    },
    _setco: function (x,y) {
        this._sprite.x = x;
        this._sprite.y = y;
    },
    _spriteByType: function(){
        if(this.type==0){return new PIXI.Sprite(gm.imgres[0].texture);}
        else if(this.type==1){return new PIXI.Sprite(gm.imgres[1].texture);}
    }
};