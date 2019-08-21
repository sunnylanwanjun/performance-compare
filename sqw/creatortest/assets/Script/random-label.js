const OriginLabel = '12345abcde一二三四五12345abcde一二三四五';
const OriginLength = OriginLabel.length / 2;

let random = function(from, end) {
    let min = Math.min(from, end);
    let max = Math.max(from, end);
    let range = max - min;
    return min + Math.random() * range;
}

const RandomArr = [];
for (let i = 0; i < 100; i ++){
    let a = random(0, OriginLength);
    let text = OriginLabel.substring(a, a + OriginLength);
    RandomArr.push(text);
}

cc.Class({
    extends:cc.Component,

    properties : {
        label : {
            type : cc.Label,
            default : null, 
        },
    },

    ctor () {
        this.index = 0;
    },

    update (dt) {
        this.index++;
        if (this.index > RandomArr.length) {
            this.index = 0;
        }
        this.label.string = RandomArr[this.index];
    }
})