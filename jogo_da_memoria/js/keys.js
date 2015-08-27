const KEY_DOWN = 40;
const KEY_UP = 38;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_END = 35;
const KEY_BEGIN = 36;
const KEY_BACK_TAB = 8;
const KEY_TAB = 9;
const KEY_SH_TAB = 16;
const KEY_ENTER = 13;
const KEY_ESC = 27;
const KEY_SPACE = 32;
const KEY_DEL = 46;
const KEY_A = 65;
const KEY_B = 66;
const KEY_C = 67;
const KEY_D = 68;
const KEY_E = 69;
const KEY_F = 70;
const KEY_G = 71;
const KEY_H = 72;
const KEY_I = 73;
const KEY_J = 74;
const KEY_K = 75;
const KEY_L = 76;
const KEY_M = 77;
const KEY_N = 78;
const KEY_O = 79;
const KEY_P = 80;
const KEY_Q = 81;
const KEY_R = 82;
const KEY_S = 83;
const KEY_T = 84;
const KEY_U = 85;
const KEY_V = 86;
const KEY_W = 87;
const KEY_X = 88;
const KEY_Y = 89;
const KEY_Z = 90;
const KEY_PLUS = 107;
const KEY_MINUS = 109;
const KEY_PF1 = 112;
const KEY_PF2 = 113;
const KEY_PF3 = 114;
const KEY_PF4 = 115;
const KEY_PF5 = 116;
const KEY_PF6 = 117;
const KEY_PF7 = 118;
const KEY_PF8 = 119;
const KEY_ALT = 17;
const KEY_ALT_GR = 18;
const KEY_SBL = 221;
const KEY_SBR = 220;

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
    }
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

