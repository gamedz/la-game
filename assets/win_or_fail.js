const SceneWin = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function SceneWin() {

            Phaser.Scene.call(this, {
                key: 'sceneWin'
            });
        },

    init: function(data) {},

    preload: function() {
        var gfxProgress = this.add.graphics();
        var txtProgress = this.add.text( 50, 334, 'Загрузка...', {
                fontFamily: "rotondac",
                color: '#ffffff',
                fontSize: '35px'
            });
        this.load.on('progress', function(value) {

            gfxProgress.clear();
            gfxProgress.fillStyle(0xffffff, 1);
            gfxProgress.fillRect(50, 374, 924 * value, 20);
        });
        this.load.on('complete', function() {
            txtProgress.destroy();
            gfxProgress.destroy();
        });

        this.load.image('winBack', 'assets/win.png');
    },

    create: function() {
                        if (previousNovelType == 'simple') {
                    progress++;
                } else if (previousNovelType == 'stranger') {
                    passedStrangersNumber++;
                } else if (previousNovelType == 'puzzle') {
                    passedPuzzlesNumber++;
                }
        winBack = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'winBack');
        winBack.setInteractive()
            .on('pointerdown', function() {
                if (progress == 7) {
                    this.scene.start('sceneFinish');
                } else {
                    this.scene.start('sceneMap', {
                        isRaising: true
                    });
                }


            }, this);
    }
});

const SceneFail = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function SceneFail() {

            Phaser.Scene.call(this, {
                key: 'sceneFail'
            });
        },

    init: function(data) {
        this.comment = data.comment;
    },

    preload: function() {
        var gfxProgress = this.add.graphics();
        var txtProgress = this.add.text( 50, 334, 'Загрузка...', {
                fontFamily: "rotondac",
                color: '#ffffff',
                fontSize: '35px'
            });
        this.load.on('progress', function(value) {

            gfxProgress.clear();
            gfxProgress.fillStyle(0xffffff, 1);
            gfxProgress.fillRect(50, 374, 924 * value, 20);
        });
        this.load.on('complete', function() {
            txtProgress.destroy();
            gfxProgress.destroy();
        });
        
        this.load.image('lose', 'assets/lose.png');
    },

    create: function() {
        lose = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'lose');
        lose.setInteractive()
            .on('pointerdown', function() {
                this.scene.start('sceneNovel', {
                    dialogIndex: 0,
                    type: previousNovelType
                });
            }, this);
        
            txtComment = this.add.text(771, 344, this.comment, {
                fontFamily: "rotondac",
                color: 'black',
                fontSize: '40px',
                wordWrap: {
                    width: 350,
                    useAdvancedWrap: true
                }
            });
            txtComment.setOrigin(0.5);

            this.tweens.add({
                targets: txtComment,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 500,
                ease: 'Quad.easeOut'
            });
            txtComment.setAlpha(0);        

    }
});