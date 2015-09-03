define(['react','array','string','text','celula','matriz','mathlib','keys'],function(React,array,string,Text,Celula,Matriz,Keys){
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
                checkedIntervals:[],
                cellStates:new Matriz(0,0),
                markStyles:[],
                tmpMarkStyle:null
            };
        },
        encontradas:[],
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
            $(window).resize(function(){
                self.updateMarkStyles();
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
            var checked =false;

            for(var i = 0; i < self.state.checkedIntervals.length;i++){
                var interval = self.state.checkedIntervals[i];
                si = interval.si;
                ei = interval.ei;

                if(self.inline(si.i,si.j,ei.i,ei.j,index[0],index[1])) {
                    return 'checked';
                }
            }

            return 'default';
        },
        getMarkStyle:function(indexA,indexB){
            var self = this;
            var nodeA = React.findDOMNode(self.refs[indexA.i+'-'+indexA.j]);
            var nodeB = React.findDOMNode(self.refs[indexB.i+'-'+indexB.j]);

            var widthA = $(nodeA).width();
            var widthB = $(nodeB).width();
            var heightA = $(nodeA).height();
            var heightB = $(nodeB).height();
            var pa = $(nodeA).position();
            var pb = $(nodeB).position();
            var ca = {left:pa.left+(widthA/2),top:pa.top+(heightA/2)};
            var cb = {left:pb.left+(widthB/2),top:pb.top+(heightB/2)};
            var width = Math.distance(ca,cb);

            if(ca.top > cb.top ){
                var aux = ca;
                ca =cb;
                cb = aux;
            }

            var deg = Math.vmv(cb,ca);

            var origin = {left:1,top:0};
            var degree = Math.clockWiseDegreeFromVec(deg,origin);
            var med = Math.med(cb,ca);

            return {
                left:ca.left,
                top:ca.top,
                width:width,
                transform:'rotate('+degree+'deg)',
                transformOrigin:'3px 0'
            };
        },
        updateMarkStyles:function(){
            var self = this;
            
            var markStyles = self.state.checkedIntervals.map(function(interval,index){
                var si = interval.si;
                var ei = interval.ei;
                return self.getMarkStyle(si,ei);
            });

            self.setState({
                markStyles:markStyles
            });
        },
        render:function(){
            var self = this;
            var stri = self.state.startIndex;
            var endi = self.state.endIndex;
            var celulas = [];
            var linhas = [];

            var marks = self.state.markStyles.map(function(style,index){
                return React.createElement("span", {className: "mark", style: style, key: index});
            });

            if(self.state.tmpMarkStyle != null){
                marks.push(React.createElement("span", {className: "mark", style: self.state.tmpMarkStyle, key: marks.length}));
            }


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
                    parent:self,
                    ref:index[0]+'-'+index[1]
                };

                if(self.state.selectingText && stri != null && endi != null && self.inline(stri.i,stri.j,endi.i,endi.j,index[0],index[1])) {
                    props.state = 'checked';
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
                React.createElement("div", {className: "tabela-container pencil-hover", onKeyDown: this.checkEsc}, 
                    marks, 
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
            var self = this;
            if(self.state.selectingText){
                var startIndex = self.state.startIndex;
                var endIndex = self.state.endIndex;
                self.setState({
                    tmpMarkStyle:self.getMarkStyle(startIndex,endIndex)
                });
            }
        },
        onCellSelect:function(cell){
            var self = this;
            var index = cell.props.index;
            if(!self.state.selectingText){
                var nodeA = React.findDOMNode(self.refs[index.i+'-'+index.j]);
                var pos = $(nodeA).position();
                var ca = {left:pos.left+($(nodeA).width()/2),top:pos.top+($(nodeA).height()/2)};
                self.setState({
                    selectingText:true,
                    startIndex:index,
                    tmpMarkStyle:{
                        left:ca.left,
                        top:ca.top,
                        width:25,
                        transform:'rotate(0deg)',
                        transformOrigin:'3px 0'
                    }
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

                    if(!self.encontradas.contains(text) && !self.encontradas.contains(text.reverse())){
                        var palavras = self.props.data.palavras;
                        if(palavras.contains(text) || palavras.contains(text.reverse())){
                            var interval = {si:si,ei:ei};
                            var i = palavras.indexOf(text);
                            i = i == -1?palavras.indexOf(text.reverse()):i;

                            self.encontradas.push(palavras[i]);


                            var checkedIntervals = self.state.checkedIntervals;
                            checkedIntervals.push(interval);
                            self.setState({
                                checkedIntervals:checkedIntervals
                            },function(){
                                self.updateMarkStyles();
                            });
                        }
                    }
                }
                self.unselectState();
            }
        },
        unselectState:function(){
            this.setState({
                selectingText:false,
                starIndex:null,
                tmpMarkStyle:null
            });
        },
        checkEsc:function(e){
            e.preventDefault();
            console.log('entrou');
            if(e.which == Keys.KEY_ESC){
                this.unselectState();
            }
        }
    });
});

