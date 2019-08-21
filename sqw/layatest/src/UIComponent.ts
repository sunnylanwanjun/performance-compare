import { BaseComponent } from "./BaseComponent";
import { RandomMove } from "./RandomMove";
import { RandomLabel } from "./RandomLabel";

export default class UIomponent extends BaseComponent {

    constructor() { 
        super(); 
        this._curSceneName = "UIScene.scene";
    }

    add () {
        for (let i = 0; i < this._changeCout; i++) {
            const _x: number = this.random(0, Laya.stage.width);
            const _y: number = this.random(0, Laya.stage.height);
            this.createUI(_x, _y, this._container);
        }
    }

    createUI (xPos: number, yPos: number, parent: Laya.Sprite = null) {
        const ui: Laya.Sprite = new Laya.Sprite();

        var label = new Laya.Label();//创建一个 Label 类的实例对象 label 。
        label.addComponent(RandomLabel);
        label.fontSize = 20;
        label.font = "Arial";//设置 label 的字体。
        label.bold = true;//设置 label 显示为粗体。
        label.leading = 4;//设置 label 的行间距。
        label.color = "#00ff00";//设置 label 的颜色。
        // label.x = 100;//设置 label 对象的属性 x 的值，用于控制 label 对象的显示位置。
        // label.y = 100;//设置 label 对象的属性 y 的值，用于控制 label 对象的显示位置。
        // label.width = 300;//设置 label 的宽度。
        // label.height = 200;//设置 label 的高度。

        ui.addChild(label);

        ui.addComponent(RandomMove);
        ui.pos(xPos, yPos);
        if (parent) {
            parent.addChild(ui);
        }
        return ui;
    }
}