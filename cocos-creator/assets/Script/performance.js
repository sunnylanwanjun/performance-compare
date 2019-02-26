var addCount = 10;
var delCount = 10;
cc.Class({
    extends: cc.Component,

    properties: {
        prefabArr:{
            default:[],
            type:cc.Prefab,
        },
        container:{
            type:cc.Node,
            default:undefined,
        },
        num : {
            type:cc.Label,
            default:undefined,
        }
    },

    start () {
        this.objArr = [];
        this.num.string = this.container.childrenCount;
    },

    add () {
        for (var i = 0;i < addCount;i++) {
            var node = cc.instantiate(this.prefabArr[i%this.prefabArr.length]);
            node.x = (Math.random() - 0.5) * cc.winSize.width;
            node.y = (Math.random() - 0.5) * cc.winSize.height;
            this.container.addChild(node);
            this.objArr.push(node);
        }
        this.num.string = this.container.childrenCount;
    },

    update () {
        if (this.count !== this.container.childrenCount) {
            this.count = this.container.childrenCount;
            this.num.string = this.count;
        }
    },

    del () {
        for (var i = 0;i < delCount;i++) {
            var node = this.objArr.pop();
            if (node) {
                node.destroy();
            }
        }
        this.num.string = this.container.childrenCount;
    },

    back () {
        cc.director.loadScene('start');
    }
});
