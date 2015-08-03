Object.randForEach = function (object,func){
    var keys = Object.keys(object);
    while(keys.length > 0){
        var index = parseInt(Math.floor(Math.random()*keys.length));
        var key = keys.splice(index,1);
        if(object[key] != undefined){
            var result = func(object[key],key,object);
            if(result != undefined){
                break;
            }
        }
    }
};

Object.count = function(object){
    return Object.keys(object).length;
};


Object.forEach = function(object,func){
    var keys = Object.keys(object);
    var count = keys.length;
    for(var i = 0; i < count;i++){
        var key = keys[i];
        if(object[key] != undefined){
            var result = func(object[key],key,object);
            if(result != undefined){
                return result;
            }
        }
    }
    return null;
};