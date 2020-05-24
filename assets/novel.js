const SceneNovel = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function SceneNovel() {

            Phaser.Scene.call(this, {
                key: 'sceneNovel'
            });
        },

    init: function(data) {
        previousNovelType = data.type;

        if (data.type == 'simple') {
            novel = novels[progress];
        } else if (data.type == 'stranger') {
            novel = stranger_novels[passedStrangersNumber];
        } else if (data.type == 'puzzle') {
            novel = puzzle_novel;
        }

        dialog = novel.dialogs[data.dialogIndex];
        locationName = novel.locationName;
        question = dialog.question;
        answers = dialog.answers;
    },

    preload: function() {
        this.load.image('back' + locationName, 'assets/novel/' + locationName + 'Back.png');

        this.load.image('BarHitArea', 'assets/novel/VariantHitArea.png');
        this.load.image('Bar', 'assets/novel/Variant.png');
        this.load.image('BarChosen', 'assets/novel/VariantChosen.png');

        this.load.image('SquareHitArea', 'assets/novel/SquareHitArea.png');
        this.load.image('Square', 'assets/novel/Square.png');
        this.load.image('SquareChosen', 'assets/novel/SquareChosen.png');

        this.load.image('Title', 'assets/novel/Title.png');
        if ( dialog.type == 'character' )
            this.load.image('Character' + dialog.characterImg, 'assets/novel/characters/' + dialog.characterImg + '.png' );

        if ( dialog.type == 'squares')
        {
            answers.forEach(function(answer, i) {
            this.load.image('portrait' + i, 'assets/novel/characters/' + answer.img + '.png');
        }, this);
        }
        
    },

    create: function() {

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'back' + locationName);

        imgTitle = this.add.image(this.cameras.main.centerX, dialog.type == 'squares' ? 70 : 165, 'Title');
        imgTitle.setAlpha(0);
        if (dialog.type == 'squares')
            imgTitle.setScale(1, 0.35);        

        txtQuestion = this.add.text(this.cameras.main.centerX, dialog.type == 'squares' ? 70 : 165, question, {
            color: 'black',
            fontFamily: "rotondac",
            fontSize: '30px',
            wordWrap: {
                width: 900,
                useAdvancedWrap: true
            }
        });
        txtQuestion.setOrigin(0.5);

        if ( dialog.type == 'character' )
        {
            txtQuestion.setX(320);
            txtQuestion.setAlign('left');
            txtQuestion.setOrigin(0, 0.5);
            txtQuestion.setWordWrapWidth(640);

            imgCharacter = this.add.image(190, 170, 'Character' + dialog.characterImg );
        }

        this.tweens.add({
            targets: [imgTitle, txtQuestion],
            alpha: {
                from: 0,
                to: 1
            },
            duration: 500,
            ease: 'Quad.easeOut'
        });
        txtQuestion.setAlpha(0);

        answers.forEach(function(answer, i) {
            answer.isOver = false;
            answer.side = i % 2 * 2 - 1;

            answer.text = answer.text.replace('%name%', playerName);

            if (dialog.type == 'squares') {
                answer.posX = this.cameras.main.centerX + 300 * (i%3 - 1);
                answer.posY = Math.floor(i / 3) * 287 + 300;

                answer.back = this.add.image(-1000, answer.posY, 'Square');

                answer.backChosen = this.add.image(-1000, answer.posY, 'SquareChosen')
                    .setVisible(false);

                answer.txtAnswer = this.add.text(-1000, answer.posY + 100, '', {
                        fontFamily: "rotondac",
                        color: 'black',
                        fontSize: '25px'
                    })
                    .setOrigin(0.5);

                answer.portrait = this.add.image(-1000, answer.posY, 'portrait' + i);

                answer.hitArea = this.add.image(answer.posX, answer.posY, 'SquareHitArea');

                answer.animatedWidgets = [answer.back, answer.backChosen, answer.txtAnswer, answer.portrait];
            } else {
                answer.posX = this.cameras.main.centerX;
                answer.posY = 360 + i * 100;

                answer.back = this.add.image(-1000, answer.posY, 'Bar');

                answer.backChosen = this.add.image(-1000, answer.posY, 'BarChosen')
                    .setVisible(false);

                answer.txtAnswer = this.add.text(-1000, answer.posY, answer.text, {
                        fontFamily: "rotondac",
                        color: 'black',
                        fontSize: '25px',
                        wordWrap: {
                            width: 600,
                            useAdvancedWrap: true
                        }
                    })
                    .setOrigin(0.5);

                answer.hitArea = this.add.image(this.cameras.main.centerX, answer.posY, 'BarHitArea');

                answer.animatedWidgets = [answer.back, answer.backChosen, answer.txtAnswer];
            }


            answer.hitArea
                .setInteractive()
                .on('pointerover', function() {
                    answer.isOver = true;
                    this.refreshAnswerVisual(answer);
                }, this)
                .on('pointerout', function() {
                    answer.isOver = false;
                    this.refreshAnswerVisual(answer);
                }, this)
                .on('pointerdown', function() {
                    this.actionOnClick(answer);
                }, this);

            this.refreshAnswerVisual(answer);



            this.tweens.add({
                targets: answer.animatedWidgets,
                x: {
                    from: this.cameras.main.centerX + 1000 * answer.side,
                    to: answer.posX
                },
                duration: 500,
                ease: 'Quad.easeOutBack'
            });

        }, this);
    },
    refreshAnswerVisual: function(answer) {
        if (dialog.type == 'squares') {
            answer.txtAnswer.setStroke('#ffffff', answer.isOver ? 2 : 0);
        } else {
            answer.txtAnswer.setShadow(0, 0, '#eeeeee', answer.isOver ? 4 : 0, true, true);
            answer.txtAnswer.setColor(answer.isOver ? 'white' : 'black');
        }
        answer.back.setVisible(!answer.isOver);
        answer.backChosen.setVisible(answer.isOver);
    },
    actionOnClick: function(chosenAnswer) {

        answers.forEach(function(answer, i) {
            let side = i % 2 * 2 - 1;
            this.tweens.add({
                targets: answer.animatedWidgets,
                x: {
                    from: answer.posX,
                    to: this.cameras.main.centerX + 1000 * side
                },
                duration: 500,
                ease: 'Quad.easeInOut'
            });
        }, this);

        currentScene = this;
        headerParts = [imgTitle, txtQuestion];
        if ( dialog.type == 'character' )
            headerParts.push(imgCharacter);
        this.tweens.add({
            targets: headerParts,
            alpha: {
                from: 1,
                to: 0
            },
            duration: 500,
            ease: 'Quad.easeOut',
            onComplete: function() {
                currentScene.switchToNext(chosenAnswer);
            }
        });
    },
    switchToNext: function(chosenAnswer) {
        if (chosenAnswer.type == 'win') {
            this.scene.start('sceneWin');
        } else if (chosenAnswer.type == 'fail') {
            this.scene.start('sceneFail', {
                comment: chosenAnswer.comment
            });
        } else if (chosenAnswer.type == 'bag') {
            this.scene.start('scenePack');
        } else if (chosenAnswer.type == 'puzzle') {
            this.scene.start('scenePuzzle');
        } else {
            this.scene.start('sceneNovel', {
                dialogIndex: chosenAnswer.nextDialog,
                type: previousNovelType
            });
        }
    }
});