let paths = [];

const SceneMap = new Phaser.Class({

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
        this.load.image('hero', 'assets/hero.png');
        this.load.image('check', 'assets/check.png');
        this.load.image('LittleCircle', 'assets/LittleCircle.png');
        this.load.image('LittleCircleEmpty', 'assets/LittleCircleEmpty.png');
        this.load.image('BigCircle', 'assets/BigCircle.png');
        this.load.image('BigCircleEmpty', 'assets/BigCircleEmpty.png');

        for ( let i = 1; i <= 3; i++ )
            this.load.image('stranger' + i, 'assets/novel/characters/stranger' + i + '.png');
        this.load.image('btnStartLocation', 'assets/btnStartLocation.png');
        this.load.image('puzzle', 'assets/puzzle.png');

        this.load.spritesheet('bird', 'assets/bird.png', {
            frameWidth: 80,
            frameHeight: 80
        });

        locationTitles = ['Старт', 'ТЦ', 'Остановка', 'Автобус', 'Лес', 'Школа', 'Дом', 'Финиш'];
        locationPositions = [
            [104, 100],
            [180, 278],
            [144, 517],
            [519, 156],
            [961, 98],
            [487, 359],
            [681, 719],
            [890, 699]
        ];
        pathPoints = [
            [158, 179],
            [121, 383],
            [269, 439, 364, 216],
            [691, 157, 827, 85],
            [904, 229, 711, 280, 584, 389],
            [486, 405, 541, 496, 475, 667],
            [831, 717, 860, 718]
        ];
        pointsNumbers = [7, 8, 20, 17, 19, 18, 9];
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


        follower = {
            moveProgress: moveFromMiddle ? 0.4 : 0,
            maxMoveProgress: moveOnlyToMiddle ? 0.4 : 1,
            movingTime: 0,
            linearTime: 0,
            pos: new Phaser.Math.Vector2()
        };

        duration = 0;
        if (this.isRaising)
            duration = 4000;
        if (moveOnlyToMiddle || moveFromMiddle)
            duration *= 0.75;

        mainTween = this.tweens.add({
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
                for (let j = 0; j < pointsNumbers[i - 1]; j++) {
                    pos = new Phaser.Math.Vector2();
                    path.getPoint((1 / pointsNumbers[i - 1]) * j, pos);

                    imgName = (j == 0) ? 'BigCircle' : 'LittleCircle';
                    if (progress < i)
                        imgName += 'Empty';
                    imgPathPoint = this.add.image(pos.x, pos.y, imgName);
                    pathPointImgs.push(imgPathPoint);
                }
                allPathPointImgs.push(pathPointImgs);
            }
        }, this);



        locationTitles.forEach(function(locationTitle, i) {
            if (progress >= i) {
                check = this.add.image(locationPositions[i][0], locationPositions[i][1], 'check');
                if (progress == i && !afterStranger && !afterPuzzle) {
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

        }, this);


        hero = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'hero');
        hero.setOrigin(0, 1);

        this.add.text(1020, 10, ' ', {
                color: 'white',
                fontSize: '10px'
            })
            .setInteractive()
            .on('pointerdown', function() {

                if (follower.moveProgress < follower.maxMoveProgress) {
                    mainTween.stop();
                    follower.moveProgress = follower.maxMoveProgress;
                    currentScene.afterMoveComplete();
                } else {
                    if (progress == 2 && passedPuzzlesNumber == 0)
                        passedPuzzlesNumber++;
                    else if (progress == 3 && passedStrangersNumber == 0)
                        passedStrangersNumber++;
                    else if (progress == 4 && passedStrangersNumber == 1)
                        passedStrangersNumber++;
                    else if (progress == 5 && passedStrangersNumber == 2)
                        passedStrangersNumber++;
                    else
                        progress++;

                    this.scene.start('sceneMap', {
                        isRaising: true
                    });
                }


            }, this);

        bird = this.add.sprite(0, this.cameras.main.centerY, 'bird');

        this.anims.create({
            key: 'default',
            frames: this.anims.generateFrameNumbers('bird', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        bird.anims.play('default');
        bird.pos = new Phaser.Math.Vector2();
        bird.tangent = new Phaser.Math.Vector2();
        currentScene.letBirdFly(bird);

        if ( passedPuzzlesNumber >= 1 )
            this.add.image(316,318, 'puzzle');
        if ( passedStrangersNumber >= 1 )
            this.add.image(734,151, 'stranger1').setOrigin(0.5,1).setScale(0.65);   
        if ( passedStrangersNumber >= 2 )
            this.add.image(761,262, 'stranger2').setOrigin(0.5,1).setScale(0.65);    
        if ( passedStrangersNumber >= 3 )
            this.add.image(500,580, 'stranger3').setOrigin(0.5,1).setScale(0.65);    

                

    },
    letBirdFly: function(bird) {
        bird.progress = 0;
        bird.path = new Phaser.Curves.Path(Math.random() > 0.5 ? -200 : 1224, Math.random() * 768);
        bird.points = [];
        for (let i = 0; i < Math.random() * 4 + 7; ++i) {
            bird.points.push(Math.random() * 1024, Math.random() * 768);
        }
        bird.points.push(Math.random() > 0.5 ? -200 : 1224, Math.random() * 768);
        bird.path.splineTo(bird.points);
        this.tweens.add({
            targets: bird,
            progress: 1,
            ease: 'linear',
            duration: bird.path.getLength() * 10,
            yoyo: false,
            onComplete: function() {
                currentScene.letBirdFly(bird);
            }
        });
    },
    update: function() {

        for (let i = 0; i < pointsNumbers[progress]; i++) {
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

        bird.path.getPoint(bird.progress, bird.pos);
        bird.path.getTangent(bird.progress, bird.tangent);

        bird.setPosition(bird.pos.x, bird.pos.y);
        bird.flipX = bird.tangent.x < 0;

    },
    afterMoveComplete: function() {
        currentScene = this;
        btnStartLocation = this.add.image( Math.min(follower.pos.x, 928), Math.min( follower.pos.y + 50, 745), 'btnStartLocation');
        btnStartLocation.setScale(0);
        btnStartLocation.setOrigin(0.5);
        btnStartLocation.setInteractive()
            .on('pointerdown', function() {
                currentScene.btnStartLocationClicked();
            }, this);

        this.tweens.add({
            targets: btnStartLocation,
            scale: {
                from: 0,
                to: 1
            },
            ease: 'Quad.easeOutBack',
            duration: 250,
            yoyo: false
        });

        if (beforeStranger ) {
            stranger = this.add.image(follower.pos.x - 70, follower.pos.y + 40, 'stranger' + (passedStrangersNumber + 1))
                .setOrigin(0.5, 1);

            stranger.scaleY = 0;
            stranger.scaleX = 0.65;
            this.tweens.add({
                targets: stranger,
                scaleY: {
                    from: 0,
                    to: 0.65
                },
                ease: 'Quad.easeOutBack',
                duration: 300,
                yoyo: false
            });
        } 

        if (beforePuzzle || progress == 6 ) {
            puzzle = this.add.image(follower.pos.x + 80, follower.pos.y, 'puzzle')
                .setOrigin(0.5, 0.5)
                .setScale(0);

            this.tweens.add({
                targets: puzzle,
                scale: {
                    from: 0,
                    to: 1
                },
                ease: 'Quad.easeOutBack',
                duration: 500,
                yoyo: false
            });
        }

        this.children.bringToTop(bird);
    },
    btnStartLocationClicked: function() {
        type = 'simple';
        if (beforeStranger)
            type = 'stranger';
        if (beforePuzzle)
            type = 'puzzle';
        this.scene.start('sceneNovel', {
            dialogIndex: 0,
            type: type
        });
    }
});