define(['jquery'],function($){
    var Keys = {
        keySequence: [],
        allowedSequences:[],
        sequenceIs: function (sequence, ordered,exactLength) {
            ordered = ordered == undefined ? false : ordered;
            exactLength = exactLength == undefined?false:exactLength;
            if(exactLength && sequence.length != Keys.keySequence.length){
                return false;
            }

            for (var i = 0; i < sequence.length; i++) {
                if (ordered) {
                    if (sequence[i] != Keys.keySequence[i]) {
                        return false;
                    }
                }
                else {
                    if (Keys.keySequence.indexOf(sequence[i]) == -1) {
                        return false;
                    }
                }
            }

            return true;
        },
        allowOnly:function(){
            var self = this;
            var size = arguments.length;
            for(var i =0; i < size;i++){
                var sequence = arguments[i];
                self.allowedSequences.push(sequence);
            }
        },
        KEY_DOWN : 40,
        KEY_UP : 38,
        KEY_LEFT : 37,
        KEY_RIGHT : 39,
        KEY_END : 35,
        KEY_BEGIN : 36,
        KEY_BACK_TAB : 8,
        KEY_TAB : 9,
        KEY_SH_TAB : 16,
        KEY_ENTER : 13,
        KEY_ESC : 27,
        KEY_SPACE : 32,
        KEY_DEL : 46,
        KEY_A : 65,
        KEY_B : 66,
        KEY_C : 67,
        KEY_D : 68,
        KEY_E : 69,
        KEY_F : 70,
        KEY_G : 71,
        KEY_H : 72,
        KEY_I : 73,
        KEY_J : 74,
        KEY_K : 75,
        KEY_L : 76,
        KEY_M : 77,
        KEY_N : 78,
        KEY_O : 79,
        KEY_P : 80,
        KEY_Q : 81,
        KEY_R : 82,
        KEY_S : 83,
        KEY_T : 84,
        KEY_U : 85,
        KEY_V : 86,
        KEY_W : 87,
        KEY_X : 88,
        KEY_Y : 89,
        KEY_Z : 90,
        KEY_PLUS : 107,
        KEY_MINUS : 109,
        KEY_PF1 : 112,
        KEY_PF2 : 113,
        KEY_PF3 : 114,
        KEY_PF4 : 115,
        KEY_PF5 : 116,
        KEY_PF6 : 117,
        KEY_PF7 : 118,
        KEY_PF8 : 119,
        KEY_ALT : 17,
        KEY_ALT_GR : 18,
        KEY_SBL : 221,
        KEY_SBR : 220
    };

    $(document).on("keydown", function (e) {
        if (Keys.keySequence.indexOf(e.which) == -1) {
            Keys.keySequence.push(e.which);
        }
    });

    $(document).on("keydown",function(e){
        var size = Keys.allowedSequences.length;
        var allowed = false;
        for(var i = 0; i < size;i++){
            var sequence = Keys.allowedSequences[i];
            if(Keys.sequenceIs(sequence,false,true)){
                allowed = true;
            }
        }
        if(!allowed){
            e.preventDefault();
        }
    });

    $(document).on("keyup", function (e) {
        var index = Keys.keySequence.indexOf(e.which);
        if (index != -1) {
            Keys.keySequence.splice(index, 1);
        }
    });

    return Keys;
});
