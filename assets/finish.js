const SceneFinish = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function SceneFinish() {

            Phaser.Scene.call(this, {
                key: 'sceneFinish'
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
        
        this.load.image('diplom', 'assets/diplom.png');
    },

    create: function() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'diplom');

        txtName = this.add.text(this.cameras.main.centerX, 390, playerName, {
            fontFamily: "rotondac",
            color: '#9B5649',
            fontSize: '50px',
            alpha: 1
        });
        txtName.setOrigin(0.5);
    }
});