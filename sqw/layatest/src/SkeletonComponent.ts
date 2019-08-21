import { BaseComponent } from "./BaseComponent";
import { RandomMove } from "./RandomMove";

export default class SkeletonComponent extends BaseComponent {

    private _templetCache: object = {};

    constructor() { super(); 
        this._curSceneName = "SkeletonScene.scene";
    }

    add () {
        for (let i = 0; i < this._changeCout; i++) {
            const _x: number = this.random(0, Laya.stage.width);
            const _y: number = this.random(0, Laya.stage.height);
            let role = this.createSkeletonAni(_x, _y, 'custom/skeleton/SwordsMan', 0, this._container);
            role.play('attack1', true);
        }
    }

    createSkeletonAni (xPos: number, yPos: number, skKey: string, type: number = 0, parent = null) {
        let templet = this.createTemplet(skKey);
        if (templet) {
            let skeleton = templet.buildArmature(type);
            skeleton.addComponent(RandomMove);
            skeleton.pos(xPos, yPos);
            if (parent) {
                parent.addChild(skeleton);
            }
            return skeleton;
        }
        else {
            console.warn("动画资源未提前加载！");
        }
        return null;
    }

    createTemplet(key: string): Laya.Templet {
        if (!this._templetCache[key]) {
            let templet = new Laya.Templet();
            let pngData = Laya.loader.getRes(key + ".png");
            let skData = Laya.loader.getRes(key + ".sk");
            if (pngData && skData) {
                templet.parseData(pngData, skData);
                this._templetCache[key] = templet;
            }
            else {
                return null;
            }
        }
        return this._templetCache[key];
    }
}