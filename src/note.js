var Tap = function (type, perfecttime, position) {
    this.type = type;
    this.perfecttime = perfecttime;
    this.position = position;

    this._isdrawed = false;
    this._isdstroyed = false; // TODO not use
    this._sprite = this._spriteByType();
    this._rsize = 50 / this._sprite.height;
}
Tap.prototype = {
    update: function(nowtime){
        if(this._isdstroyed){
            return 0;
        }
        if(AUTOGAME && nowtime > this.perfecttime)
            this.judge(nowtime);
        if(this.perfecttime - nowtime > GAMESPEED + GAMESPEED*SPEEDSCALE){
            //phase1 disable
        }
        else if(this.perfecttime - nowtime > GAMESPEED){
            //phase2 scale
            if(!this._isdrawed){
                this._draw();
            }
            // this.perfecttime-time-GAMESPEED(T)  : GAMESPEED*SPEEDSCALE -> 0
            // GAMESPEED*SPEEDSCALE - T            : 0 -> GAMESPEED*SPEEDSCALE
            // height(H)                           : 0 -> NOTESIZE
            // H = (GAMESPEED*SPEEDSCALE - (this.perfecttime-time-GAMESPEED))*NOTESIZE/(GAMESPEED*SPEEDSCALE)
            this._sprite.height = (GAMESPEED*SPEEDSCALE - (this.perfecttime-nowtime-GAMESPEED))*NOTESIZE/(GAMESPEED*SPEEDSCALE);
            this._sprite.width = (GAMESPEED*SPEEDSCALE - (this.perfecttime-nowtime-GAMESPEED))*NOTESIZE/(GAMESPEED*SPEEDSCALE);
        }
        else if(((this.perfecttime - nowtime < GAMESPEED)&&(this.perfecttime>nowtime))||((nowtime - this.perfecttime < JUDGETIME[3])&&(this.perfecttime<nowtime))){
            //phase3 move2perfect
            // time : this.perfecttime-GAMESPEED -> this.perfecttime
            // time-(this.perfecttime-GAMESPEED) : 0 -> GAMESPEED
            // coscale : GAMESTARTCIRCLESCALE -> 1
            // coscale - GAMESTARTCIRCLESCALE: 0 -> 1- GAMESTARTCIRCLESCALE
            // coscale = ((1-GAMESTARTCIRCLESCALE)*(time-(this.perfecttime-GAMESPEED))/GAMESPEED)+GAMESTARTCIRCLESCALE
            var sc = ((1-GAMESTARTCIRCLESCALE)*(nowtime-(this.perfecttime-GAMESPEED))/GAMESPEED)+GAMESTARTCIRCLESCALE
            this._setco(COJUDGE[this.position][0]*sc,COJUDGE[this.position][1]*sc);  //set start position            
        // }
        // else if((time - this.perfecttime < JUDGETIME[3])&&(this.perfecttime<time)){
        //     //phase4 move2miss
        }
        else{
            //phase5 disable
            this.judge(nowtime); // TODO wtf judge per at miss time
        }
    },
    judge: function (judgetime) {
        //0p1gr2go3mi
        // console.log(judgetime - this.perfecttime,-JUDGETIME[2])
        if(!(this.perfecttime - judgetime > JUDGETIME[2])){
            if(judgetime - this.perfecttime > JUDGETIME[3])
                {gm.displaylist.push(new Hanabi(this.position, 3, judgetime))}  
            else{
                if(Math.abs(this.perfecttime - judgetime) < JUDGETIME[0])
                    {gm.displaylist.push(new Hanabi(this.position, 0, judgetime))}
                else if(Math.abs(this.perfecttime - judgetime) < JUDGETIME[1])
                    {gm.displaylist.push(new Hanabi(this.position, 1, judgetime))}
                else if(Math.abs(this.perfecttime - judgetime) < JUDGETIME[2])
                    {gm.displaylist.push(new Hanabi(this.position, 2, judgetime))}
            }
            this._destroy();
        }
    },
    _destroy: function (judgetime) {
        //0p1gr2go3mi
        app.stage.removeChild(this._sprite);
        // pop beatmap
        gm.beatmap[0][this.position].shift();
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