define(['react','ModalElement','RadioElement','UpdateMixin'],function(React,Modal,Radio,updateMixin){
    return React.createClass({
        mixins:[updateMixin],
        getInitialState:function(){
            return {
                open:false,
                onClose:null
            };
        },
        render:function(){
            var self = this;
            return (
                <Modal open={self.state.open} title="Novo Jogo" size="modal-sm" onClose={self.state.onClose}>
                    <Radio name="jogo" options={self.props.options} ref="radio"/>
                    <button className="btn btn-primary" onClick={self.onConfirm}>Abrir</button>
                </Modal>
            );
        },
        onConfirm:function(){
            var confirm = window.confirm('Tem certeza que deseja iniciar uma nova partida?');
            var radios = this.refs.radio.refs;
            var url = '';
            for(var index in radios){
                var node = React.findDOMNode(radios[index]);
                if($(node).is(':checked')){
                    url = $(node).val();
                    break;
                }
            }
            if(confirm){
                this.props.callback(url);
                this.setState({
                    open:false
                });
            }
        }
    });
});
