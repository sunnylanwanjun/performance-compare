export default class StartComponent extends Laya.Script {
    
    private _spriteBtn: Laya.Button;
    private _skeletonBtn: Laya.Button;
    private _uiBtn: Laya.Button;

    constructor() { super(); }
    
    onAwake () {
        this._spriteBtn = this.owner.getChildByName("spriteBtn") as Laya.Button;
        this._skeletonBtn = this.owner.getChildByName("skeletonBtn") as Laya.Button;
        this._uiBtn = this.owner.getChildByName("uiBtn") as Laya.Button;
    }

    onEnable(): void {
        this._spriteBtn.on(Laya.Event.CLICK, this, this.onSpriteBtn);
        this._skeletonBtn.on(Laya.Event.CLICK, this, this.onSkeletonBtn);
        this._uiBtn.on(Laya.Event.CLICK, this, this.onUIBtn);
    }

    onDisable(): void {
        this._spriteBtn.off(Laya.Event.CLICK, this, this.onSpriteBtn);
        this._skeletonBtn.off(Laya.Event.CLICK, this, this.onSkeletonBtn);
        this._uiBtn.off(Laya.Event.CLICK, this, this.onUIBtn);
    }

    onSpriteBtn ():void {
        Laya.Scene.destroy("StartScene.scene");
        Laya.Scene.open("SpriteScene.scene");
    }

    onSkeletonBtn ():void {
        Laya.Scene.destroy("StartScene.scene");
        Laya.Scene.open("SkeletonScene.scene");
    }

    onUIBtn ():void {
        Laya.Scene.destroy("StartScene.scene");
        Laya.Scene.open("UIScene.scene");
    }
}