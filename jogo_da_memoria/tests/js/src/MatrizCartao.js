MatrizCartao.prototype = new Matriz();
function MatrizCartao(rows,cols){
    Matriz.call(this,rows,cols);
}


MatrizCartao.prototype.add = function(cartao){
    if(cartao instanceof Object){
        var pos = this.getNextPosition();
        if(pos != null){
            this.set(pos[0],pos[1],cartao);
        }
    }
};

MatrizCartao.prototype.getNextPosition = function(){
    var self = this;
    var rows = self.rows;
    var cols = self.cols;
    for(var i = 0; i < rows;i++){
        for(var j = 0; j < cols;j++){
            var val = self.get(i,j);
            if(!(val instanceof Object)){
                return [i,j];
            }
        }
    }
    return null;
};