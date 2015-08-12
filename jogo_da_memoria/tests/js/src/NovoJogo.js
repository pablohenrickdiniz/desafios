var NovoJogo = React.createClass({
    mixins:[updateMixin],
    getInitialState:function(){
        return {
            baralhos:[],
            open:false,
            onClose:null
        };
    },
    render:function(){
        var self = this;
        var items = self.state.baralhos.map(function(baralho,index){
            var click = function(e){
                e.preventDefault();
                self.itemClick(index);
            };
            return <li key={index}><a className="baralho-link" href="#" onClick={click}>{baralho.titulo}</a></li>;
        });

        return (
            <Modal title="Novo Jogo" size="modal-sm" open={self.state.open} onClose={this.state.onClose}>
                <ul>
                    {items}
                </ul>
            </Modal>
        );
    },
    itemClick:function(index){
        console.log(index);
        var item = this.state.baralhos[index];
        var url = item.url;
        var confirm = window.confirm('Tem certeza que deseja abandonar a partida atual e começar uma nova?');
        if(confirm){
            React.render(
                <Jogo baralhoUrl={item.url} reiniciar={true}/>,
                document.getElementById('jogo-container')
            );
            this.setState({
                open:false
            });
        }

    }
});