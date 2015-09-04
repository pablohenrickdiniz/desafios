define(['react','updateMixin','uuid'],function(React,updateMixin){
    var Modal = React.createClass({
        mixins:[updateMixin],
        options: {
            size: ['lg', 'md', 'sm'],
            position:[
                'top left',
                'top center',
                'top right',
                'center left',
                'center center',
                'center right',
                'bottom left',
                'bottom center',
                'bottom right'
            ]
        },
        propTypes:{
            id:React.PropTypes.string,
            zIndex:React.PropTypes.number,
            size:React.PropTypes.string,
            onClose:React.PropTypes.func,
            title:React.PropTypes.string,
            footer:React.PropTypes.bool,
            open:React.PropTypes.bool
        },
        getInitialState:function(){
            return {
                id:generateUUID(),
                zIndex:1,
                size:'',
                onClose:null,
                title:'Modal',
                footer:false,
                open:false
            }
        },
        componentDidUpdate:function(){
            this.start();
        },
        start:function(){
            var node =  React.findDOMNode(this.refs.modal);
            if(this.state.open){
                $(node).modal();
            }
            else{
                $(node).modal('hide');
            }
        },
        componentDidMount:function(){
            this.start();
        },
        hide:function(){
            this.setState({
                open:false
            });
        },
        close:function(){
            this.hide();
            if(_.isFunction(this.state.onClose)){
                this.state.onClose(this);
            }
        },
        render: function () {
            var footer = null;
            if(this.state.footer){
                footer = (
                    <div className="modal-footer">
                    </div>
                );
            }

            return (
                <div className="modal fade" id={this.state.id} style={{zIndex:this.state.layer}} ref="modal">
                    <div className={"modal-dialog" + ' ' + this.state.size}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" aria-label="Close" onClick={this.close}>
                                    <span aria-hidden="true" className="aria-hidden">&times;</span>
                                </button>
                                <h2 className="modal-title">{this.state.title}</h2>
                            </div>
                            <div className="modal-body">
                            {this.props.children}
                            </div>
                            {footer}
                        </div>
                    </div>
                </div>
            );
        }
    });
    return Modal;
});
