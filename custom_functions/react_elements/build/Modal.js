define(['react','UpdateMixin','uuid','jquery'],function(React,updateMixin,uuid,$){
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
            var self = this;
            self.start();
            var node =  React.findDOMNode(this.refs.modal);
            $(node).on('hidden.bs.modal', function (e) {
                self.close();
            })

        },
        close:function(){
            if(_.isFunction(this.state.onClose)){
                this.state.onClose(this);
            }
        },
        render: function () {
            var footer = null;
            if(this.state.footer){
                footer = (
                    React.createElement("div", {className: "modal-footer"}
                    )
                );
            }

            return (
                React.createElement("div", {className: "modal fade", id: this.state.id, style: {zIndex:this.state.layer}, ref: "modal"}, 
                    React.createElement("div", {className: "modal-dialog" + ' ' + this.state.size}, 
                        React.createElement("div", {className: "modal-content"}, 
                            React.createElement("div", {className: "modal-header"}, 
                                React.createElement("button", {type: "button", className: "close", "aria-label": "Close", "data-dismiss": "modal"}, 
                                    React.createElement("span", {"aria-hidden": "true", className: "aria-hidden"}, "×")
                                ), 
                                React.createElement("h2", {className: "modal-title"}, this.state.title)
                            ), 
                            React.createElement("div", {className: "modal-body"}, 
                            this.props.children
                            ), 
                            footer
                        )
                    )
                )
            );
        }
    });
    return Modal;
});
