var AlertModal = React.createClass({displayName: "AlertModal",
    sizes:['sm','md','lg'],
    mixins:[updateMixin],
    getInitialState:function(){
        return {
            id:'',
            title:'Alert Message',
            onConfirm:null,
            open:false,
            message:'',
            type:'info',
            size:'modal-sm',
            layer:1,
            confirmText:"Sim",
            cancelText:"Não",
            show:true,
            onClose:null
        }
    },
    render:function(){
        var modal_props = {
            id:this.state.id,
            title:this.state.title,
            onConfirm:this.state.onConfirm,
            confirmText:this.state.confirmText,
            cancelText:this.state.cancelText,
            open:this.state.open,
            size:this.state.size,
            layer:this.state.layer,
            onClose:this.state.onClose
        };

        var alert_props = {
            message:this.state.message,
            type:this.state.type,
            show:this.state.show
        };

        return (
            React.createElement(Modal, React.__spread({},  modal_props), 
                React.createElement(Alert, React.__spread({},  alert_props))
            )
        );
    }
});