define(['react','updateMixin'],function(React,updateMixin){
    var Radio = React.createClass({
        mixins:[updateMixin],
        getInitialState:function(){
            return {
                options:{},
                name:'',
                checked:null,
                ref:'radio'
            };
        },
        render:function(){
            var self = this;
            var inputs = [];
            var options = self.state.options;
            Object.keys(options).forEach(function(name,index){
                var value = options[name];
                var checked = (self.state.checked == null && index == 0)||(self.state.checked == value)
                var ref = index;
                if(checked){
                    ref = 'checked';
                }
                inputs.push(
                    <div className="radioGroup" key={index}>
                        <input name={self.state.name} type="radio" val={value} defaultChecked={checked} ref={ref} onChange={self.check}/>
                        <label htmlFor={self.state.name}>{name}</label>
                    </div>
                );
            });

            return (
                <div className="inputGroup">
                    {inputs}
                </div>
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


