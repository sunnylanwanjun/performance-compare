class LoadingView extends eui.Component { 
    private log: eui.Label;
    private loadAssets: eui.Button;
    private download: eui.Button;
    private back: eui.Button;
    private instantiate: eui.Button;
    private background: eui.Image;
    private deserialize: eui.Button;
    private serverAddress: string;
    public constructor () {
        super();
        this.skinName = 'custom.loading';
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    private async init () {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        this.loadAssets.touchEnabled = true;
        this.loadAssets.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onload, this);
        this.download.touchEnabled = true;
        this.download.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ondownload, this);
        this.back.touchEnabled = true;
        this.back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onback, this);
        this.instantiate.touchEnabled = true;
        this.instantiate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.oninstantiate, this);
        this.deserialize.touchEnabled = true;
        this.deserialize.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ondeserialize, this);
        
    }

    private async onload (e: egret.TouchEvent) {
        RES.setMaxLoadingThread(64);
        let last = Date.now();
        await RES.loadGroup('test', 0);
        this.log.text = `load assets finished : ${Date.now() - last}ms`;
    } 

    private async ondownload (e: egret.TouchEvent) {
        var res = RES.getGroupByName('test');
        var urls = res.map((value) => Main.serverAddress + value.url.replace(/ /g, '%20') );
        var count = 0;
        var self = this;
        var last = Date.now();
        for (var i = 0, l = urls.length; i < l; i ++) {
            let image = new Image();
            image.onload = function () {
                count++;
                if (count === urls.length) {
                    self.log.text = `download assets finished: ${Date.now() - last}ms`;
                }
            };
            image.src = urls[i];
        }
    }

    private onback () {
        let stage = this.stage;
        stage.removeChildren();
        stage.addChild(new SelectView());
    }

    private oninstantiate () {
        var res = RES.getGroupByName('test');
        var urls = res.map((value) => Main.serverAddress + value.url.replace(/ /g, '%20'));
        var count = 0;
        var self = this;
        var images = [];
        for (let i = 0, l = urls.length; i < l; i ++) {
            let image = new Image();
            image.onload = function () {
                count++;
                if (count === urls.length) {
                    var textures = [];
                    var last = Date.now();
                    for (let i = 0, l = images.length; i < l; i++) {
                        var bitmapdata = new egret.BitmapData(images[i]);
                        var texture = new egret.Texture();
                        texture._setBitmapData(bitmapdata);
                        textures.push(texture);
                    }
                    self.log.text = `instantiate assets finished: ${Date.now() - last}ms`;
                }
            };
            image.src = urls[i];
            images.push(image);
        }
    }

    private ondeserialize () {
        var klass = generateEUI.paths['resource/eui_skins/Empty.exml'];
        var last = Date.now();
        var scene = new klass();
        this.log.text = `deserialize finished: ${Date.now() - last}ms`;
    }
}