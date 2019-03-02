cc.Class({
    extends: cc.Component,

    properties: {
        slotPrefab: {
            default: null,
            type: cc.Prefab
        },
        scrollView: {
            default: null,
            type: cc.ScrollView
        },
        num: {
            default: null,
            type: cc.Label
        },
        addCount: 0
    },

    onEnable: function () {
        this.curCount = 0;
        this.heroSlots = [];
        this.percent = 0;
        this.pingpong = 0.01;
        this.timeslot = 0;
        this.timetotal = 0;
        this.addSomeHeroSlot();
    },

    update: function (dt) {
        let time = this.scrollView.content.height / this.scrollView.node.height;
        this.percent += this.pingpong / time;
        let p = Math.min(Math.max(0, this.percent), 1);
        this.scrollView.scrollToPercentVertical(p);
        if(this.percent >= 1)
        {
            this.pingpong = -0.01;
        } else if (this.percent <= 0) {
            this.pingpong = 0.01;
        }
    },

    addSomeHeroSlot: function () {
        for (let i = 0; i < this.addCount; ++i) {
            let heroSlot = this.addHeroSlot();
            this.heroSlots.push(heroSlot);
        }
        this.curCount += this.addCount;
        this.num.string = this.curCount;
    },

    addHeroSlot: function () {
        let heroSlot = cc.instantiate(this.slotPrefab);
        this.scrollView.content.addChild(heroSlot);
        return heroSlot;
    },

    show: function () {
        this.node.active = true;
        this.node.emit('fade-in');
        this.home.toggleHomeBtns(false);
    },

    hide: function () {
        this.node.emit('fade-out');
        this.home.toggleHomeBtns(true);
    },

    back () {
        cc.director.loadScene('start');
    }
});
