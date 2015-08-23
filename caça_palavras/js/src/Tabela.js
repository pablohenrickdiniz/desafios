define(['react','array','string','text','celula','matriz'],function(React,array,string,Text,Celula,Matriz){
    return  React.createClass({
        getDefaultProps:function(){
            return {
                linhas:[
                    '   ABOBORA',
                    '    M      ',
                    '     A',
                    '      Z',
                    '       O',
                    'OIGARFUAN',
                    '         A',
                    '          S',
                    null
                ]
            }
        },
        componentWillMount:function(){
            var self = this;
            var max_length = self.getMaxLength();
            var matriz = new Matriz(this.props.linhas.length,max_length);
            this.props.linhas.forEach(function(linha,i){
                if(linha instanceof Array || typeof linha == 'string'){
                    linha.forEach(function(celula,j){
                        celula = celula.trim();
                        matriz.set(i,j,celula);
                    });
                }
            });
            console.log(matriz);
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
                celulas.push(<Celula {...props}/>);
            },function(row){
                linhas.push(<tr key={row}>{celulas}</tr>);
                celulas = [];
            });



            return (
                <table className="tabela" onMouseMove={this.onMouseMove}>
                    <tbody>
                     {linhas}
                    </tbody>
                </table>
            );
        },
        onMouseMove:function(e){
            e.preventDefault();
            if(this.state.selectingText){


            }
        },
        onCellSelect:function(cell){
            if(!this.state.selectingText){
                this.setState({
                    selectingText:true,
                    startIndex:cell.props.index
                },function(){
                    cell.setState({
                        state:'hover',
                        blocked:true
                    });
                });
            }
            else{
                var si = this.state.startIndex;
                var ei = this.state.endIndex;
                if(si != null && ei != null){
                    var increment_i = 0;
                    var increment_j = 0;
                    if(si.i == ei.i){
                        increment_i = si.i <= ei.i?1:-1;
                    }
                    else if(si.j == ei.j){
                        increment_j = si.j <= ei.j?1:-1;
                    }
                    else{
                        increment_i = si.i <= ei.i?1:-1;
                        increment_j = si.j <= ei.j?1:-1;
                    }

                    var i = si.i;
                    var j = si.j;
                    var text = "";

                    do{
                        i+= increment_i;
                        j+= increment_j;
                    }
                    while(i != ei.i && j != ei.j)
                }

                this.setState({
                    selectingText:false,
                    starIndex:null,
                    endIndex:null
                });
            }
        }
    });
});

