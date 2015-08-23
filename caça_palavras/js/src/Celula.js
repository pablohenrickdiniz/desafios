define(['react','text','lodash'],function(React,Text,_){
    return React.createClass({
        getInitialState:function(){
            return {
                state:'default',
                checked:false,
                value:'',
                mouseIn:false
            };
        },
        getDefaultProps:function(){
            return {
                onClick:null,
                index:[],
                parent:null
            }
        },
        componentWillMount:function(){
            var state = {};
            if(this.props.value != undefined){
                state.value = this.props.value;
            }

            if(this.state.mouseIn){
                state.state = 'hover';
            }
            else{
                state.state = this.props.state;
            }
            this.setState(state);
        },
        componentWillReceiveProps:function(props){
            var state = {};
            if(props.value != undefined){
                state.value = props.value;
            }

            if(!this.state.checked) {
                if (this.state.mouseIn) {
                    state.state = 'hover';
                }
                else {
                    state.state = props.state;
                }
            }
            else{
                state.state = 'checked';
            }

            this.setState(state);
        },
        render:function(){
            var props = {
                className:this.state.state,
                onClick:this.onClick,
                onMouseEnter:this.onMouseIn,
                onMouseOut:this.onMouseOut
            };

            return (
                <td {...props}>{this.state.value}</td>
            );
        },
        onClick:function(e){
            if(_.isFunction(this.props.onClick)){
                this.props.onClick(this,e);
            }
        },
        onMouseIn:function(){
            this.setState({
                mouseIn:true
            },function(){
                this.props.parent.setState({
                    endIndex:this.props.index
                });
            });

        },
        onMouseOut:function(){
            this.setState({
                mouseIn:false
            });
        }
    });
});