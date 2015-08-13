var Opcoes = React.createClass({
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
            <Modal title="Opções" open={this.state.open} onClose={this.state.onClose} confirmText="OK" size="modal-sm" onConfirm={this.confirm}>
                <div className="form-group">
                    <label>Dificuldade</label><br />
                    <input type="radio" name="dificuldade" value="1" checked={dificuldade==1} onChange={this.onChange}/>
                    <label>Fácil</label>
                    <input type="radio" name="dificuldade" value="2" checked={dificuldade==2}  onChange={this.onChange}/>
                    <label>Normal</label>
                    <input type="radio" name="dificuldade" value="3" checked={dificuldade==3} onChange={this.onChange}/>
                    <label>Médio</label>
                    <input type="radio" name="dificuldade" value="4" checked={dificuldade==4} onChange={this.onChange}/>
                    <label>Difícil</label>
                </div>
            </Modal>
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
                <Jogo dificuldade={self.state.dificuldade} mudarDificuldade={true}/>,
                document.getElementById('jogo-container')
            );
        });
    }
});