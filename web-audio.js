window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();

var WebAudio = function(buffer){
    this.buffer = buffer;
    //iOSでは何故か長さが2倍になるので1/2しておく
    // this.duration = (navigator.userAgent.indexOf('iPhone')==-1&&navigator.userAgent.indexOf('iPad')==-1&&navigator.userAgent.indexOf('iPod'==-1))?buffer.duration*1000:buffer.duration*500;
    this.duration = buffer.duration*1000;
};

WebAudio.prototype = {
    play:function(){
        var source = audioContext.createBufferSource();
        source.buffer = this.buffer;
        source.connect(audioContext.destination);
        source.start(0);
        this.startTime = performance.now();
    },
    getTime:function(){
        return this.startTime?performance.now() - this.startTime:0;
    },
    getIsEnd:function(){
        return this.getTime()>this.duration;
    }
};

var WebAudioDecoder = function(){
    this.bufferList = {};
    this.response = {};
};

WebAudioDecoder.prototype = {
    add:function(key,buffer){
        this.bufferList[key] = buffer;
        return this;
    },
    decode:function(decoded){
        if(Object.keys(this.bufferList).length==0){
            decoded(this.response);
        }else{
            var key = Object.keys(this.bufferList)[0];
            audioContext.decodeAudioData(this.bufferList[key],(function(buffer){
                this.response[key] = buffer;
                delete this.bufferList[key];
                this.decode(decoded);
            }).bind(this));   
        }
    }
};