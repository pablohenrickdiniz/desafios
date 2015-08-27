define(['jquery','react','tabela'],function($,React,Tabela){
    $(document).ready(function(){
       iniciar();
    });


    function iniciar(){
        carregar('js/jogos/frutas.json',function(data){
            React.render(
                React.createElement(Tabela, {id: "tabela", data: data}),
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
});