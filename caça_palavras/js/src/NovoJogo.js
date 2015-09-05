define(['react','ModalElement','RadioElement','./Main'],function(React,Modal,Radio,Main){
    var NovoJogo = React.createClass({
        render:function(){
            var self = this;
            return (
                <Modal open={true} title="Novo Jogo">
                    <Radio name="jogo" options={self.props.options} ref="radio"/>
                    <button className="btn btn-primary" onClick={self.onConfirm}>Abrir</button>
                </Modal>
            );
        },
        onConfirm:function(){
            var confirm = window.confirm('Tem certeza que deseja iniciar uma nova partida?');
            var url = React.findDOMNode(this.refs.radio.refs.checked).value;
            console.log(Main);
            if(confirm){
                Main.iniciar(url);
            }
        }
    });
    return NovoJogo;
});
