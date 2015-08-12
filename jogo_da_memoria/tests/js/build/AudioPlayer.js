var AudioPlayer = React.createClass({displayName: "AudioPlayer",
    mixins:[updateMixin],
    getInitialState:function(){
        return {
            id:generateUUID(),
            src:'',
            play:false
        }
    },
    render:function(){
        return (
            React.createElement("audio", {id: this.state.id, src: this.state.src, name: "player"})
        );
    }
});