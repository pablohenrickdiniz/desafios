define(['jquery','bootstrap','react','tabela','ModalElement','RadioElement','./NovoJogo'],function($,bs,React,Tabela,Modal,Radio,NovoJogo){
    var Main = {
        iniciar: function (url) {
            this.carregar(url, function (data) {
                React.render(
                    <Tabela id="tabela" data={data}/>,
                    document.getElementById('tabela-container')
                );
            });
        },
        carregar: function (url,callback) {
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                success: function (data) {
                    callback(data);
                }
            });
        },
        novoJogo: function () {
            var options = {
                'Frutas': 'jogos/frutas.json',
                'Arte': 'jogos/arte.json'
            };

            React.render(
                <NovoJogo options={options}/>,
                document.getElementById('modal-container')
            );
        }
    };
    return Main;
});