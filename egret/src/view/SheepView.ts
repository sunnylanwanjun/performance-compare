class SheepView extends egret.DisplayObjectContainer {

    private bunnys = [];
    private blockFrame = null;
    private bunnyFrames = null;
    private currentFrame = null;
    private bunnyType = 0;
    private gravity = 0.5;

    private maxX = 0;
    private minX = 0;
    private maxY = 0;
    private minY = 0;

    private startBunnyCount = 2;
    private isAdding = false;
    private count = 0;

    private amount = 100;
    private levelCount = 1;
    private drawcallUp = false;
    private number;

    private container = null;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
    }

    private init () 
    {
        this.maxX = this.stage.stageWidth;
        this.maxY = this.stage.stageHeight;

        for (let i = 0; i < this.levelCount; i++) {
            this.bunnys[i] = [];
        }

        let txInfo = new egret.TextField;
        this.addChild( txInfo );

        txInfo.size = 40;
        txInfo.x = this.maxX / 2 - 50;
        txInfo.y = this.maxY / 2;
        txInfo.textAlign = egret.HorizontalAlign.CENTER;
        txInfo.textColor = 0x00ff00;
        txInfo.type = egret.TextFieldType.DYNAMIC;
        txInfo.lineSpacing = 6;
        txInfo.multiline = false;
        
        txInfo.text = "0";
        this.number = txInfo;

        let back:egret.Sprite = new egret.Sprite();
        back.graphics.beginFill(0x000000, 1);
        back.graphics.drawRect(0, 0, this.maxX, this.maxY);
        back.graphics.endFill();
        back.width = this.maxX;
        back.height = this.maxY;
        back.touchEnabled = true;
        this.addChild(back);
        
        back.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            this.isAdding = true;
        }, this);
        back.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            this.isAdding = false;
        }, this);
        
        let blockTexture = RES.getRes("block_png");
        this.blockFrame = new egret.Texture();
        this.blockFrame._setBitmapData(blockTexture.bitmapData);
        
        let bunnyTexture = RES.getRes("bunny_png");
        
        let frame = new egret.Texture();
        frame._setBitmapData(bunnyTexture.bitmapData);
        frame.$bitmapX = 0;
        frame.$bitmapY = 0;
        frame.$bitmapWidth = 190;
        frame.$bitmapHeight = 136;
        this.currentFrame = frame;
        
        this.container = new egret.Sprite();
        this.addChild(this.container);

        let button = new eui.Button();
        button.label = "back";
        button.width = 130;
        button.height = 40;
        button.x = this.maxX - 150;
        button.y = this.maxY - 100;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toSelect, this);


        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    }

    private toSelect () {
        let stage = this.stage;
        stage.removeChildren();
        stage.addChild(new SelectView());
    }

    private addOnce () {
        let amountPerLevel = Math.floor(this.amount / this.levelCount);
        let parent = null;
        let bunny;

        parent = this.container;
        // Add block to break batch
        if (this.drawcallUp) {
            bunny = new egret.Bitmap();
            bunny.texture = this.blockFrame;
            bunny.x = 0;
            bunny.y = this.maxY - 336;
            parent.addChild(bunny);
        }
        for (let i = 0; i < this.levelCount; i++) 
        {
            let lbunnys = this.bunnys[i];
            for (let j = 0; j < amountPerLevel; j++) {
                bunny = {
                    sp: new egret.Bitmap(),
                    speedX:  Math.random() * 10,
                    speedY: (Math.random() * 10) - 5
                };
                bunny.sp.texture = this.currentFrame;
                bunny.sp.anchorOffsetX = 0.5;
                bunny.sp.anchorOffsetY = 1;
                bunny.sp.scaleX = bunny.sp.scaleY = 0.3 * (0.5 + Math.random()*0.5);
                bunny.sp.rotation = 360 * (Math.random()*0.2-0.1);

                lbunnys.push(bunny);
            
                parent.addChild(bunny.sp);
                this.count++;
            }
            let nextContainer = new egret.DisplayObjectContainer();
            parent.addChild(nextContainer);
            parent = nextContainer;
        }
        this.setChildIndex(this.number, this.numChildren - 1);
        this.number.text = this.count;
    }
    
    private  onEnterFrame(e:egret.Event){
        let bunny, i;
        if (this.isAdding) {
            //if (this.count < 20000) {
                this.addOnce();
            //}
        }

        for (i = 0; i < this.bunnys.length; i++) 
        {
            let lbunnys = this.bunnys[i];
            for (let j = 0; j < lbunnys.length; j++)
            {
                bunny = lbunnys[j];
                
                let x = (bunny.sp.x += bunny.speedX);
                let y = (bunny.sp.y += bunny.speedY);
                bunny.speedY += this.gravity;
                
                if (bunny.sp.x > this.maxX)
                {
                    bunny.speedX *= -1;
                    bunny.sp.x = this.maxX;
                }
                else if (bunny.sp.x < this.minX)
                {
                    bunny.speedX *= -1;
                    bunny.sp.x = this.minX;
                }
                
                if (bunny.sp.y > this.maxY)
                {
                    bunny.speedY *= -0.85;
                    bunny.sp.y = this.maxY;
                    if (Math.random() > 0.5)
                    {
                        bunny.speedY -= Math.random() * 6;
                    }
                } 
                else if (bunny.sp.y < this.minY)
                {
                    bunny.speedY = 0;
                    bunny.sp.y = this.minY;
                }
            }
        }
    }

    
}