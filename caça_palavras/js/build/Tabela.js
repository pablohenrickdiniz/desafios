var Tabela = React.createClass({displayName: "Tabela",
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
    render:function(){
        var max_length = this.props.linhas.reduce(function(oldval,nextval){
            if(nextval instanceof Array || typeof nextval == 'string'){
                return nextval.length>oldval?nextval.length:oldval;
            }
            return oldval;
        },0);
        console.log(max_length);
        var linhas = this.props.linhas.map(function(linha,index_a){
            var celulas = [];
            if(linha instanceof Array || typeof linha == 'string'){
                celulas = linha.map(function(celula,index_b){
                    celula = celula.trim();

                    if(celula == '' || celula == undefined || celula == null){
                        celula = Text.getRandomLetter();
                    }
                    return React.createElement("td", {key: index_a+'.'+index_b}, celula);
                });
            }
            while(celulas.length < max_length){
                celulas.push(React.createElement("td", {key: index_a+'.'+celulas.length}, Text.getRandomLetter()));
            }
            return React.createElement("tr", {key: index_a}, celulas)
        });
        return (
            React.createElement("table", {className: "tabela"}, 
                React.createElement("tbody", null, 
                     linhas
                )
            )
        );
    }
});