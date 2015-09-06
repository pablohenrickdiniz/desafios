define(['react','UpdateMixin'],function(React,updateMixin){
    var Radio = React.createClass({displayName: "Radio",
        mixins:[updateMixin],
        getInitialState:function(){
            return {
                options:{},
                name:'',
                checked:null
            };
        },

        render:function(){
            var self = this;
            var inputs = [];
            var options = self.state.options;
            Object.keys(options).forEach(function(name,index){
                var option = options[name];
                var checked = (self.state.checked == null && index == 0)||(self.state.checked == option.value);
                inputs.push(
                    React.createElement("div", {className: "radioGroup", key: index}, 
                        React.createElement("input", React.__spread({name: self.state.name},  option, {type: "radio", defaultChecked: checked, ref: 'radio'+index, onChange: self.check})), 
                        React.createElement("label", {htmlFor: self.state.name}, name)
                    )
                );
            });

            return (
                React.createElement("div", {className: "inputGroup"}, 
                    inputs
                )
            );
        },
        check:function(e){
            this.setState({
                checked:e.target.value
            });
        }
    });
    return Radio;
});


