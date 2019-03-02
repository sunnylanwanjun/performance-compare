class BackpackItem extends eui.Component 
{
    private star1:eui.Image;
    private star2:eui.Image;
    private star3:eui.Image;
    private star4:eui.Image;
    private star5:eui.Image;
    private hero:eui.Image;
    private heroIcons = [
        "ic_captain_jack_png",
        "ic_drakan_png",
        "ic_hilf_png",
        "ic_mermaid_png",
        "ic_mermaidqueen_png",
        "ic_norm_png",
        "ic_oceaking_png",
        "ic_oceantriton_png",
        "ic_salamander_png",
        "ic_sundine_png",
    ]
    constructor() {
        super();
        this.skinName = "HeroSlot";
        this.init();
    }
    init() {
        //star
        let starNum = this.getRandomInt(1, 5);
        for (let i = 1; i <= 5; i++)
        {
            this["star"+i].visible = i <= starNum;
        }
        //hero
        let heroId = this.getRandomInt(0, this.heroIcons.length - 1);
        let icon = this.heroIcons[heroId];
        this.hero.source = RES.getRes(icon);


    }

    private getRandomInt (min, max) {
        var ratio = Math.random();
        return min + Math.floor((max - min) * ratio);
    };
}

class BackpackComponent extends eui.Component
{
    private close:eui.Image;
    private addBtn:eui.Image;
    private curNum:eui.Label;
    private list:eui.Group;
    private scroller:eui.Scroller;
    private addCount:number = 20;
    private heroSlots = new Array;
    private curCount:number = 0;
    private percent:number = 0;
    private pingpong:number = 1;
    constructor() {
        super();
        this.skinName = "Backpack";
        this.init();
    }

    private init() {
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toSelect, this);
        this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addSomeHeroSlot, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    }

    private update() {
        this.percent += this.pingpong;
        let max = this.scroller.viewport.contentHeight - this.scroller.viewport.height;
        this.scroller.viewport.scrollV = Math.min(Math.max(this.percent, 0), max);
        if (this.percent <= 0) {
            this.pingpong = 1;
        } else if (this.percent >= max) {
            this.pingpong = -1;
        }
    }

    private addSomeHeroSlot() {
        for (let i = 0; i < this.addCount; ++i) {
            let heroSlot = this.addHeroSlot();
            this.heroSlots.push(heroSlot);
        }
        this.curCount += this.addCount;
        this.curNum.text = this.curCount.toString();
    }

    private addHeroSlot () {
        let heroSlot = new BackpackItem;
        this.list.addChild(heroSlot);
        return heroSlot;
    }

    private toSelect() {
        let stage = this.stage;
        stage.removeChildren();
        stage.addChild(new SelectView());
    }
}

class BackpackView extends egret.DisplayObjectContainer {

    constructor() {
        super();
        this.init();
    }

    init() {
        let backpack = new BackpackComponent;
        this.addChild(backpack);
    }
}