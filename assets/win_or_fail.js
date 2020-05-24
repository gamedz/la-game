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
        this.load.image('winBack', 'assets/win.png');
    },

    create: function() {
        winBack = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'winBack');
        winBack.setInteractive()
            .on('pointerdown', function() {
                if (previousNovelType == 'simple') {
                    progress++;
                } else if (previousNovelType == 'stranger') {
                    passedStrangersNumber++;
                } else if (previousNovelType == 'puzzle') {
                    passedPuzzlesNumber++;
                }

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
        this.load.image('lose', 'assets/lose.png');
        this.load.image('lose_why', 'assets/lose_why.png');
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

        if (this.comment != '') {
            lose_why = this.add.image(724, 310, 'lose_why');
            txtComment = this.add.text(724, 310, this.comment, {
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
                targets: [lose_why, txtComment],
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 500,
                ease: 'Quad.easeOut'
            });
            txtComment.setAlpha(0);
        }

    }
});