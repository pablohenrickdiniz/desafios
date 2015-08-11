var updateMixin = {
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

var setIntervalMixin = {
    componentWillMount: function () {
        this.intervals = [];
    },
    componentWillUnmount: function () {
        this.clearIntervals();
    },
    clearInterval: function (key) {
        clearInterval(this.intervals[key]);
    },
    clearIntervals:function(){
        this.intervals.forEach(function(interval){
            clearInterval(interval);
        });
    },
    setInterval: function (key, func, time) {
        var interval = setInterval.apply(self, [func, time]);
        if (key != null) {
            this.intervals.push(interval);
        }
        else {
            if(this.intervals[key] != undefined){
                clearInterval(this.intervals[key]);
            }
            this.intervals[key] = interval;
        }
    }
};