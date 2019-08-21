cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {
        cc.debug.setDisplayStats(true);
    },

    changeScene (event, sceneType) {
        cc.curScene = sceneType;
        cc.director.loadScene('test');
    }
});
