
export default class Loading extends Laya.Script {
    constructor () {
        super();
        this.log = null;
        this.serverAddress = 'http://10.44.50.185:8080/';
    }

    onStart () {
        var scene = laya.display.Scene.root.getChildByName('loadingTest');
        var loadAssets = scene.getChildByName('loadAssets');
        loadAssets.on(Laya.Event.MOUSE_DOWN, this, this.onLoadAssets);
        var download = scene.getChildByName('download');
        download.on(Laya.Event.MOUSE_DOWN, this, this.onDownload);
        var instantiate = scene.getChildByName('instantiate');
        instantiate.on(Laya.Event.MOUSE_DOWN, this, this.onInstantiate);
        var deserialize = scene.getChildByName('deserialize');
        deserialize.on(Laya.Event.MOUSE_DOWN, this, this.onDeserialize);
        var back = scene.getChildByName('back');
        back.on(Laya.Event.MOUSE_DOWN, this, this.onBack);
        this.log = scene.getChildByName('log');
    }

    onLoadAssets () {
        Laya.loader.maxLoader = 64;
        laya.net.WorkerLoader.workerPath = "libs/worker.js";
        //开启worker线程
        laya.net.WorkerLoader.enable = true;
        var urls = [];
        for (let i = 1; i <= 512; i ++) {
            urls.push(this.serverAddress + 'images/test%20copy%20' + i + '.png');
        }
        var last = Date.now();
        Laya.loader.load(urls, Laya.Handler.create(this, function (texs) {
            this.log.text = `load assets finished: ${Date.now() - last}ms`; 
        }));
    }

    onDownload () {
        var urls = [];
        for (let i = 1; i <= 512; i ++) {
            urls.push(this.serverAddress + 'images/test%20copy%20' + i + '.png');
        }
        var self = this;
        var count = 0;
        var start = Date.now();
        for (var i = 0, l = urls.length; i < l; i ++) {
            let image = new Image();
            image.onload = function () {
                count++;
                if (count === urls.length) self.log.text = 'download assets finish:' + (Date.now() - start) + 'ms';
            };
            image.onerror = function (e) {
                console.log(e);
            };
            image.src = urls[i];
        }
    }

    onInstantiate () {
        var urls = [];
        for (let i = 1; i <= 512; i ++) {
            urls.push(this.serverAddress + 'images/test%20copy%20' + i + '.png');
        }
        var self = this;
        var count = 0;
        var images = [];
        for (let i = 0, l = urls.length; i < l; i ++) {
            let image = new Image();
            image.onload = function () {
                count++;
                if (count === urls.length) {
                    var textures = [];
                    var last = Date.now();
                    for (let i = 0, l = images.length; i < l; i++) {
                        var img = laya.resource.HTMLImage.create();
                        img.loadImageSource(images[i]);
                        var texture = new laya.resource.Texture(img);
                        textures.push(texture);
                    }
                    self.log.text = `instantiate assets finished: ${Date.now() - last}ms`;
                }
            };
            image.src = urls[i];
            images.push(image);
        }
    }

    onDeserialize () {
        Laya.loader.load('empty.json', Laya.Handler.create(this, function () {
            var json = Laya.loader.getRes('empty.json');
            var last = Date.now(); 
            var scene = new Laya.Scene();
            scene.createView(json);
            this.log.text = `deserialize assets finished: ${Date.now() - last}ms`;
        }));
    }

    onBack () {
        Laya.Scene.open('start.scene');
    }
}