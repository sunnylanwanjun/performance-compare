var addCount = 100;
var delCount = 100;
cc.Class({
    extends: cc.Component,

    properties : {
        prefabArr : {
            default : [],
            type : cc.Prefab,
        },
        container : {
            type : cc.Node,
            default : undefined,
        },
        num : {
            type : cc.Label,
            default : undefined,
        },
        tilte : {
            type : cc.Label,
            default : undefined,
        }
    },

    start () {
        this.objArr = [];
        this.num.string = "0";
        this.tilte.string = cc.curScene;
        this.sceneType = 0;
        switch (cc.curScene) {
            case "skeleton-test":
                this.sceneType = 0;
                break;
            case "sprite-test":
                this.sceneType = 1;
                break;
            case "ui-test":
                this.sceneType = 2;
                break;
        }
        this.add();
    },

    add () {
        for (var i = 0;i < addCount;i++) {
            var node = cc.instantiate(this.prefabArr[this.sceneType]);
            node.x = (Math.random() - 0.5) * cc.winSize.width;
            node.y = (Math.random() - 0.5) * cc.winSize.height;
            node.parent = this.container;
        }
        this.num.string = this.container.childrenCount;
    },

    del () {
        this.container.destroyAllChildren();
        this.num.string = this.container.childrenCount;
    },

    back () {
        cc.director.loadScene('start');
    }
});
