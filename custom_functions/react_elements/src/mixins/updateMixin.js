define(['lodash'],function(){
    return {
        componentWillMount: function () {
            this.updateState(this.props);
        },
        updateState: function (props,callback) {
            var self = this;
            var state = {};
            for (var index in props) {
                if (this.state[index] == undefined || !_.isEqual(props[index], this.state[index])) {
                    state[index] = props[index];
                }
            }
            if (!_.isEmpty(state)) {
                this.setState(state,callback);
            }
        },
        componentWillReceiveProps: function (props) {
            this.updateState(props);
        }
    };
});

