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

        this.load.image('introBack', 'assets/intro/back.png');
        this.load.image('btnStartGame', 'assets/btnStartGame.png');
        this.load.html('nameform', 'assets/nameform.html');
    },

    create: function() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'introBack')
        .setInteractive()
        .on('pointerdown', function() {
            console.log(game.input.mousePointer.x + '   ' + game.input.mousePointer.y);

        }, this );

        const txtHello = this.add.text(this.cameras.main.centerX, 120, 'Привет!', {
                fontFamily: "rotondac",
                color: '#2794D1',
                fontSize: '35px',
                alpha: 0,
            })
            .setOrigin(0.5);

        txtWhatIsYourName = this.add.text(this.cameras.main.centerX, -100, 'Как тебя зовут?', {
                fontFamily: "rotondac",
                color: '#2794D1',
                fontSize: '35px',
                alpha: 0,
            })
            .setOrigin(0.5);

        element = this.add.dom(this.cameras.main.centerX - 100, -100).createFromCache('nameform');

        btnStartGame = this.add.image(this.cameras.main.centerX + 200, -100, 'btnStartGame')
            .setInteractive()
            .on('pointerdown', function() {
                inputText = element.getChildByName('nameField');

                playerName = inputText.value;

                if ( playerName == '' )
                {
                    txtWhatIsYourName.setText( 'Как тебя зовут? Напиши, пожалуйста, свое имя и фамилию:' );
                }
                else
                {
                    this.scene.start('sceneMap', {
                        isRaising: true
                    });
                }

                
            }, this);

        this.tweens.add({
            targets: [element, btnStartGame],
            y: 430,
            duration: 1000,
            ease: 'Power3'
        });
        this.tweens.add({
            targets: txtWhatIsYourName,
            y: 370,
            duration: 1000,
            ease: 'Power3'
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