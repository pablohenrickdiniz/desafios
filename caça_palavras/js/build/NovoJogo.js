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
                React.createElement(Modal, {open: self.state.open, title: "Novo Jogo", size: "modal-sm", onClose: self.state.onClose}, 
                    React.createElement(Radio, {name: "jogo", options: self.props.options, ref: "radio"}), 
                    React.createElement("button", {className: "btn btn-primary", onClick: self.onConfirm}, "Abrir")
                )
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
                var title = $(node).attr('title');
                this.props.callback(url,title);
                this.setState({
                    open:false
                });
            }
        }
    });
});
