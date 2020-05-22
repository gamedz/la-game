
var SceneFinish = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function SceneFinish() {

            Phaser.Scene.call(this, {
                key: 'sceneFinish'
            });
        },

    init: function(data) {
    },

    preload: function() {
        this.load.image('diplom', 'assets/diplom.png');

    },

    create: function() {
        console.log(previousNovelType);
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'diplom');
    }
});