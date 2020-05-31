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
        this.load.image('btnDownload', 'assets/btnDownload.png');
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

        btnDownload = this.add.image(this.cameras.main.centerX, 868, 'btnDownload')
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', function() {
                btnDownload.setVisible(false);
                game.renderer.snapshot(function (image) {                
                var canvasElement = document.getElementById(game.canvas);
                var MIME_TYPE = "image/png";
                var imgURL = image.src;
                var dlLink = document.createElement('a');
                dlLink.download = playerName + ' Диплом';
                dlLink.href = imgURL;
                dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
                document.body.appendChild(dlLink);
                dlLink.click();
                document.body.removeChild(dlLink);
                btnDownload.setVisible(true);
            });
            }, this);

        this.tweens.add({
            targets: btnDownload,
            y: {
                from: 868,
                to: 695
            },
            duration: 500,
            ease: 'Quad.easeInOut'
        });

        


    }
});