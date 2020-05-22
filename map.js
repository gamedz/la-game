let paths = [];

var SceneMap = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function SceneMap() {

            Phaser.Scene.call(this, {
                key: 'sceneMap'
            });
        },

    init: function(data) {
        this.isRaising = data.isRaising;
    },

    preload: function() {
        this.load.image('locationHitArea', 'assets/locationHitArea.png');
        this.load.image('mapFront', 'assets/mapFront.png');
        this.load.image('flag', 'assets/flag.png');
        this.load.image('hero', 'assets/hero.png');
        this.load.image('check', 'assets/check.png');
        this.load.image('LittleCircle', 'assets/LittleCircle.png');
        this.load.image('LittleCircleEmpty', 'assets/LittleCircleEmpty.png');
        this.load.image('BigCircle', 'assets/BigCircle.png');
        this.load.image('BigCircleEmpty', 'assets/BigCircleEmpty.png');
        this.load.image('stranger', 'assets/stranger.png');

        locationTitles = ['Старт', 'ТЦ', 'Остановка', 'Автобус', 'Лес', 'Школа', 'Дом', 'Финиш'];
        locationPositions = [
            [104, 100],
            [180, 278],
            [144, 517],
            [519, 156],
            [961, 98],
            [487, 359],
            [681, 719],
            [963, 648]
        ];
        pathPoints = [
            [158, 179],
            [121, 383],
            [269, 439, 364, 216],
            [691, 157, 827, 85],
            [904, 229, 711, 280, 584, 389],
            [486, 405, 541, 496, 475, 667],
            [831, 717, 900, 695, 942, 650]
        ];     
        pointsNumbers = [ 7, 8, 20, 17, 19, 18, 9 ];
    },

    create: function() {

        currentScene = this;

        mapFront = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'mapFront');

        beforeStranger = false;
        afterStranger = false;
        beforePuzzle = false;
        afterPuzzle = false;

        moveOnlyToMiddle = false;
        moveFromMiddle = false;
        if (progress == 3) {
            beforeStranger = passedStrangersNumber == 0;
            afterStranger = passedStrangersNumber == 1;
        }
        if (progress == 4) {
            beforeStranger = passedStrangersNumber == 1;
            afterStranger = passedStrangersNumber == 2;
        }
        if (progress == 5) {
            beforeStranger = passedStrangersNumber == 2;
            afterStranger = passedStrangersNumber == 3;
        }
        if (progress == 2) {
            beforePuzzle = passedPuzzlesNumber == 0;
            afterPuzzle = passedPuzzlesNumber == 1;
        }

        if (beforePuzzle || beforeStranger)
            moveOnlyToMiddle = true;

        if (afterPuzzle || afterStranger)
            moveFromMiddle = true;

        allPathPointImgs = [];

        graphics = this.add.graphics();

        var txtHello = this.add.text(this.cameras.main.centerX, 20, 'Привет, ' + playerName + '!', {
            fontFamily: "rotondac",
            color: 'white',
            fontSize: '25px',
            align: 'right',
            alpha: 0
        });
        txtHello.setOrigin(0.5);
        txtHello.setStroke('black', 2);

        this.tweens.add({
            targets: txtHello,
            alpha: 1,
            duration: 1000,
            ease: 'Quad.easeInOut',
            yoyo: false
        });

        follower = {
            moveProgress: moveFromMiddle ? 0.5 : 0,
            maxMoveProgress: moveOnlyToMiddle ? 0.5 : 1,
            movingTime: 0,
            linearTime: 0,
            pos: new Phaser.Math.Vector2()
        };

        console.log(follower.maxMoveProgress);

        duration = 0;
        if (this.isRaising)
            duration = 4000;
        if (moveOnlyToMiddle || moveFromMiddle)
            duration *= 0.75;

        this.tweens.add({
            targets: follower,
            moveProgress: follower.maxMoveProgress,
            ease: 'Sine.easeInOut',
            duration: duration,
            yoyo: false,
            onComplete: function() {
                currentScene.afterMoveComplete();
            }
        });
        this.tweens.add({
            targets: follower,
            movingTime: 1,
            ease: 'linear',
            duration: duration * 0.95,
            yoyo: false
        });
        this.tweens.add({
            targets: follower,
            linearTime: 1,
            ease: 'linear',
            duration: 4000,
            yoyo: false
        });

        locationTitles.forEach(function(locationTitle, i) {
            if (i > 0) {
                path = new Phaser.Curves.Path(locationPositions[i - 1][0], locationPositions[i - 1][1]);
                pathPoints[i - 1].push(locationPositions[i]);
                path.splineTo(pathPoints[i - 1]);

                paths.push(path);

                pathPointImgs = [];
                for (var j = 0; j < pointsNumbers[i-1]; j++) {
                    pos = new Phaser.Math.Vector2();
                    path.getPoint((1 / pointsNumbers[i-1]) * j, pos);

                    imgName = (j == 0) ? 'BigCircle' : 'LittleCircle';
                    if ( progress < i )
                        imgName += 'Empty';
                    imgPathPoint = this.add.image(pos.x, pos.y, imgName );
                    pathPointImgs.push(imgPathPoint);
                }
                allPathPointImgs.push(pathPointImgs);
            }
        }, this);



        locationTitles.forEach(function(locationTitle, i) {
            if (progress >= i) {
                check = this.add.image(locationPositions[i][0], locationPositions[i][1], 'check');
                if (progress == i && !afterStranger && !afterPuzzle ) {
                    this.tweens.add({
                        targets: check,
                        scale: {
                            from: 0,
                            to: 1
                        },
                        ease: 'Bounce.easeOut',
                        duration: 1000,
                        yoyo: false
                    });
                }
            }



            var txtTitle = this.add.text(locationPositions[i][0], locationPositions[i][1] + 70, locationTitles[i], {
                fontFamily: "rotondac_bold",
                color: 'white',
                fontSize: '20px'
            });
            txtTitle.setOrigin(0.5);
            txtTitle.setStroke('black', 2);

        }, this);


        hero = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'hero');
        hero.setOrigin(0, 1);
        hero
            .setInteractive()
            .on('pointerdown', function() {
                type = 'simple';
                if (beforeStranger)
                    type = 'stranger';
                if (beforePuzzle)
                    type = 'puzzle';
                console.log(type);
                this.scene.start('sceneNovel', {
                    dialogIndex: 0,
                    type: type
                });
            }, this);

        debugStr = 'Дебаг: isRaising=' + this.isRaising
            + '\n beforePuzzle=' + beforePuzzle 
            + '\n beforeStranger=' + beforeStranger
            + '\n afterPuzzle=' + afterPuzzle 
            + '\n afterStranger=' + afterStranger      
            + '\n progress=' + progress;
              

        this.add.text(700, 20, debugStr, {
            color: 'white',
            fontSize: '10px'
        });

        this.add.text(900, 20, 'Чит: пройти', {
                color: 'white',
                fontSize: '10px'
            })
            .setInteractive()
            .on('pointerdown', function() {
                progress++;
                this.scene.start('sceneMap', {
                    isRaising: true
                });
            }, this);

        this.add.text(900, 35, 'Чит: лес', {
                color: 'white',
                fontSize: '10px'
            })
            .setInteractive()
            .on('pointerdown', function() {
                this.scene.start('scenePack');
            }, this);

        this.add.text(900, 50, 'Чит: паззл', {
                color: 'white',
                fontSize: '10px'
            })
            .setInteractive()
            .on('pointerdown', function() {
                this.scene.start('scenePuzzle');
            }, this);

    },
    update: function() {

        for (var i = 0; i < pointsNumbers[progress]; i++) {
            imgName = (i == 0) ? 'BigCircle' : 'LittleCircle';
            if (follower.moveProgress >= i / pointsNumbers[progress])
                allPathPointImgs[progress][i].setTexture(imgName);
        }

        paths[progress].getPoint(follower.moveProgress, follower.pos);

        hero.setPosition(follower.pos.x, follower.pos.y);
        hero.setOrigin(0.5, 0.7);

        if (follower.movingTime < 1) {
            hero.angle = Math.sin(follower.linearTime * 50) * 17;
        } else {
            hero.angle = 0;
        }
    },
    afterMoveComplete: function() {
        if (!moveOnlyToMiddle)
            return;

        if (progress == 3 || progress == 4 || progress == 5) {
            stranger = this.add.image(follower.pos.x + 50, follower.pos.y + 50, 'stranger')
                .setOrigin(0.5, 1);

            stranger.scaleY = 0;
            this.tweens.add({
                targets: stranger,
                scaleY: {
                    from: 0,
                    to: 1
                },
                ease: 'Quad.easeOutBack',
                duration: 500,
                yoyo: false
            });
        }

        if ( beforePuzzle )
        {
            this.scene.start('sceneNovel', {
                dialogIndex: 0,
                type: 'puzzle'
            });
        }



    }
});