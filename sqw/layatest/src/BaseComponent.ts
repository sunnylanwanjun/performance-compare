const AddFrameOnce = 30;

export class BaseComponent extends Laya.Script {
    

    protected _backBtn: Laya.Button;
    protected _addBtn: Laya.Button;
    protected _removeBtn: Laya.Button;
    protected _container: Laya.Button;
    protected _curSceneName: string;
    protected _count: Laya.Label;
    protected _changeCout: number = 100;

    constructor() { super(); }
    
    onAwake () {
        this._backBtn = this.owner.getChildByName("backBtn") as Laya.Button;
        this._addBtn = this.owner.getChildByName("addBtn") as Laya.Button;
        this._removeBtn = this.owner.getChildByName("removeBtn") as Laya.Button;
        this._container = this.owner.getChildByName("container") as Laya.Button;
        this._count = this.owner.getChildByName("count") as Laya.Label;
        this.addHandle () ;
    }

    onEnable(): void {
        this._backBtn.on(Laya.Event.CLICK, this, this.onBackBtn);
        this._addBtn.on(Laya.Event.CLICK, this, this.addHandle);
        this._removeBtn.on(Laya.Event.CLICK, this, this.removeHandle);
    }

    onDisable(): void {
        this._backBtn.off(Laya.Event.CLICK, this, this.onBackBtn);
        this._addBtn.off(Laya.Event.CLICK, this, this.addHandle);
        this._removeBtn.off(Laya.Event.CLICK, this, this.removeHandle);
    }

    onBackBtn ():void {
        Laya.Scene.destroy(this._curSceneName);
        Laya.Scene.open("StartScene.scene");
    }

    random(from: number, end: number): number {
        let min = Math.min(from, end);
        let max = Math.max(from, end);
        let range = max - min;
        return min + Math.random() * range;
    }

    addHandle () {
        this.add();
        this._count.text = "" + this._container.numChildren;
    }

    removeHandle () {
        this._container.removeChildren();
        this._count.text = "0";
    }

    add () {
    }
}