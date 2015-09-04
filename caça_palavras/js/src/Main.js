require(['jquery','bootstrap','react','tabela','ModalElement','RadioElement'],function($,bs,React,Tabela,Modal,Radio){
    $(document).ready(function(){
       iniciar();
        $('#novo-jogo').click(function(){
            novoJogo();
        });
    });

    function iniciar(){
        carregar('js/jogos/frutas.json',function(data){
            React.render(
                <Tabela id="tabela" data={data}/>,
                document.getElementById('tabela-container')
            );
        });

    }

    function carregar(url,callback){
        $.ajax({
            url:url,
            type:'get',
            dataType:'json',
            success:function(data){
                callback(data);
            }
        });
    }

    function novoJogo(){
        var options = {
            'Frutas':'jogos/frutas.json',
            'Frutas2':'jogos/frutas.json'
        };

        React.render(
            <Modal open={true} title="Novo Jogo">
                <Radio name="jogo" options={options}/>
            </Modal>,
            document.getElementById('modal-container')
        );
    }
});