//Métodos adicionais para o Objeto String



//Mapeia todos os elementos para um novo array, aplicando a função func aos elementos
String.prototype.map = function(func) {
    var size = this.length;
    var map = [];
    for (var i = 0; i < size; i++) {
        map[i] = func(this.charAt(i), i, map);
    }
    return map;
};

//Percorre todos os elementos da string, igual ao forEach comun do Objeto Array
String.prototype.forEach = function(func){
    for(var i = 0; i < this.length;i++){
        var result = func(this.charAt(i),i,this);
        if(result != undefined){
            break;
        }
    }
};


//Inverte a String
String.prototype.reverse = function(){
    if(this.reverseStr == undefined){
        this.reverseStr = this.split('').reverse().join('');
    }
    return this.reverseStr;
};


