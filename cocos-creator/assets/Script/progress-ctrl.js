cc.Class({
    extends: cc.Component,

    properties: {
        speed: 500,
        horizontalBarReverse: {
            type: cc.ProgressBar,
            default: null
        },
        text: {
            type: cc.Label,
            default: null
        },
    },

    onLoad: function () {
        this._pingpong = true;
        this.horizontalBarReverse.progress = 0;
    },

    update: function (dt) {
        this._updateProgressBar(this.horizontalBarReverse, dt);
    },
    
    _updateProgressBar: function(progressBar, dt){
        var progress = progressBar.progress;
        if(progress < 1.0 && this._pingpong){
            progress += dt * this.speed;
        }
        else {
            progress -= dt * this.speed;
            this._pingpong = progress <= 0;
        }
        progressBar.progress = progress;

        this.text.string = Math.floor(progress * 100);
    }
});
