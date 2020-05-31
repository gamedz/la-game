const SceneIntro = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function SceneIntro() {
            Phaser.Scene.call(this, {
                key: 'sceneIntro'
            });
        },

    preload: function() {
        var gfxProgress = this.add.graphics();
        var txtProgress = this.add.text(50, 334, 'Загрузка...', {
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

        this.load.image('introBack', 'assets/intro/back.png');
        this.load.image('hello', 'assets/intro/hello.png');
        this.load.image('btnStartGame', 'assets/btnStartGame.png');
        this.load.html('nameform', 'assets/nameform.html');
    },

    create: function() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'introBack')
            .setInteractive();

        hello = this.add.image(this.cameras.main.centerX, -100, 'hello')
            .setInteractive()
            .setOrigin(0.5);

        // const txtHello = this.add.text(this.cameras.main.centerX, 120, 'Привет!', {
        //         fontFamily: "rotondac",
        //         color: '#2794D1',
        //         fontSize: '35px',
        //         alpha: 0,
        //     })
        //     .setOrigin(0.5);

        // txtWhatIsYourName = this.add.text(this.cameras.main.centerX, -100, 'Как тебя зовут?', {
        //         fontFamily: "rotondac",
        //         color: '#2794D1',
        //         fontSize: '35px',
        //         alpha: 0,
        //     })
        //     .setOrigin(0.5);

        inputForm = this.add.dom(this.cameras.main.centerX, 900).createFromCache('nameform');

        btnStartGame = this.add.image(this.cameras.main.centerX, 900, 'btnStartGame')
            .setInteractive()
            .on('pointerdown', function() {

                inputText = inputForm.getChildByName('nameField');

                playerName = inputText.value;

                if (playerName != '') {
                    this.scene.start('sceneMap', {
                        isRaising: true
                    });
                }

            }, this);

        currentScene = this;

        this.tweens.add({
            targets: [hello],
            y: 217,
            duration: 1500,
            ease: 'Quad.easeOut',
            onComplete: function() {
                currentScene.tweens.add({
                    targets: [inputForm],
                    y: 420,
                    duration: 750,
                    ease: 'Quad.easeOut'
                });
        
                currentScene.tweens.add({
                    targets: [btnStartGame],
                    y: 490,
                    duration: 750,
                    ease: 'Quad.easeOut'
                });
            }
        });

        this.add.text(20, 742, 'Над игрой работали: Игнат Глушихин, Ольга Дизастр Волкова', {
            fontFamily: "rotondac",
            color: 'white',
            fontSize: '20px'
        });
    }
});

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1024,
    height: 768,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: true
    },
    scene: [SceneIntro, SceneNovel, SceneMap, SceneWin, SceneFail, ScenePack, ScenePuzzle, SceneFinish]
};

const game = new Phaser.Game(config);