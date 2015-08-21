var LoadModal = React.createClass({displayName: "LoadModal",
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
            React.createElement(Modal, {title: "Carregando...", open: this.state.open, footer: false, close: false}, 
                React.createElement("div", {className: "form-group"}, 
                    this.state.message
                ), 
                React.createElement("div", {className: "progress"}, 
                    React.createElement("div", {className: "progress-bar", role: "progressbar", "aria-valuenow": this.state.progress, "aria-valuemin": "0", "aria-valuemax": "100", style: {width:this.state.progress+'%'}}, 
                    this.state.progress, "%"
                    )
                )
            )
        );
    }
});