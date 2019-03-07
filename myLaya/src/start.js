
export default class Start extends Laya.Script {
    constructor () {
        super();
    }

    onStart () {
        var scene = laya.display.Scene.root.getChildByName('start');
        var loading = scene.getChildByName('loading');
        loading.on(Laya.Event.MOUSE_DOWN, this, this.toLoading);
    }

    toLoading () {
        Laya.Scene.open('loading.scene');
    }
}