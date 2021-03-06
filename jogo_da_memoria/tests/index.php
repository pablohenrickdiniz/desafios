<!doctype html>
<?php include('react_compiler.php') ?>
<html lang="pt_BR">
<head>
    <meta charset="UTF-8">
    <title>Inicio</title>
    <link rel="stylesheet" href="../../bower_components/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="../css/memoria.css"/>
    <script type="text/javascript" src="../../bower_components/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" src="../../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../../bower_components/jquery.lazyload/jquery.lazyload.js"></script>
    <script type="text/javascript" src="../../bower_components/lodash/lodash.min.js"></script>
    <script type="text/javascript" src="../../bower_components/moment/min/moment-with-locales.min.js"></script>
    <script type="text/javascript" src="../../bower_components/react/react.js"></script>
    <script type="text/javascript" src="js/build/AudioPlayer.js"></script>
    <script type="text/javascript" src="js/build/Mixins.js"></script>
    <script type="text/javascript" src="js/build/Alert.js"></script>
    <script type="text/javascript" src="js/build/Modal.js"></script>
    <script type="text/javascript" src="js/build/AlertModal.js"></script>
    <script type="text/javascript" src="js/build/Matriz.js"></script>
    <script type="text/javascript" src="js/build/MatrizCartao.js"></script>
    <script type="text/javascript" src="js/build/Baralho.js"></script>
    <script type="text/javascript" src="js/build/Cartao.js"></script>
    <script type="text/javascript" src="js/build/Functions.js"></script>
    <script type="text/javascript" src="js/build/NovoJogo.js"></script>
    <script type="text/javascript" src="js/build/Opcoes.js"></script>
    <script type="text/javascript" src="js/build/Jogo.js"></script>
    <script type="text/javascript" src="js/build/Main.js"></script>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="btn-group jogo-opcoes" role="group">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                    Jogo
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="#" id="novo-jogo"> Novo Jogo</a></li>
                    <li><a href="#" id="opcoes">Opções</a></li>
                    <li><a href="#">Aparência</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="row" id="novo-jogo-container">

    </div>
    <div class="row" id="opcoes-container">
        <div class="modal fade" id="opcoes">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Opções</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="">Dificuldade</label><br/>
                            <input type="radio" name="dificuldade" value="1"/><label for="">Fácil</label>
                            <input type="radio" name="dificuldade" value="2" checked/><label for="">Normal</label>
                            <input type="radio" name="dificuldade" value="3"/><label for="">Médio</label>
                            <input type="radio" name="dificuldade" value="4"/><label for="">Difícil</label>
                        </div>
                        <div class="form-group">
                            <input type="checkbox" name="tempo"/>
                            <label for="">Contador de Tempo?</label>
                        </div>
                    </div>
                    <div class="modal-footer">jsx
                        <button class="btn btn-primary" id="confirmar-opcao">OK</button>
                    </div>
                </div><!-- /.modal-content -->ls
            </div><!-- /.modal-dialog -->
        </div>
    </div>

    <div id="jogo-container" class="container">

    </div>
    <div id="opcoes-container">

    </div>
    <div id="completo-container">

    </div>
    <div id="modal-carregar-container">

    </div>
</div>
</body>
</html>