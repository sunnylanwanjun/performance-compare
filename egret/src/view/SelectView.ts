
class SelectView extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
    }

    private init () 
    {
        let btnList = [{label:"sheep",handle:this.toSheep}, {label:"dragon",handle:this.toDragonBones}, {label:"loading", handle:this.toLoading} ];
        let btnWidth = 130;
        let btnHeight = 40;
        let yInterval = 20;

        let totalHeight = btnList.length * (btnHeight + yInterval) - yInterval;
        let xPos = this.stage.stageWidth / 2 - btnWidth / 2;
        let yPos = this.stage.stageHeight / 2 - totalHeight / 2;

        for (let i = 0; i < btnList.length; i++) {
            let button = new eui.Button();
            button.label = btnList[i].label;
            button.x = xPos;
            button.y = yPos;
            button.width = btnWidth;
            button.height = btnHeight;
            yPos += btnHeight + yInterval;
            this.addChild(button);
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, btnList[i].handle, this);
        }
    }

    private toSheep (e: egret.TouchEvent) {
        let stage = this.stage;
        stage.removeChildren();
        stage.addChild(new SheepView());
    }

    private toDragonBones (e: egret.TouchEvent) {
        let stage = this.stage;
        stage.removeChildren();
        stage.addChild(new DBView());
    }

    private toLoading (e: egret.TouchEvent) {
        let stage = this.stage;
        stage.removeChildren();
        stage.addChild(new LoadingView());
    }
}