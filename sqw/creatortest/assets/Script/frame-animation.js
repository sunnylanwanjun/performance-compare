cc.Class({
    extends:cc.Component,

    properties:{
        spriteFrameArray:{
            type:[cc.SpriteFrame],
            default:[],
        },
        frameIntervalTime:0,
    },

    start () {
        this.accumulateTime = 0;
        this.frameIndex = 1;
        this.sprite = this.node.getComponent(cc.Sprite);
        this.sprite.spriteFrame = this.spriteFrameArray[0];
    },

    update (dt) {
        this.accumulateTime += dt;
        if (this.accumulateTime < this.frameIntervalTime) {
            return;
        }
        let frameArr = this.spriteFrameArray;
        if (this.frameIndex >= frameArr.length) {
            this.frameIndex = 0;
        }
        this.accumulateTime = 0;
        let sp = this.sprite;
        sp.spriteFrame = frameArr[this.frameIndex];
        this.frameIndex++;
    }
})