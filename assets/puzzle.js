const ScenePuzzle = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function ScenePuzzle() {

            Phaser.Scene.call(this, {
                key: 'scenePuzzle'
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

        for (let i = 0; i < 12; i++) {
            this.load.image('piece' + i + '_' + passedPuzzlesNumber, 'assets/puzzle/' + passedPuzzlesNumber + '/' + i + '.png');
        }
        this.load.image('defaultBack', 'assets/defaultBack.png');
        this.load.image('puzzleBack', 'assets/puzzle/puzzleBack.png');
        this.load.image('completed' + '_' + passedPuzzlesNumber, 'assets/puzzle/' + passedPuzzlesNumber + '/completed.png');
        this.load.image('btnGo', 'assets/btnGo.png');

    },

    create: function() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'defaultBack');
        this.add.image(this.cameras.main.centerX - 2, this.cameras.main.centerY - 2, 'puzzleBack');

        if (passedPuzzlesNumber == 0) {
            pieces = [{
                offset: [93, 93]
            }, {
                offset: [115, 93]
            }, {
                offset: [111, 93]
            }, {
                offset: [102, 93]
            }, {
                offset: [93, 141]
            }, {
                offset: [144, 134]
            }, {
                offset: [108, 139]
            }, {
                offset: [102, 117]
            }, {
                offset: [93, 97]
            }, {
                offset: [105, 129]
            }, {
                offset: [112, 106]
            }, {
                offset: [102, 138]
            }];
        } else {
            pieces = [{
                offset: [93, 93]
            }, {
                offset: [89, 93]
            }, {
                offset: [150, 93]
            }, {
                offset: [129, 93]
            }, {
                offset: [93, 133]
            }, {
                offset: [129, 149]
            }, {
                offset: [112, 139]
            }, {
                offset: [129, 92]
            }, {
                offset: [93, 130]
            }, {
                offset: [134, 115]
            }, {
                offset: [106, 146]
            }, {
                offset: [111, 143]
            }];
        }

        pieces.forEach(function(piece, i) {
            piece.img = this.add.image(Math.random() * 924 + 50, 700 + Math.random() * 68, 'piece' + i + '_' + passedPuzzlesNumber);

            piece.img.setOrigin(piece.offset[0] / piece.img.width, piece.offset[1] / piece.img.height)
                .setInteractive({
                    draggable: true
                })
                .setDataEnabled()
                .data.set('owner', piece);

            piece.placed = false;
            piece.suitableX = (i % 4) * 186 + 140 + 93;
            piece.suitableY = (Math.floor(i / 4)) * 186 + 105 + 93;
            pieces.push[piece];
        }, this);

        this.input.on('dragstart', function(pointer, gameObject) {

            this.children.bringToTop(gameObject);

        }, this);

        suitablePos = new Phaser.Math.Vector2();
        currentPos = new Phaser.Math.Vector2();
        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {

            currentPos.x = dragX;
            currentPos.y = dragY;

            suitablePos.x = gameObject.data.get('owner').suitableX;
            suitablePos.y = gameObject.data.get('owner').suitableY;

            if (suitablePos.distance(currentPos) < 30) {
                gameObject.x = suitablePos.x;
                gameObject.y = suitablePos.y;
            } else {
                gameObject.x = currentPos.x;
                gameObject.y = currentPos.y;
            }

        }, this);

        currentScene = this;
        this.input.on('dragend', function(pointer, gameObject) {

            if (suitablePos.distance(currentPos) < 30) {

                gameObject.data.get('owner').placed = true;
                gameObject.disableInteractive();

                currentScene.checkVictory();
            }

        }, this);

        this.add.text(1020, 10, ' ', {
                color: 'white',
                fontSize: '10px'
            })
            .setInteractive()
            .on('pointerdown', function() {
                pieces.forEach(function(piece, i) {
                    piece.placed = true;
                }, this);
                this.checkVictory();
            }, this);
    },
    checkVictory: function() {
        let isVictory = true;
        pieces.forEach(function(piece, i) {
            if (piece.placed == false) {
                isVictory = false;
            }
        }, this);
        if (isVictory) {
            this.startVictoryAnimation();
        }
    },
    startVictoryAnimation: function() {
        pieces.forEach(function(piece, i) {
            piece.img.setVisible(false);
        });
        imgCompleted = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'completed' + '_' + passedPuzzlesNumber);
        currentScene = this;
        this.tweens.add({
            targets: imgCompleted,
            scale: {
                from: 1,
                to: 1.2
            },
            duration: 2000,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                currentScene.completedPuzzleScalingCompleted();
            }
        });
    },
    completedPuzzleScalingCompleted: function() {
        if (passedPuzzlesNumber == 0) {
            currentScene.appearNextBtn();
        } else {
            this.scene.start('sceneFinish');
        }
    },
    appearNextBtn: function() {
        btnGo = this.add.image(this.cameras.main.centerX + 35, 868, 'btnGo')
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', function() {
                this.scene.start('sceneWin');
            }, this);

        this.tweens.add({
            targets: btnGo,
            y: {
                from: 868,
                to: 575
            },
            duration: 500,
            ease: 'Quad.easeInOut'
        });
    }
});