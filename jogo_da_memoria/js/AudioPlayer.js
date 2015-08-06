function AudioPlayer(){
    var self = this;
    self.id = generateUUID();
    self.element = document.createElement('audio');
    self.element.id = self.id;
    $('body').append(self.element);
}

AudioPlayer.prototype.play = function(src){
    var self = this;
    if(src != undefined){
        $(self.element).attr('src',src);
    }
    $(self.element)[0].play();
};

AudioPlayer.prototype.stop = function(){
    var self = this;
    $(self.element)[0].stop();
};

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}