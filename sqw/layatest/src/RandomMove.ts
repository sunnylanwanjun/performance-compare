export class RandomMove extends Laya.Script {

    private _directX:number = 1;
    private _directY:number = 1;
    private _addX:number = 3;
    private _addY:number = 3;
    
    constructor() { 
        super(); 
        this._directX = Math.random() > 0.5 ? -1 : 1;
        this._directY = Math.random() > 0.5 ? -1 : 1;
    }

    onUpdate () {
        let sp = this.owner as Laya.Sprite;
        sp.x += this._addX * this._directX; 
        sp.y += this._addY * this._directY;
        if (sp.x > Laya.stage.width || sp.x < 0) {
            this._directX *= -1;
        }
        if (sp.y > Laya.stage.height || sp.y < 0) {
            this._directY *= -1;
        }
    }
}