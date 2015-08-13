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
        left:React.PropTypes.number,
        top:React.PropTypes.number,
        index:React.PropTypes.array,
        virado:React.PropTypes.bool,
        onClick:React.PropTypes.func,
        ocupado:React.PropTypes.bool
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
            left:0,
            top:0,
            index:[0,0],
            virado:false,
            onClick:null,
            ocupado:false,
            color:'white',
            hideImage:true
        };
    },
    render: function () {
        var style ={
            width:this.state.largura,
            height:this.state.altura,
            left:this.state.left,
            top:this.state.top
        };
        var className = this.state.virado?'cartao':'cartao back';
        var imagem = "";
        if(!this.state.hideImage){
            imagem = this.state.imagem;
        }

        return (
            <div className="slot" style={style}>
                <div className={className} onClick={this.click}>
                    <img data-original={imagem} className="lazy front-image" ref="frontImage" src=""/>
                    <img data-original={this.state.fundo} className="lazy back-image" ref="backImage" src=""/>
                    <span className="title" style={{color:this.state.color}}>{this.state.titulo}</span>
                </div>
            </div>
        );
    },
    componentDidMount:function(){
        $(React.findDOMNode(this.refs.backImage)).lazyload({
            effect:"fadeIn"
        });
        $(React.findDOMNode(this.refs.frontImage)).lazyload({
            effect:"fadeIn"
        });
    },
    componentDidUpdate:function(){
        $(React.findDOMNode(this.refs.backImage)).lazyload();
        $(React.findDOMNode(this.refs.frontImage)).lazyload();
    },
    click:function(){
        if(!this.state.bloqueado && !this.state.ocupado){
            if(_.isFunction(this.state.onClick)){
                this.state.onClick(this.state.index);
            }
        }
    }
});