var Modal = React.createClass({displayName: "Modal",
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
        onConfirm:React.PropTypes.func,
        onCancel:React.PropTypes.func,
        title:React.PropTypes.string,
        footer:React.PropTypes.bool,
        cancelText:React.PropTypes.string,
        confirmText:React.PropTypes.string,
        open:React.PropTypes.bool,
        confirm:React.PropTypes.bool,
        cancel:React.PropTypes.bool,
        confirmDisabled:React.PropTypes.bool,
        cancelDisabled:React.PropTypes.bool
    },
    getInitialState:function(){
        return {
            id:generateUUID(),
            zIndex:1,
            size:'',
            onClose:null,
            onConfirm:null,
            onCancel:null,
            title:'Modal',
            footer:true,
            cancelText:'cancel',
            confirmText:'confirm',
            open:false,
            confirm:true,
            cancel:true,
            confirmDisabled:false,
            cancelDisabled:false
        }
    },
    componentDidUpdate:function(){
        this.start();
    },
    start:function(){
        if(this.state.open){
            $('#'+this.state.id).modal();
        }
        else{
            $('#'+this.state.id).modal('hide');
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
    onConfirm:function(){
        if(_.isFunction(this.state.onConfirm)){
            this.state.onConfirm.apply(this,[this]);
        }
    },
    cancel:function(){
        if(_.isFunction(this.state.onCancel)){
            this.state.onCancel(this);
        }
    },
    close:function(){
        this.hide();
        if(_.isFunction(this.state.onClose)){
            this.state.onClose(this);
        }
    },
    render: function () {
        return (
            React.createElement("div", {className: "modal fade", id: this.state.id, style: {zIndex:this.state.layer}}, 
                React.createElement("div", {className: "modal-dialog" + ' ' + this.state.size}, 
                    React.createElement("div", {className: "modal-content"}, 
                        React.createElement("div", {className: "modal-header"}, 
                            React.createElement("button", {type: "button", className: "close", "aria-label": "Close", onClick: this.close}, 
                                React.createElement("span", {"aria-hidden": "true", className: "aria-hidden"}, "×")
                            ), 
                            React.createElement("h2", {className: "modal-title"}, this.state.title)
                        ), 
                        React.createElement("div", {className: "modal-body"}, 
                            this.props.children
                        ), 
                        React.createElement("div", {className: "modal-footer", style: !this.state.footer?{display:'none'}:{}}, 
                            React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.cancel, disabled: this.state.cancelDisabled}, this.state.cancelText), 
                            React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this.state.onConfirm, disabled: this.state.confirmDisabled}, this.state.confirmText)
                        )
                    )
                )
            )
        );
    }
});