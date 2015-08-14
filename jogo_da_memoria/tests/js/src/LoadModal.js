var LoadModal = React.createClass({
    mixins:[updateMixin],
    getInitialState:function(){
        return {
            progress:0,
            open:true,
            message:''
        };
    },
    render:function(){
        return (
            <Modal title="Carregando..." open={this.state.open} footer={false} close={false}>
                <div className="form-group">
                    {this.state.message}
                </div>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="100" style={{width:this.state.progress+'%'}}>
                    {this.state.progress}%
                    </div>
                </div>
            </Modal>
        );
    }
});