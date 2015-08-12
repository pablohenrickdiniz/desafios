var Jogo = React.createClass({
    mixins: [updateMixin, setIntervalMixin],
    propTypes: {
        id: React.PropTypes.string,
        dificuldade: React.PropTypes.number,
        baralho: React.PropTypes.object,
        baralhoUrl: React.PropTypes.string,
        cartao: React.PropTypes.object,
        ocupado: React.PropTypes.bool,
        matriz: React.PropTypes.object,
        pausado: React.PropTypes.bool,
        totalCartoes: React.PropTypes.number,
        cartoesVirados: React.PropTypes.number
    },
    getInitialState: function () {
        return {
            id: generateUUID(),
            dificuldade: 3,
            baralho: null,
            baralhoUrl: '',
            cartao: null,
            ocupado: false,
            tempo: moment('0000-01-01 00:00:00'),
            matriz: new MatrizCartao(2, 2),
            pausado: false,
            cartoesVirados: 0,
            totalCartoes: 0,
            reiniciar: false,
            pausar:false
        };
    },
    componentDidUpdate: function () {
        if (this.state.reiniciar) {
            this.clearIntervals();
            this.setState({
                reiniciar: false,
                tempo:moment('0000-01-01 00:00:00')
            }, function () {
                this.carregarBaralho(function () {
                    this.iniciar();
                });
            });
        }
    },
    carregarBaralho: function (callback) {
        var self = this;
        $.ajax({
            url: self.state.baralhoUrl,
            type: 'post',
            dataType: 'json',
            success: function (options) {
                self.setState({
                    baralho: new Baralho(options)
                },function(){
                    callback.apply(self);
                });
            },
            error: function () {
                console.error('Verifique se a resposta está no formato json');
            }
        });
    },
    iniciar: function () {
        this.carregarMatriz();
        this.setState({
            tempo: moment('0000-01-01 00:00:00')
        });
        var self = this;
        this.setInterval('tick', function () {
            var tempo = self.state.tempo;
            var tempo = tempo.add(1, 'seconds');
            self.setState({
                tempo: tempo
            });
        }, 1000);
    },
    pausar: function () {
        this.clearIntervals();
        this.updateState({
            pausado: true
        });
    },
    componentDidMount: function () {
        this.carregarBaralho(function () {
            this.iniciar();
        });
    },
    carregarMatriz: function () {
        var self = this;
        if (self.state.baralho != null) {
            var matriz = new MatrizCartao(self.state.dificuldade * 2, self.state.dificuldade * 2);
            var max = self.state.dificuldade * 2 * self.state.dificuldade * 2;
            var count = 0;
            var pares = self.state.baralho.getPares();
            pares.suffle();
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
        return (
            <div id={this.state.id}>
                <div className="memoria-container row" style={style}>
                    {cartoes}
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="jogo-info">Tempo: {this.state.tempo.format('HH:mm:ss')}</span>
                        <AudioPlayer name="audio"/>
                    </div>
                </div>
            </div>
        );
    },
    reiniciar: function () {
        console.log('iniciar...');
        var self = this;
        var count = 1;
        var matriz = self.state.matriz;

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
    continuar: function () {
        var self = this;
        if (self.state.pausado) {
            this.setInterval('tick', function () {
                var tempo = null;
                tempo = self.state.tempo.add(1, 'seconds');
                self.setState({
                    tempo: tempo
                });
            }, 1000);
            self.setState({
                pausado: false
            });
        }
    },
    isCompleto: function () {
        var self = this;
        var count = 0;
        self.state.matriz.forEach(function (cartao) {
            if (cartao instanceof  Object) {
                count += cartao.bloqueado ? 1 : 0;
            }
        });
        return count == self.state.totalCartoes;
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
                    self.updateState({
                        cartao: cartao,
                        matriz: matriz,
                        ocupado: false
                    });
                }
                else if (self.state.cartao != cartao) {
                    cartao.virado = true;
                    var callback = function () {
                        setTimeout(function () {
                            if (self.state.cartao.par == cartao.id || cartao.par == self.state.cartao.id) {
                                cartao.bloqueado = true;
                                self.setState({
                                    cartao: null,
                                    matriz: matriz
                                }, function () {
                                    self.setState({ocupado: false});
                                    if (self.isCompleto()) {
                                        self.pausar();
                                        var props = {
                                            id: 'alert-modal',
                                            open: true,
                                            message: <span className="jogo-info">Tempo: {self.state.tempo.format('HH:mm:ss')}</span>,
                                            size: 'modal-sm',
                                            type: 'info',
                                            title: 'Jogo Completo!',
                                            onClose: self.reiniciar
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
                                setTimeout(function () {
                                    cartao.virado = false;
                                    cartao.bloqueado = false;
                                    self.state.cartao.bloqueado = false;
                                    self.setState({
                                        matriz: matriz,
                                        cartao: null,
                                        ocupado: false
                                    });
                                }, 200);
                            }
                        }, 1000);
                    };

                    self.setState({
                        matriz: matriz
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