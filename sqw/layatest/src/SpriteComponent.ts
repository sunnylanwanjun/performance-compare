import { BaseComponent } from "./BaseComponent";
import { RandomMove } from "./RandomMove";

export default class SpriteComponent extends BaseComponent {

    constructor() { 
        super(); 
        this._curSceneName = "SpriteScene.scene";
    }

    add () {
        for (let i = 0; i < this._changeCout; i++) {
            const _x: number = this.random(0, Laya.stage.width);
            const _y: number = this.random(0, Laya.stage.height);
            let role = this.createFrameAni(_x, _y, 'custom/frame/Swordsman_attack1.json', this._container);
            role.pivot(94, 172);
            role.interval = 60;
            role.play();
        }
    }

    createFrameAni (xPos: number, yPos: number, aniUrl: string, parent: Laya.Sprite = null) {
        const ani: Laya.Animation = new Laya.Animation();
        ani.addComponent(RandomMove);
        ani.loadAtlas(aniUrl);
        ani.pos(xPos, yPos);
        if (parent) {
            parent.addChild(ani);
        }
        return ani;
    }
}