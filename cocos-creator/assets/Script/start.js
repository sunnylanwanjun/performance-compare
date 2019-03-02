cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {

    },

    changeScene (event, sceneType) {
        switch(sceneType)
        {
            case 'sheep':
                cc.director.loadScene('sheep');
                break;
            case 'spine':
                cc.director.loadScene('spine');
                break;
            case 'dragonbones':
                cc.director.loadScene('dragonbones');
                break;
            case 'progress-text':
                cc.director.loadScene('progress-text');
                break;
            case 'scrollview':
                cc.director.loadScene('scrollview');
                break;
        }
    }
});
