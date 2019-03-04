class ProgressTextTestView extends eui.Component {
    public back:eui.Button;
    public curNum:eui.Label;
    public add:eui.Button;
    
    public constructor() {
        super();
        this.skinName = "skins.ProgressTextTest"
    }
}

class Progress extends eui.Component {
    public bar:eui.ProgressBar;
    public previousTime:number;
    private speed:number = 200;
    private pingpong:boolean = true;
    public barNode:eui.Group = null;
    public textNode:eui.Group = null;
    public barText:eui.Label = null;

    public constructor() {
        super();
        this.skinName = "progress";
        this.bar.value = 0;
        //this.bar.labelDisplay.visible = false;
        this.bar.cacheAsBitmap = true;
        this.addEventListener(egret.Event.ENTER_FRAME,this.onTick,this);
    }
    
    public onTick() {
        let value = this.bar.value;
        if(this.pingpong && value < 100){
            value += 1;
        }
        else {
            value -= 1;
            this.pingpong = value <= 0;
        }
        this.bar.value = value;
        this.barText.text = ""+Math.floor(value);
        return true;
    }
}

class ProgressView extends egret.DisplayObjectContainer {

    private barNode:eui.Group = null;
    private textNode:eui.Group = null;
    private num:number = 0;
    private onceNum:number = 10;

    private maxX = 0;
    private minX = 0;
    private maxY = 0;
    private minY = 0;
    private mainView = null;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
    }
    
    private init () {
        let mainView = new ProgressTextTestView();
        this.mainView = mainView;
        this.addChild(mainView);
        this.barNode = this.mainView.barNode;
        this.textNode = this.mainView.textNode;
        //this.addChild(this.container);
        this.maxX = this.stage.stageWidth;
        this.maxY = this.stage.stageHeight;
        mainView.back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toSelect,this);
        this.mainView.add.addEventListener(egret.TouchEvent.TOUCH_TAP,this.randomBar,this);
        this.num = 0;
    }

    private randomBar () {
        for (let i = 0; i < this.onceNum; i++) {
            let pNode = new Progress();
            let x = Math.random() * this.maxX;
            let y = Math.random() * this.maxY;
            pNode.x = x;
            pNode.y = y;

            let text = new eui.Label;
            text.x = x + 25;
            text.y = y + 4;
            text.size = 16;
            text.textColor = 0X707070;
            text.cacheAsBitmap = true;

            this.textNode.addChild(text);
            pNode.barText = text;
            this.barNode.addChild(pNode);
        }

        this.num += this.onceNum;
        this.mainView.curNum.text = this.num;
    }

    private toSelect () {
        let stage = this.stage;
        stage.removeChildren();
        stage.addChild(new SelectView());
    }
}