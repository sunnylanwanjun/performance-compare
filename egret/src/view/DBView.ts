class DBView extends egret.DisplayObjectContainer {
    private egretFactory: dragonBones.EgretFactory;
    private objArr = [];
    private addCount = 10;
    private delCount = 10;
    private number:egret.TextField = null;
    private container:egret.Sprite = null;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
    }

    private init() {

        this.container = new egret.Sprite;
        this.addChild(this.container);

        let txInfo = new egret.TextField;
        this.addChild( txInfo );

        txInfo.size = 40;
        txInfo.x = this.stage.stageWidth / 2;
        txInfo.y = this.stage.stageHeight / 2;
        txInfo.textAlign = egret.HorizontalAlign.CENTER;
        txInfo.textColor = 0x00ff00;
        txInfo.type = egret.TextFieldType.DYNAMIC;
        txInfo.lineSpacing = 6;
        txInfo.multiline = false;
        
        txInfo.text = "0";
        this.number = txInfo;

        let btnList = [{label:"del",handle:this.delHandle}, {label:"add",handle:this.addHandle}, {label:"back",handle:this.toSelect}];
        let btnWidth = 130;
        let btnHeight = 40;
        let yInterval = 20;

        let totalHeight = btnList.length * (btnHeight + yInterval) - yInterval;
        let xPos = this.stage.stageWidth - 150;
        let yPos = this.stage.stageHeight - totalHeight - 50;

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
        
        this.egretFactory = dragonBones.EgretFactory.factory;
        if (!this.egretFactory.getDragonBonesData("SwordsMan")) {

            // dragonbones json format
            let dragonbonesData = RES.getRes( "SwordsMan_ske_json" );  
            let textureData = RES.getRes( "SwordsMan_tex_json" );  
            let texture = RES.getRes( "SwordsMan_tex_png" );

            this.egretFactory.parseDragonBonesData(dragonbonesData);  
            this.egretFactory.parseTextureAtlasData(textureData, texture);
        }
    }

    private delHandle () {
        for (let i = 0; i < this.delCount; i ++) {
            if (this.objArr.length == 0) break;
            let obj:dragonBones.EgretArmatureDisplay = this.objArr.pop();
            this.container.removeChild(obj);
            obj.dispose();
        }
        this.number.text = this.objArr.length + "";
    }

    private addHandle () {
        for (let i = 0; i < this.addCount; i ++) {
            let armatureDisplay: dragonBones.EgretArmatureDisplay = this.egretFactory.buildArmatureDisplay("Swordsman");
            armatureDisplay.x = (Math.random()) * this.stage.stageWidth;
            armatureDisplay.y = (Math.random()) * this.stage.stageHeight;
            armatureDisplay.animation.play("attack1");
            this.container.addChild(armatureDisplay);
            this.objArr.push(armatureDisplay);
        }
        this.number.text = this.objArr.length + "";
    }

    private toSelect () {
        while(this.objArr.length > 0) {
            let obj:dragonBones.EgretArmatureDisplay = this.objArr.pop();
            this.container.removeChild(obj);
            obj.dispose();
        }
        let stage = this.stage;
        stage.removeChildren();
        stage.addChild(new SelectView());
    }
}