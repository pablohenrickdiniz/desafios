define(function(){
    return {
        intervals:[],
        hashedIntervals:[],
        componentWillUnmount: function () {
            this.clearIntervals();
        },
        clearInterval: function (index) {
            clearInterval(this.intervals[index]);
            this.intervals.splice(index,1);
        },
        clearHashedInterval:function(key){
            clearInterval(this.hashedIntervals[key]);
            delete this.hashedIntervals[key];
        },
        clearIntervals:function(){
            var self = this;
            self.intervals.forEach(function(interval){
                clearInterval(interval);
            });
            self.hashedIntervals.forEach(function(interval){
                clearInterval(interval);
            });
        },
        setInterval: function (key, func, time) {
            var self = this;
            var interval = setInterval(func,time);
            if (key == null) {
                self.intervals.push(interval);
            }
            else {
                if(self.hashedIntervals[key] != undefined){
                    self.clearHashedInterval(key);
                }
                self.hashedIntervals[key] = interval;
            }
        }
    };
});
