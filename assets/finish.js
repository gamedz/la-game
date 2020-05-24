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