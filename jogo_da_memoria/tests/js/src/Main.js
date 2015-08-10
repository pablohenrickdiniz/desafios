$(document).ready(function(){
    React.render(
        <Jogo dificuldade={1} baralhoUrl="../baralhos/frutas.json"/>,
        document.getElementById('jogo-container')
    );
});

$(document).bind('DOMNodeInserted', function(e) {
    var element = e.target;
    var imgs = $(element).find('img.lazy');
    $(imgs).lazyload({
        effect:'fadeIn'
    });
});