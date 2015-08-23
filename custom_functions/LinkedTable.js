LinkedTable.prototype = new Matriz();
function LinkedTable(){
    Matriz.prototype.call(this,arguments);
}


LinkedTable.prototype.set = function(i,j,value){
    var node = new LinkedTableNode(value);
    Matriz.prototype.set.apply(this,[i,j,node]);
};


LinkedTableNode.prototype.get = function(){
    var node = Matriz.prototype.get.apply(this,arguments);
    if(node instanceof LinkedTableNode){
        return node.getValue();
    }
    return null;
};


function LinkedTableNode(value){
    var self = this;
    self.top = null;
    self.topRight = null;
    self.right = null;
    self.bottomRight = null;
    self.bottom = null;
    self.bottomLeft = null;
    self.left = null;
    self.topLeft = null;
    self.value = value==undefined?null:value;
}

LinkedTableNode.prototype.getValue = function(){
    return this.value;
};

LinkedTableNode.prototype.setTop = function(top) {
    if(top instanceof LinkedTableNode){
        this.top = top;
    }
};

LinkedTableNode.prototype.setTopRight = function(topRight){
    if(topRight instanceof LinkedTableNode){
        this.topRight = topRight;
    }
};

LinkedTableNode.prototype.setRight = function(right){
    if(right instanceof LinkedTableNode){
        this.right = right;
    }
};

LinkedTableNode.prototype.setBottomRight = function(bottomRight){
    if(bottomRight instanceof  LinkedTableNode){
        this.bottomRight = bottomRight;
    }
};

LinkedTableNode.prototype.setBottom = function(bottom){
    if(bottom instanceof LinkedTableNode){
        this.bottom = bottom;
    }
};

LinkedTableNode.prototype.setBottomLeft = function(bottomLeft){
    if(bottomLeft instanceof LinkedTableNode){
        this.bottomLeft = bottomLeft;
    }
};

LinkedTableNode.prototype.setLeft = function(left){
    if(left instanceof LinkedTableNode){
        this.left = left;
    }
};

LinkedTableNode.prototype.setTopLeft = function(topLeft){
    if(topLeft instanceof LinkedTableNode){
        this.topLeft = topLeft;
    }
};

LinkedTableNode.prototype.getTop = function(){
    return this.top;
};

LinkedTableNode.prototype.getTopRight = function(){
    return this.topRight;
};

LinkedTableNode.prototype.getRight = function(){
    return this.right;
};

LinkedTableNode.prototype.getBottomRight = function(){
  return this.bottomRight;
};

LinkedTableNode.prototype.getBottom = function(){
    return this.bottom;
};

LinkedTableNode.prototype.getBottomLeft = function(){
    return this.bottomLeft;
};

LinkedTableNode.prototype.getLeft = function(){
    return this.left;
};

LinkedTableNode.prototype.getTopLeft = function(){
  return this.topLeft;
};