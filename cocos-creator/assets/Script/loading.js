// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        label: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onBack () {
        cc.director.loadScene('start');
    },

    onLoadResDir () {
        var self = this;
        cc.macro.DOWNLOAD_MAX_CONCURRENT = 64;
        var start = Date.now();
        cc.loader.loadResDir('/images', cc.Texture2D, function (err, assets) {
            var duration = Date.now() - start;
            self.label.string = 'load assets finish:' + duration + 'ms';
        });
    },

    onDownloadFromXHR () {
        var self = this;
        var res = cc.loader._resources.getUuidArray('/', cc.Texture2D);
        var urls = res.map((value) => wxDownloader.REMOTE_SERVER_ROOT + '/' + cc.AssetLibrary.getLibUrlNoExt(value, true) + '.png');
        var count = 0;
        var start = Date.now();
        for (var i = 0, l = urls.length; i < l; i ++) {
            let image = new Image();
            image.onload = function () {
                count++;
                if (count === urls.length) self.label.string = 'download assets finish:' + (Date.now() - start) + 'ms';
            };
            image.onerror = function (e) {
                console.log(e);
            };
            image.src = urls[i];
        }
    },

    onInstantiate () {
        var self = this;
        var res = cc.loader._resources.getUuidArray('/', cc.Texture2D);
        var urls = res.map((value) => wxDownloader.REMOTE_SERVER_ROOT + '/' + cc.AssetLibrary.getLibUrlNoExt(value, true) + '.png');
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
                        var texture = new cc.Texture2D();
                        texture._nativeAsset = images[i];
                        textures.push(texture);
                    }
                    self.label.string = `instantiate assets finished: ${Date.now() - last}ms`;
                }
            };
            image.src = urls[i];
            images.push(image);
        }
    },

    onDeserialize () {
        var self = this;
        var info = cc.director._getSceneUuid('empty');
        cc.Pipeline.Downloader.PackDownloader.load(info, function (err, json) {
            var last = Date.now();
            var classFinder = cc._MissingScript.safeFindClass;
            var tdInfo = cc.deserialize.Details.pool.get();

            var asset;
            try {
                asset = cc.deserialize(json, tdInfo, {
                    classFinder: classFinder,
                    target: null,
                    customEnv: info
                });
            }
            catch (e) {
                console.log(e);
            }

            asset._uuid = info.uuid;
            asset.onload && asset.onload();
            self.label.string = `deserialize finished: ${Date.now() - last}ms`;
        });
    }
    

    // update (dt) {},
});
