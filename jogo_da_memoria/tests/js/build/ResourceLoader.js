ResourceLoader = {
    loadImage:function(src,completeCallback){
        var img = document.createElement('img');
        img.src = src;
        $(img).on('load',function(){
            completeCallback();
        });
    },
    loadAudio:function(src,completeCallback){
        var audio = document.createElement('audio');
        if (audio.canPlayType('audio/wav')) {
            audio.src = src;
            $(audio).on('canplaythrough',function(){
                completeCallback();
            });
        }
        else{
            completeCallback();
        }
    },
    loadImages:function(images,progressCallback,completeCallback,size,count){
        var self = this;
        size = size == undefined?images.length:size;
        count = count == undefined?0:count;
        if(images.length > 0){
            var image = images.pop();
            self.loadImage(image,function(){
                var percent = Math.round((count*100)/size)
                progressCallback(percent);
                self.loadImages(images,progressCallback,completeCallback,size,count+1);
            });
        }
        else{
            completeCallback();
        }
    },
    loadAudios:function(audios,progressCallback,completeCallback,size,count){
        var self = this;
        size = size == undefined?audios.length:size;
        count = count == undefined?0:count;
        if(audios.length > 0){
            var audio = audios.pop();
            self.loadAudio(audio,function(){
                var percent = Math.round((count*100)/size)
                progressCallback(percent);
                self.loadAudios(audios,progressCallback,completeCallback,size,count+1);
            });
        }
        else{
            completeCallback();
        }
    }
};