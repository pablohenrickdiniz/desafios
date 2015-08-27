define(function(){
    return {
        letters:[
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
            'J', 'K', 'L', 'M', 'N','O', 'P', 'Q','R',
            'S','T','U','V','W','X','Y','Z'
        ],
        //obtém uma letra aleatória A-Z
        getRandomLetter:function(){
            var index = parseInt(Math.floor(Math.random()*this.letters.length));
            return this.letters[index];
        }
    }
});
