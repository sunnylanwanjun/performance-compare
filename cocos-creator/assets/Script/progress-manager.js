const progressCtrl = require("./progress-ctrl")

cc.Class({
    extends: cc.Component,

    properties: {
        progressNode: {
            type: cc.Node,
            default: null
        },
        textNode: {
            type: cc.Node,
            default: null
        },
        progress: {
            type: cc.Node,
            default: null
        },
        curNum: {
            type: cc.Label,
            default: null
        },
        onceNum: 10
    },

    onEnable () {
        this.node.on('touchend', function () {
            this.randomBar();
        }, this);

        this.num = 0;
    },

    randomBar () {
        for (let i = 0; i < this.onceNum; i++) {
            let pNode = cc.instantiate(this.progress);
            let ctrl = pNode.getComponent(progressCtrl);
            let tNode = new cc.Node();
            let text = tNode.addComponent(cc.Label);
            tNode.color = cc.Color.GREEN;
            text.fontSize = 20;
            text.cacheMode = cc.Label.CacheMode.CHAR;
            ctrl.text = text;

            let x = (Math.random() - 0.5) * cc.winSize.width;
            let y = (Math.random() - 0.5) * cc.winSize.height;

            this.progressNode.addChild(pNode);
            pNode.active = true;
            pNode.setPosition(x, y);

            this.textNode.addChild(tNode);
            tNode.setPosition(x + 50, y);
        }

        this.num += this.onceNum;
        this.curNum.string = this.num;
    },

    back () {
        cc.director.loadScene('start');
    }
});
