var GameManager = function () {
    this.imgres = [];
    this.audiores = [];
    this.beatmap = [
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []]
    ];
    this.displaylist = [];
    // this.sprites = [];
    this.isstart = false;
}
GameManager.prototype = {
    init: function(){

        app.view.addEventListener("mousedown", onMouseDown);

        PIXI.loaders.Resource.setExtensionXhrType("mp3", PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER);
        PIXI.loaders.Resource.setExtensionLoadType("mp3", PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER);
        const pixiloader = PIXI.loader;
        pixiloader
            .add('img_tap', 'asset/image/tap.png')
            .add('img_double', 'asset/image/double.png')
            .add('img_hold', 'asset/image/hold.png')
            .add('img_line', 'asset/image/line.png')
            .add('img_bg', 'asset/image/bg.png')
            .add('audio_perfect', 'asset/sound/perfect.mp3')
            .add('audio_flick', 'asset/sound/flick.mp3')
            .add('map', 'beatmap/m.json')
            .add('audio_music', 'beatmap/track.mp3')
            .load((loader, resource) => {
                //load img 
                gm.loadImgRes(resource);
                //load beatmap
                gm.loadBeatmap(resource['map'].data);  
                //load audio
                new WebAudioDecoder()
                    .add('audio_music', resource['audio_music'].data)
                    .add('audio_perfect', resource['audio_perfect'].data)
                    .add('audio_flick', resource['audio_flick'].data)
                    .decode((res)=>{
                        gm.loadAudioRes(res); 
                        // main loop update();
                    });
            });
    },
    start: function(){
        mainloop();
    },
    update: function(){
        if(!this.isstart){
            this.isstart = true;
            this.audiores[0].play();
        }

        for(var i=0;i<8;i++){
            for(var j=0;j<this.beatmap[0][i].length;j++){
                this.beatmap[0][i][j].update(this.audiores[0].getTime());
            }
        }
        for(i in this.displaylist){
            this.displaylist[i].update(this.audiores[0].getTime());
        }
    },
    loadImgRes: function(res){
        this.imgres.push(res['img_tap']);
        this.imgres.push(res['img_double']);
        this.imgres.push(res['img_hold']);
        this.imgres.push(res['img_line']);
        this.imgres.push(res['img_bg']);
        _debuglog(0,this.imgres);
        // this._loadSprites();
    },
    // _loadSprites: function(){
    //     for(i in this.imgres)
    //     {
    //         this.sprites.push(new PIXI.Sprite(this.imgres[i].texture));
    //     }
    // },
    loadBeatmap: function(map){
        for(var i=0;i<map.notes.length;i++){
            if(map.notes[i]['type'] == 0){
                this.beatmap[0][map.notes[i]['position']].push(new Tap(map.notes[i]['type'], map.notes[i]['time']*1000, map.notes[i]['position']))
            }
        }
    },
    loadAudioRes: function(res){
        this.audiores.push(new WebAudio(res['audio_music']));
        this.audiores.push(new WebAudio(res['audio_perfect']));
        this.audiores.push(new WebAudio(res['audio_flick']));
        _debuglog(0,this.audiores);
    },
    _debugshowallimgres: function(){
        for(i in this.imgres)
        {
            var s = new PIXI.Sprite(this.imgres[i].texture);
            s.x = 50*i;
            app.stage.addChild(s);
        }
    },
    _debugplayallaudio: function(){
        // for(i in this.audiores)
        // {
            // this.audiores[i].play();
            // while(this.audiores[i].getIsEnd())
            // {
            //     pass;
            // }
            // console.log(i);
        // }
    },
    _debugshowmap: function(){
        console.log(this.beatmap);
    }
}