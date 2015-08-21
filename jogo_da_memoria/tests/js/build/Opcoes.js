var Opcoes = React.createClass({displayName: "Opcoes",
    mixins:[updateMixin],
    getInitialState:function(){
        return {
            dificuldade:2,
            open:false,
            onClose:null
        }
    },
    render:function(){
        var dificuldade = this.state.dificuldade;
        return (
            React.createElement(Modal, {title: "Opções", open: this.state.open, onClose: this.state.onClose, confirmText: "OK", size: "modal-sm", onConfirm: this.confirm}, 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", null, "Dificuldade"), React.createElement("br", null), 
                    React.createElement("input", {type: "radio", name: "dificuldade", value: "1", checked: dificuldade==1, onChange: this.onChange}), 
                    React.createElement("label", null, "Fácil"), 
                    React.createElement("input", {type: "radio", name: "dificuldade", value: "2", checked: dificuldade==2, onChange: this.onChange}), 
                    React.createElement("label", null, "Normal"), 
                    React.createElement("input", {type: "radio", name: "dificuldade", value: "3", checked: dificuldade==3, onChange: this.onChange}), 
                    React.createElement("label", null, "Médio"), 
                    React.createElement("input", {type: "radio", name: "dificuldade", value: "4", checked: dificuldade==4, onChange: this.onChange}), 
                    React.createElement("label", null, "Difícil")
                )
            )
        );
    },
    onChange:function(e){
        var val = parseInt(e.target.value);
        this.setState({
            dificuldade:val
        });
    },
    confirm:function(){
        var self = this;
        this.setState({
            open:false
        },function(){
            React.render(
                React.createElement(Jogo, {dificuldade: self.state.dificuldade, mudarDificuldade: true}),
                document.getElementById('jogo-container')
            );
        });
    }
});