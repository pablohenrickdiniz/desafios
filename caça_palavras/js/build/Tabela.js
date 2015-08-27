define(['react','array','string','text','celula','matriz'],function(React,array,string,Text,Celula,Matriz){
    return  React.createClass({
        getDefaultProps:function(){
            /*
             linhas:O formato das linhas deve ser uma matriz(array de arrays) ou um array de strings,
             na qual um espaço em branco representa uma letra aleatória e também é usado para aumentar
             a largura da matriz, uma linha vazia ou nula representa uma linha inteira de letras aleatórias

             */
            return {
                data:{
                    linhas:[],
                    palavras:[]
                }
            }
        },
        getInitialState:function(){
            return {
                selectingText:false,
                startIndex:null,
                endIndex:null,
                matriz:new Matriz(0,0),
                encontradas:0,
                checkedIntervals:[],
                cellStates:new Matriz(0,0)
            };
        },
        cellStates:new Matriz(0,0),
        componentWillMount:function(){
            var self = this;
            var max_length = self.getMaxLength();
            var linhas = this.props.data.linhas;
            var matriz = new Matriz(linhas.length,max_length);
            self.cellStates = new Matriz(linhas.length,max_length);
            linhas.forEach(function(linha,i){
                var aux = -1;
                if(linha instanceof Array || typeof linha == 'string'){
                    linha.forEach(function(celula,j){
                        celula = celula.trim();
                        if(celula == ''){
                            celula = Text.getRandomLetter();
                        }
                        matriz.set(i,j,celula);
                        aux = j;
                    });
                }
                while(aux < max_length){
                    aux++;
                    matriz.set(i,aux,Text.getRandomLetter());
                }
            });

            this.setState({
                matriz:matriz
            });
        },
        getMaxLength:function(){
            return this.props.data.linhas.reduce(function(oldval,nextval){
                if(nextval instanceof Array || typeof nextval == 'string'){
                    return nextval.length>oldval?nextval.length:oldval;
                }
                return oldval;
            },0);
        },
        inline:function(si,sj,ei,ej,i,j){
            var max_i = Math.max(si,ei);
            var max_j = Math.max(sj,ej);
            var min_i = Math.min(si,ei);
            var min_j = Math.min(sj,ej);


            var interval = i >= min_i && i <= max_i && j >= min_j && j <= max_j;
            var same = (si == ei && ei == i) || (sj == ej && ej == j);
            var diff = (Math.abs(si-i) == Math.abs(sj - j)) && (Math.abs(ei-i) == Math.abs(ej-j));

            if(interval){
                if(same || diff){
                    return true;
                }
            }
            return false;
        },
        getInlineType: function(si,sj,ei,ej,i,j){
            if(si == ei && ei == i){
                return 'horizontal';
            }
            else if(sj == ej && ej == j){
                return 'vertical';
            }
            else if((Math.abs(si-i) == Math.abs(sj - j)) && (Math.abs(ei-i) == Math.abs(ej-j))){
                return 'diagonal';
            }
            return '';
        },
        getCheckedState:function(index){
            var self = this;
            var classes = [];
            for(var i = 0; i < self.state.checkedIntervals.length;i++){
                var interval = self.state.checkedIntervals[i];
                var si = interval.si;
                var ei = interval.ei;

                if(this.inline(si.i,si.j,ei.i,ei.j,index[0],index[1])){
                    if(!classes.contains('checked')){
                        classes.push('checked');
                    }

                    var type = self.getInlineType(si.i,si.j,ei.i,ei.j,index[0],index[1]);
                    if(!classes.contains(type)){
                        classes.push(type);
                    }

                    if(!classes.contains(type+'-first') && si.i == index[0] && si.j == index[1]){
                        classes.push(type+'-first');
                    }

                    if(!classes.contains(type+'-last') && ei.i == index[0] && ei.j == index[1]){
                        classes.push(type+'-last');
                    }


                    if(!classes.contains('right') && si.j < ei.j){
                        classes.push('right');
                    }
                    else if(!classes.contains('left')){
                        classes.push('left');
                    }
                }
            }

            if(classes.length == 0){
                return 'default';
            }
            else{
                return classes.join(' ');
            }
        },
        render:function(){
            var self = this;
            var stri = self.state.startIndex;
            var endi = self.state.endIndex;
            var celulas = [];
            var linhas = [];


            var marks = self.state.matriz.intervals.map(function(interval){
                var si = interval.si;
                var pos = {left:si.i*50,top:si.j*50};
            });


            self.state.matriz.forEach(function(celula,index){
                celula = typeof celula == 'string'?  celula.trim():'';
                if(celula == ''){
                    celula = undefined;
                }
                var props = {
                    key:index[1],
                    index:{i:index[0],j:index[1]},
                    value:celula,
                    onClick:self.onCellSelect,
                    parent:self
                };

                if(self.state.selectingText && stri != null && endi != null && self.inline(stri.i,stri.j,endi.i,endi.j,index[0],index[1])) {
                    props.state = 'hover';
                }
                else{
                    props.state = self.getCheckedState(index);
                }

                celulas.push(React.createElement(Celula, React.__spread({},  props)));
            },function(row){
                linhas.push(React.createElement("tr", {key: row}, celulas));
                celulas = [];

            });



            return (
                React.createElement("div", {className: "tabela-container"}, 
                    React.createElement("table", {className: "tabela", onMouseMove: this.onMouseMove}, 
                        React.createElement("tbody", null, 
                            linhas
                        )
                    )
                )
            );
        },
        onMouseMove:function(e){
            e.preventDefault();
            if(this.state.selectingText){


            }
        },
        onCellSelect:function(cell){
            var self = this;
            var index = cell.props.index;
            if(!self.state.selectingText){
                self.setState({
                    selectingText:true,
                    startIndex:index
                },function(){
                    self.cellStates.set(index.i,index.j,'hover');
                });

            }
            else{
                var si = self.state.startIndex;
                var ei = self.state.endIndex;
                if(si != null && ei != null){
                    var text = '';
                    self.state.matriz.forLine(si.i,si.j,ei.i,ei.j,function(val){
                        text += val;
                    });

                    if(si.i > ei.i || si.j > ei.j){
                        var aux = si;
                        si = ei;
                        ei = aux;
                    }

                    if(this.props.data.palavras.contains(text) || this.props.data.palavras.contains(text.reverse())){
                        var interval = {si:si,ei:ei};

                        var checkedIntervals = self.state.checkedIntervals;
                        checkedIntervals.push(interval);
                        self.setState({
                            checkedIntervals:checkedIntervals
                        });
                    }
                }

                this.setState({
                    selectingText:false,
                    starIndex:null
                });
            }
        }
    });
});

