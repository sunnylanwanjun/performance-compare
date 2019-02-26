cc.Class({
    extends:cc.Component,

    ctor () {
        this.maxX = cc.winSize.width / 2;
        this.maxY = cc.winSize.height / 2;
        this.minX = -this.maxX;
        this.minY = -this.maxY;

        this.sx = 3;
        this.sy = 3;
        this.dirx = 1;
        this.diry = 1;
    },

    update (dt) {
        if (this.node.x > this.maxX) this.dirx = -1;
        if (this.node.x < this.minX) this.dirx = 1;
        if (this.node.y > this.maxY) this.diry = -1;
        if (this.node.y < this.minY) this.diry = 1;
        this.node.x += this.sx*this.dirx;
        this.node.y += this.sy*this.diry;
    }
})