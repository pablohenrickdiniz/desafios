define(['jquery','react','tabela'],function($,React,Tabela){
    $(document).ready(function(){
        React.render(
            <Tabela id="tabela" />,
            document.getElementById('tabela-container')
        );
    });
});