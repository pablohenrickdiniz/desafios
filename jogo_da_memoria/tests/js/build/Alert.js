var Alert = React.createClass({displayName: "Alert",
    render:function(){
        return (
            React.createElement("div", {className: 'alert alert-'+this.props.type, style: {display:this.props.show?'block':'none'}}, 
                this.props.message
            )
        );
    }
});