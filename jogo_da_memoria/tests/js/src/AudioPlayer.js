var AudioPlayer = React.createClass({
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
            <audio id={this.state.id} src={this.state.src} name="player" />
        );
    }
});