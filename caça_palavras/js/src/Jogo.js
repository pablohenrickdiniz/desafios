define(
    ['jquery','bootstrap','react','Tabela','ModalElement','RadioElement','NovoJogo','SetIntervalMixin','moment'],
    function($,bs,React,Tabela,Modal,Radio,NovoJogo,setIntervalMixin,moment){
        return React.createClass({
            mixins:[setIntervalMixin],
            getInitialState:function(){
                return {
                    tempo:moment('0000-01-01 00:00:00'),
                    titulo:'Dica'
                };
            },
            render:function(){
                var self = this;
                return (
                    <div className="jogo">
                        <div className="row">
                            <div className="col-md-4">
                                <span className="tempo">Tempo:<label>{self.state.tempo.format('HH:mm:ss')}</label></span>
                            </div>
                            <div className="col-md-4 text-center">
                                <h1>{self.state.titulo}</h1>
                            </div>
                        </div>
                        <div className="row">
                            <Tabela ref="tabela"/>
                        </div>
                    </div>
                );
            },
            componentWillMount:function(){
                this.iniciar('js/jogos/frutas.json');
                if(typeof this.props.capture == 'function'){
                    var capture =  this.props.capture;
                    capture(this);
                }
            },
            iniciar:function(url,titulo){
                var self = this;
                self.carregar(url, function (data) {
                    var tabela = self.refs.tabela;
                    self.setState({
                        tempo:moment('0000-01-01 00:00:00'),
                        titulo:titulo
                    },function(){
                        tabela.setState({
                            data:data,
                            selectingText:false,
                            startIndex:null,
                            endIndex:null,
                            checkedIntervals:[],
                            markStyles:[],
                            tmpMarkStyle:null,
                            paused:false
                        },function(){
                            tabela.encontradas = [];
                            tabela.start();
                            self.setInterval('tempo',function(){
                                var tempo = self.state.tempo;
                                tempo = tempo.add(1, 'seconds');
                                self.setState({
                                    tempo:tempo
                                });
                            },1000);
                        });
                    });
                });

            },
            carregar:function(url,callback){
                $.ajax({
                    url: url,
                    type: 'get',
                    dataType: 'json',
                    success: function (data) {
                        callback(data);
                    }
                });
            },
            pausar:function(){
                var self = this;
                var tabela = self.refs.tabela;
                tabela.setState({
                    paused:true
                },function(){
                    self.clearHashedInterval('tempo');
                });
            },
            continuar:function(){
                console.log('continuando...');
                var self = this;
                var tabela = self.refs.tabela;
                tabela.setState({
                    paused:false
                },function(){
                    self.setInterval('tempo',function(){
                        var tempo = self.state.tempo;
                        tempo = tempo.add(1, 'seconds');
                        self.setState({
                            tempo:tempo
                        });
                    },1000);
                });
            },
            novoJogo:function(){
                var self = this;
                var options = {
                    'Frutas': {
                        value:'js/jogos/frutas.json',
                        title:'Nome de Frutas'
                    },
                    'Arte':{
                        value :'js/jogos/arte.json',
                        title:'Obras de Arte'
                    }
                };
                self.pausar();

                React.render(
                    <NovoJogo options={options} callback={self.iniciar} open={true} onClose={self.continuar}/>,
                    document.getElementById('modal-container')
                );
            }
        });
    });