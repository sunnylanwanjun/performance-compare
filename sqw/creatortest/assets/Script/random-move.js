cc.Class({
    extends:cc.Component,

    ctor () {
        this.maxX = cc.winSize.width / 2;
        this.maxY = cc.winSize.height / 2;
        this.minX = -this.maxX;
        this.minY = -this.maxY;

        this.sx = 3;
        this.sy = 3;
        this.dirX = Math.random() > 0.5 ? -1 : 1;
        this.dirY = Math.random() > 0.5 ? -1 : 1;
    },

    update (dt) {
        let node = this.node;
        if (node.x > this.maxX) this.dirX = -1;
        if (node.x < this.minX) this.dirX = 1;
        if (node.y > this.maxY) this.dirY = -1;
        if (node.y < this.minY) this.dirY = 1;
        node.x += this.sx * this.dirX;
        node.y += this.sy * this.dirY;
    }
})