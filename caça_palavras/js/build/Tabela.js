define(['react','array','string','text','celula','matriz'],function(React,array,string,Text,Celula,Matriz){
    return  React.createClass({
        getDefaultProps:function(){
            /*
                linhas:O formato das linhas deve ser uma matriz(array de arrays) ou um array de strings,
                na qual um espaço em branco representa uma letra aleatória e também é usado para aumentar
                a largura da matriz, uma linha vazia ou nula representa uma linha inteira de letras aleatórias

             */
            return {
                linhas:[
                    '   ABOBORA',
                    '    M      ',
                    '     A',
                    '      Z',
                    '       O',
                    'OIGARFUAN',
                    '         A',
                    '          S          ',
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ]
            }
        },
        cellStates:new Matriz(0,0),
        componentWillMount:function(){
            var self = this;
            var max_length = self.getMaxLength();
            var matriz = new Matriz(this.props.linhas.length,max_length);
            self.cellStates = new Matriz(this.props.linhas.length,max_length);
            this.props.linhas.forEach(function(linha,i){
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
        getInitialState:function(){
            return {
                selectingText:false,
                startIndex:null,
                endIndex:null,
                matriz:new Matriz(0,0)
            };
        },
        getMaxLength:function(){
            return this.props.linhas.reduce(function(oldval,nextval){
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

        render:function(){
            var self = this;
            var stri = self.state.startIndex;
            var endi = self.state.endIndex;
            var celulas = [];
            var linhas = [];

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


                if(self.state.selectingText){
                    if(stri != null && endi != null && self.inline(stri.i,stri.j,endi.i,endi.j,index[0],index[1])){
                        props.state = 'hover';
                    }
                    else{
                        props.state = 'default';
                    }
                }
                celulas.push(React.createElement(Celula, React.__spread({},  props)));
            },function(row){
                linhas.push(React.createElement("tr", {key: row}, celulas));
                celulas = [];
            });



            return (
                React.createElement("table", {className: "tabela", onMouseMove: this.onMouseMove}, 
                    React.createElement("tbody", null, 
                     linhas
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
                        console.log(val);
                        text += val;
                    });
                    console.log(text);
                    console.log(text.reverse());
                }

                this.setState({
                    selectingText:false,
                    starIndex:null
                });
            }
        }
    });
});

