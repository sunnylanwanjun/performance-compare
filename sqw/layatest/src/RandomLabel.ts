const OriginLabel = '12345abcde一二三四五12345abcde一二三四五';
const OriginLength = OriginLabel.length / 2;

let random = function(from: number, end: number): number {
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

export class RandomLabel extends Laya.Script {
    
    private _index : number = 0;

    constructor() { 
        super();
    }

    onUpdate () {
        let label = this.owner as Laya.Label;
        this._index++
        if (this._index >= RandomArr.length) {
            this._index = 0;
        };
        label.text = RandomArr[this._index];
    }
}