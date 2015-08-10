var Cartao = React.createClass({
    mixins:[updateMixin],
    propTypes:{
        id:React.PropTypes.string,
        titulo:React.PropTypes.string,
        par:React.PropTypes.string,
        bloqueado:React.PropTypes.bool,
        imagem:React.PropTypes.string,
        fundo:React.PropTypes.string,
        altura:React.PropTypes.number,
        largura:React.PropTypes.number,
        som:React.PropTypes.string,
        left:React.PropTypes.number,
        top:React.PropTypes.number,
        index:React.PropTypes.array,
        virado:React.PropTypes.bool,
        onClick:React.PropTypes.func
    },
    getInitialState: function (){
        return {
            id: '000',
            titulo: '',
            par: '',
            bloqueado: false,
            imagem:'',
            fundo:'',
            altura:100,
            largura:100,
            som:'',
            left:0,
            top:0,
            index:[0,0],
            virado:false,
            onClick:null
        };
    },
    render: function () {
        var style ={
            width:this.state.largura,
            height:this.state.altura,
            left:this.state.largura*this.state.index[1],
            top:this.state.altura*this.state.index[0]
        };
        var className = this.state.virado?'cartao':'cartao back';

        return (
            <div className="slot" style={style}>
                <div className={className} onClick={this.click}>
                    <img data-original={this.state.fundo} className="lazy back-image"/>
                    <img data-original={this.state.imagem} className="lazy front-image"/>
                    <span className="title">{this.state.titulo}</span>
                    <AudioPlayer src={this.state.som}/>
                </div>
            </div>
        );
    },
    click:function(){
        if(!this.state.bloqueado){
            if(_.isFunction(this.state.onClick)){
                this.state.onClick(this);
            }
        }
    }
});