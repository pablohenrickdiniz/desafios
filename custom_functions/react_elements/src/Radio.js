define(['react','updateMixin'],function(React,updateMixin){
    var Radio = React.createClass({
        mixins:[updateMixin],
        getInitialState:function(){
            return {
                options:{},
                name:''
            };
        },
        render:function(){
            var self = this;
            var inputs = [];
            var options = self.state.options;
            Object.keys(options).forEach(function(name,index){
                var value = options[name];
                inputs.push(
                    <div className="radioGroup" key={index}>
                        <input name={self.state.name} type="radio" val={value}/>
                        <label htmlFor={self.state.name}>{name}</label>
                    </div>
                );
            });

            return (
                <div className="inputGroup">
                    {inputs}
                </div>
            );
        }
    });
    return Radio;
});


