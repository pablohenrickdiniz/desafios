function AudioPlayer(){
    var self = this;
    self.channels = [];
    self.element = null;
}

AudioPlayer.prototype.getElement = function(){
    var self = this;
    if(self.element == null){
        self.element = document.createElement('div');
        $(self.element).addClass('AudioPlayer');
        var id = generateUUID();
        $(self.element).prop("id",id);
        $('body').append(self.element);
    }
    return self.element;
};

AudioPlayer.prototype.playOnChannel = function(audio,channel){
    var self = this;
    self.getChannel(channel).play(audio);
};

AudioPlayer.prototype.stopAll = function(){
    self.channels.forEach(function(channel){
        channel.stop();
    });
};

AudioPlayer.prototype.destroyAll = function(){
    var self = this;
    self.channels.forEach(function(channel,index){
        channel.destroy();
        delete self.channels[index];
    });
};

AudioPlayer.prototype.getChannel = function(index){
    var self = this;
    if(self.channels[index] == undefined){
        self.channels[index] = new AudioChannel();
        $(self.getElement()).append(self.channels[index].getElement());
    }
    return self.channels[index];
};


function AudioChannel(index){
    var self = this;
    self.index = index;
    self.element = null;
    self.audio = null;
}

AudioChannel.prototype.play = function(audio){
    var self = this;
    if(audio != undefined){
        self.setAudio(audio);
    }
    $(self.getElement())[0].play();
};

AudioChannel.prototype.setAudio = function(audio){
    var self = this;
    $(self.getElement()).attr('src',audio);
};

AudioChannel.prototype.stop = function(){
    var self = this;
    $(self.getElement())[0].stop();
};

AudioChannel.prototype.getElement = function(){
    var self = this;
    if(self.element == null){
        self.element = document.createElement('audio');
        $(self.element).attr('data-index',self.index);
    }
    return self.element;
};

AudioChannel.prototype.destroy = function(){
    $(self.getElement()).remove();
};