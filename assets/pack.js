const ScenePack = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function ScenePack() {

            Phaser.Scene.call(this, {
                key: 'scenePack'
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
        
        previousNovelType = 'simple';
        this.load.image('forest', 'assets/forest.png');
        items = [{
            name: 'bag',
            title: 'Корзинка',
            isGood: false
        }, {
            name: 'book',
            title: 'Книга',
            isGood: false
        }, {
            name: 'flashlight',
            title: 'Фонарик',
            isGood: true
        }, {
            name: 'headphones',
            title: 'Наушники',
            isGood: false
        }, {
            name: 'raincoat',
            title: 'Дождевик',
            isGood: true
        }, {
            name: 'smartphone',
            title: 'Смартфон',
            isGood: true
        }, {
            name: 'umbrella',
            title: 'Зонтик',
            isGood: false
        }, {
            name: 'water',
            title: 'Бутылка воды',
            isGood: true
        }, {
            name: 'whistle',
            title: 'Свисток',
            isGood: true
        }, {
            name: 'jacket',
            title: 'Камуфляж',
            isGood: false
        }, {
            name: 'snack',
            title: 'Шоколадка',
            isGood: true
        }, {
            name: 'pack',
            title: 'Рюкзак',
            isGood: true
        }];

        items.forEach(function(item, i) {
            this.load.image(item.name, 'assets/forest/' + item.name + '.png');
            this.load.image(item.name + 'True', 'assets/forest/true/' + item.name + '.png');
            this.load.image(item.name + 'False', 'assets/forest/false/' + item.name + '.png');
        }, this);
    },

    create: function() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'forest');

        this.add.text(this.cameras.main.centerX, 35, 'Что взять с собой в лес?', {
                fontFamily: "rotondac",
                color: 'white',
                fontSize: '45px'
            })
            .setOrigin(0.5)
            .setStroke('black', 2);

        this.add.text(this.cameras.main.centerX + 275, 90, 'Возьму', {
                fontFamily: "rotondac",
                color: 'white',
                fontSize: '45px'
            })
            .setOrigin(0.5)
            .setStroke('black', 2);

        this.add.text(this.cameras.main.centerX - 275, 90, 'Не возьму', {
                fontFamily: "rotondac",
                color: 'white',
                fontSize: '45px'
            })
            .setOrigin(0.5)
            .setStroke('black', 2);


        this.add.text(this.cameras.main.centerX, 540, 'Перетаскивай вправо то, что пригодится в лесу, а влево – то, что лучше оставить.', {
                fontFamily: "rotondac",
                color: 'white',
                fontSize: '30px',
            wordWrap: {
                width: 900,
                useAdvancedWrap: true
            }
            })
            .setOrigin(0.5)
            .setStroke('black', 2);

        items.forEach(function(item, i) {
            item.isCorrectPlace = false;
            this.add.image(50 + Math.random()*924, 700, item.name)
                .setInteractive({
                    draggable: true
                })
                .setDataEnabled()
                .data.set('owner', item);
        }, this);

        this.input.on('dragstart', function(pointer, gameObject) {

            this.children.bringToTop(gameObject);

        }, this);

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        currentScene = this;
        this.input.on('dragend', function(pointer, gameObject) {
            dragX = gameObject.x;
            dragY = gameObject.y;
            const isLeftArea = (dragX >= 14 && dragX <= 14 + 450 && dragY >= 127 && dragY <= 127 + 372);
            const isRightArea = (dragX >= 560 && dragX <= 560 + 450 && dragY >= 127 && dragY <= 127 + 372);
            const item = gameObject.data.get('owner');
            let isTrue = false;
            let isFalse = false;
            if (item.isGood && isRightArea)
                isTrue = true;
            if (item.isGood && isLeftArea)
                isFalse = true;
            if (!item.isGood && isLeftArea)
                isTrue = true;
            if (!item.isGood && isRightArea)
                isFalse = true;
            currentScene.setTrueness(item,
                isTrue, isFalse,
                gameObject);
        }, this);
    },
    setTrueness(item, isTrue, isFalse, img) {
        if (isFalse)
            img.setTexture(item.name + 'False')
        else if (isTrue)
            img.setTexture(item.name + 'True')
        else
            img.setTexture(item.name);
        item.isCorrectPlace = isTrue;
        this.doCheck();
    },
    doCheck() {
        isVictory = true;
        items.forEach(function(item, i) {
            if (!item.isCorrectPlace)
                isVictory = false;
        }, this);
        if (isVictory) {
            this.scene.start('sceneWin');
        }
    },
    update: function() {

    }
});