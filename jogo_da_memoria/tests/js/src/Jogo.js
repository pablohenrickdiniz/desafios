var Jogo = React.createClass({
    mixins: [updateMixin, setIntervalMixin],
    getInitialState: function () {
        return {
            id: generateUUID(),
            dificuldade: 2,
            baralho: null,
            baralhoUrl: '',
            cartao: null,
            ocupado: false,
            tempo: moment('0000-01-01 00:00:00'),
            matriz: new MatrizCartao(2, 2),
            pausado: false,
            cartoesVirados: 0,
            totalCartoes: 0,
            mudarDificuldade: false,
            novoJogo: false,
            tentativas: 0
        };
    },
    carregarBaralho: function (callback) {
        var self = this;
        $.ajax({
            url: self.state.baralhoUrl,
            type: 'post',
            dataType: 'json',
            success: function (options) {
                var baralho = new Baralho(options);
                React.render(
                    <LoadModal progress={0} open={true} message="carregando imagens..."/>,
                    document.getElementById('carregar-modal-container')
                );
                var cartoes = baralho.cartoes;
                var imagens = cartoes.map(function(cartao){
                    return cartao.imagem;
                });
                imagens.push(options.fundo);
                var audios = [
                    options.sons.viraCarta,
                    options.sons.parEncontrado
                ];


                ResourceLoader.loadImages(imagens,function(progress){
                    React.render(
                        <LoadModal progress={progress} message="carregando imagens..."/>,
                        document.getElementById('carregar-modal-container')
                    );
                },function(){
                    ResourceLoader.loadAudios(audios,function(progress){
                        React.render(
                            <LoadModal progress={progress} message="carregando efeitos sonoros..."/>,
                            document.getElementById('carregar-modal-container')
                        );
                    },function(){
                        React.render(
                            <LoadModal progress={100} message="carregamento concluído!" open={false}/>,
                            document.getElementById('carregar-modal-container')
                        );
                        self.setState({
                            baralho:baralho
                        },function(){
                            callback.apply(self);
                        });
                    });
                });
            },
            error: function () {
                console.error('Verifique se a resposta está no formato json');
            }
        });
    },
    iniciar: function () {
        var self = this;
        self.clearIntervals();
        self.carregarMatriz();
        self.setState({
            tempo: moment('0000-01-01 00:00:00'),
            pausado: false,
            tentativas: 0,
            cartoesVirados: 0
        });
        this.setInterval('tick', function () {
            if (!self.state.pausado) {
                var tempo = self.state.tempo;
                tempo = tempo.add(1, 'seconds');
                self.setState({
                    tempo: tempo
                });
            }
        }, 1000);
    },
    pausar: function () {
        this.updateState({
            pausado: true
        });
    },
    continuar: function () {
        this.updateState({
            pausado: false
        });
    },
    componentDidUpdate: function () {
        var self = this;
        if (self.state.mudarDificuldade || self.state.novoJogo) {
            self.setState({
                mudarDificuldade: false,
                novoJogo: false
            }, function () {
                self.carregarBaralho(function () {
                    self.iniciar();
                });
            });
        }
        if (self.state.playAudio) {
            self.setState({
                playAudio: false
            });
        }
    },
    componentDidMount: function () {
        this.carregarBaralho(function () {
            this.iniciar();
        });
    },
    carregarMatriz: function () {
        var self = this;
        if (self.state.baralho != null) {
            var pares = self.state.baralho.getPares();
            pares.suffle();

            var max_dificuldade = self.state.baralho.getMaxDificuldade();
            var dificuldade = self.state.dificuldade <= max_dificuldade ? self.state.dificuldade : max_dificuldade;

            var matriz = new MatrizCartao(dificuldade * 2, dificuldade * 2);
            var max = dificuldade * 2 * dificuldade * 2;
            var count = 0;
            pares.forEach(function (par) {
                if (count < max - 1) {
                    matriz.add(par.cartaoA);
                    matriz.add(par.cartaoB);
                    count += 2;
                }
            });
            matriz.suffle();
            self.updateState({
                matriz: matriz,
                totalCartoes: count
            });
        }
    },
    render: function () {
        var self = this;
        var altura = 0;
        var largura = 0;
        if (self.state.baralho != null) {
            altura = self.state.baralho.altura;
            largura = self.state.baralho.largura;
        }

        var style = {
            height: altura * self.state.matriz.rows + 10,
            width: largura * self.state.matriz.cols + 10
        };

        var cartoes = [];

        self.state.matriz.forEach(function (cartao, index) {
            if (_.isObject(cartao)) {
                var key = index[0] + '-' + index[1];
                var left = 0;
                var top = 1;
                if (cartao.left == undefined && cartao.top == undefined) {
                    cartao.left = largura * index[1];
                    cartao.top = altura * index[0];
                }

                cartoes.push(<Cartao {...cartao} key={key} index={index} altura={altura} largura={largura} onClick={self.selecionarCartao} ocupado={self.state.ocupado}/>);
            }
        });


        var time = "";
        var container = "";
        if(cartoes.length > 0){
            time =     <div className="row">
                <div className="col-md-12">
                    <span className="jogo-info">Tempo: {this.state.tempo.format('HH:mm:ss')}</span>
                </div>
            </div>;
            container =    <div className="memoria-container row" style={style}>{cartoes}</div>;
        }

        return (
            <div id={this.state.id}>
                {time}
                {container}
            </div>
        );
    },
    reiniciar: function (modal) {
        modal.setState({
            open:false
        });
        console.log('iniciar...');
        var self = this;
        var count = 1;
        var matriz = self.state.matriz;
        self.pausar();
        matriz.recursiveFor(0, 0, function (cartao, index, matriz) {
            if (cartao instanceof Object) {
                cartao.virado = false;
            }
            self.setState({
                matriz: matriz
            });
        }, function () {
            setTimeout(function () {
                var matriz = self.state.matriz;
                matriz.recursiveFor(0, 0, function (cartao, index, matriz) {
                    var rand_i = Math.floor(Math.random() * matriz.rows);
                    var rand_j = Math.floor(Math.random() * matriz.cols);
                    var cartaoA = matriz.get(rand_i, rand_j);
                    var cartaoB = matriz.get(index[0], index[1]);
                    if (cartaoA instanceof Object && cartaoB instanceof Object) {
                        /*
                         matriz.set(index[0], index[1], cartaoA);
                         matriz.set(rand_i, rand_j, cartaoB);*/

                        var left_a = cartaoA.left;
                        var top_a = cartaoA.top;
                        var left_b = cartaoB.left;
                        var top_b = cartaoB.top;

                        cartaoA.left = left_b;
                        cartaoA.top = top_b;
                        cartaoB.left = left_a;
                        cartaoB.top = top_a;
                        self.setState({
                            matriz: matriz
                        });
                    }
                }, function (matriz) {
                    matriz = matriz.map(function (cartao) {
                        cartao.bloqueado = false;
                        return cartao;
                    });
                    self.setState({
                        matriz: matriz,
                        tempo: moment('0000-01-01 00:00:00'),
                        cartao: null,
                        cartoesVirados: 0,
                        ocupado: false
                    }, function () {
                        setTimeout(function () {
                            self.continuar();
                        }, 200);
                    });
                }, 200);
            }, 600);
        }, 200);
    },
    isCompleto: function () {
        var self = this;
        return self.state.cartoesVirados == self.state.totalCartoes;
    },
    selecionarCartao: function (index) {
        var self = this;
        if (!self.state.ocupado && !self.state.pausado) {
            self.setState({
                ocupado: true
            }, function () {
                var matriz = self.state.matriz;
                var cartao = matriz.get(index[0], index[1]);
                if (self.state.cartao == null) {
                    console.log('primero passo');
                    cartao.bloqueado = true;
                    cartao.virado = true;
                    cartao.hidden = false;
                    _Audio.getChannel('a').play(self.state.baralho.sons.viraCarta);
                    self.updateState({
                        cartao: cartao,
                        matriz: matriz,
                        ocupado: false
                    });
                }
                else if (self.state.cartao != cartao) {
                    _Audio.getChannel('b').play(self.state.baralho.sons.viraCarta);
                    cartao.virado = true;
                    cartao.hidden = false;
                    var callback = function () {
                        setTimeout(function () {
                            if (self.state.cartao.par == cartao.id || cartao.par == self.state.cartao.id) {
                                cartao.bloqueado = true;
                                _Audio.getChannel('par').play(self.state.baralho.sons.parEncontrado);
                                self.setState({
                                    cartao: null,
                                    matriz: matriz,
                                    cartoesVirados: self.state.cartoesVirados + 2
                                }, function () {
                                    self.setState({ocupado: false});
                                    if (self.isCompleto()) {
                                        self.pausar();

                                        var props = {
                                            id: 'alert-modal',
                                            open: true,
                                            message: <div className="form-group">
                                                <span className="jogo-info">
                                                Tempo: {self.state.tempo.format('HH:mm:ss')}
                                                </span>
                                                <br />
                                                <span className="jogo-info">
                                                Tentativas: {self.state.tentativas}
                                                </span>
                                            </div>,
                                            size: 'modal-sm',
                                            type: 'info',
                                            title: 'Jogo Completo!',
                                            confirmText: "Continuar",
                                            onConfirm:self.reiniciar,
                                            footer:true
                                        };
                                        React.render(
                                            <AlertModal {...props}/>,
                                            document.getElementById('completo-container')
                                        );
                                    }
                                });
                            }
                            else {
                                self.state.cartao.virado = false;
                                self.setState({
                                    matriz: matriz
                                });
                                _Audio.getChannel('c').play(self.state.baralho.sons.viraCarta);
                                setTimeout(function () {
                                    cartao.virado = false;
                                    cartao.bloqueado = false;
                                    var aux = self.state.cartao;
                                    aux.bloqueado = false;
                                    _Audio.getChannel('d').play(self.state.baralho.sons.viraCarta);
                                    self.setState({
                                        matriz: matriz,
                                        cartao: null,
                                        ocupado: false
                                    }, function () {
                                        setTimeout(function () {
                                            aux.hidden = true;
                                            cartao.hidden = true;
                                            self.setState({
                                                matriz: matriz
                                            });
                                        }, 250);
                                    });
                                }, 200);
                            }
                        }, 1000);
                    };

                    self.setState({
                        matriz: matriz,
                        tentativas: self.state.tentativas + 1
                    }, callback);
                }
                else {
                    console.log('mesmo cartao!');
                    self.setState({ocupado: false});
                }
            });
        }
    }
});