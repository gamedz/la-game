playerName = '';
progress = 0;
passedStrangersNumber = 0;
passedPuzzlesNumber = 0;

novels = [];

novel = {};
novel.locationName = 'Shop';
novel.dialogs = [];

dialog = {};
dialog.answers = [];
dialog.question = 'Выходной день. Вы с мамой идете по торговому центру.​ Маме интересны скидки на обувь, а ты вдруг видишь в витрине магазина игрушек большую и очень интересную статую динозавра.​ Ты останавливаешься, чтобы ее разглядеть. И вдруг ты понимаешь, что ты остался один. Что ты будешь делать?​';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Стоять на месте​.',
    nextDialog: 1
});
dialog.answers.push({
    text: 'Остановиться. Оглядеться. Окликнуть: «Мамааа!»​',
    nextDialog: 4
});
dialog.answers.push({
    text: 'Обратиться к кому-нибудь за помощью​.',
    nextDialog: 2
});
dialog.answers.push({
    text: 'Пойти ее искать в магазины с обувью​.',
    type: 'fail',
    comment: 'Где бы ты ни потерялся - помни «Правило трех О»​: \r\n - Остановись\r\n - Оглянись\r\n - Окликни\r\nНе уходи далеко с места, так тебя будет проще найти!'
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Ты стоишь на месте около динозавра.';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Продолжать стоять.',
    nextDialog: 1
});
dialog.answers.push({
    text: 'Стоять и кричать «МАААААМААА!!!»​',
    nextDialog: 4
});
dialog.answers.push({
    text: 'Обратиться к кому-нибудь за помощью​.',
    nextDialog: 2
});
dialog.answers.push({
    text: 'Пойти ее искать в магазины с обувью​.',
    type: 'fail',
    comment: 'Где бы ты ни потерялся - помни «Правило трех О»​: \r\n - Остановись\r\n - Оглянись\r\n - Окликни\r\nНе уходи далеко с места, так тебя будет проще найти!'
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'К кому ты обратишься за помощью?';
dialog.type = 'squares';
dialog.answers.push({
    text: '',
    img: 'man2',
    type: 'fail',
    comment: 'Не доверяй незнакомым людям! Обратись к работнику торгового центра - например, кассиру или охраннику.'
});
dialog.answers.push({
    text: '',
    img: 'man1',
    type: 'fail',
    comment: 'Не доверяй незнакомым людям! Обратись к работнику торгового центра - например, кассиру или охраннику.'
});
dialog.answers.push({
    text: '',
    img: 'woman',
    nextDialog: 4
});
dialog.answers.push({
    text: '',
    img: 'man3',
    type: 'fail',
    comment: 'Не доверяй незнакомым людям! Обратись к работнику торгового центра - например, кассиру или охраннику.'
});
dialog.answers.push({
    text: '',
    img: 'grandma',
    type: 'fail',
    comment: 'Не доверяй незнакомым людям! Обратись к работнику торгового центра - например, кассиру или охраннику.'
});
dialog.answers.push({
    text: '',
    img: 'worker',
    nextDialog: 3
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = '«Добрый день. Вам нужна помощь?»​';
dialog.type = 'character';
dialog.characterImg = 'worker';
dialog.answers.push({
    text: 'Застесняться и убежать',
    type: 'fail',
    comment: 'Смелее! Сделай объявление по громкой связи!'
});
dialog.answers.push({
    text: '«Меня зовут %name%, помогите мне найти маму. Можно сделать объявление?»',
    nextDialog: 6
});

novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'На твой зов подходит незнакомая женщина с ребенком и спрашивает:\r\n«Что такое? Ты потерялся? Пойдем поищем твоих родителей»​.';
dialog.type = 'character';
dialog.characterImg = 'woman';
dialog.answers.push({
    text: 'Нет, можно я лучше позвоню маме с вашего телефона? Ее номер - +79.......​',
    nextDialog: 5
});
dialog.answers.push({
    text: 'Пойдемте!',
    type: 'fail',
    comment: 'Где бы ты ни потерялся - помни «Правило трех О»​:\r\n - Остановись\r\n - Оглянись\r\n - Окликни\r\nНе уходи далеко с места, так тебя будет проще найти!'
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Ты дозвонился до мамы.\r\n«Ты где? Я тебя потеряла!»​';
dialog.type = 'character';
dialog.characterImg = 'mother';
dialog.answers.push({
    text: '«Я около магазина “Динозавры для дома”, около большого динозавра.»​',
    type: 'win'
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Работник торгового центра говорит в микрофон, и ты сразу слышишь его голос из всех динамиков:\r\n«Внимание, внимание! Родители ребенка по имени %name%, просим вас срочно подойти к магазину “Динозавры для дома”! Повторяю...»​';
dialog.type = 'character';
dialog.characterImg = 'worker';
dialog.answers.push({
    text: 'Вот и здорово! Осталось только дождаться маму на условленном месте!',
    type: 'win'
});
novel.dialogs.push(dialog);

novels.push(novel);

novel = {};
novel.locationName = 'Bus1';
novel.dialogs = [];

dialog = {};
dialog.answers = [];
dialog.question = 'Вы с мамой купили все необходимое и ждете на остановке. Подъезжает троллейбус, мама заходит в него, а ты внезапно спотыкаешься о бордюр и падаешь. Двери троллейбуса захлопываются и он уезжает. Что делать?';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Стоять на месте и ждать.',
    nextDialog: 1
});
dialog.answers.push({
    text: 'Побежать вслед троллейбусу.',
    type: 'fail',
    comment: 'Не надо никуда бежать! Мама сама за тобой приедет.'
});
dialog.answers.push({
    text: 'Сесть в следующий троллейбус и попытаться ее догнать.',
    type: 'fail',
    comment: 'Не уезжай оттуда, где ты потерялся. Мама запутается, на какой остановке тебя искать.'
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Ты стоишь на остановке. Ничего не происходит.';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Продолжать стоять на месте и ждать.',
    nextDialog: 2
});
dialog.answers.push({
    text: 'Побежать вслед троллейбусу.',
    type: 'fail',
    comment: 'Не надо никуда бежать! Мама сама за тобой приедет.'
});
dialog.answers.push({
    text: 'Сесть в следующий троллейбус и попытаться ее догнать.',
    type: 'fail',
    comment: 'Не уезжай оттуда, где ты потерялся. Мама запутается, на какой остановке тебя искать.'
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Наконец, ты видишь впереди маму, бегущую навстречу. Она, конечно же, сразу обнаружила, что уехала без тебя, вышла на ближайшей остановке и вернулась назад.';
dialog.type = 'character';
dialog.characterImg = 'mother';
dialog.answers.push({
    text: 'Ура!',
    type: 'win'
});
novel.dialogs.push(dialog);
novels.push(novel);


novel = {};
novel.locationName = 'Bus2';
novel.dialogs = [];

dialog = {};
dialog.answers = [];
dialog.question = 'Вам нужно пересаживаться на автобус. Теперь-то все под контролем, и мама никуда не потеряется! Подходит нужный номер, и ты решительно заходишь в салон первым. Но что такое? Мама загляделась в телефон и не успела за тобой. Что же делать?';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Спокойно ехать домой. Мама приедет позже.',
    type: 'fail',
    comment: 'Мама будет тебя искать на ближайшей остановке. Если ты уедешь домой, она проищет тебя целый день!'
});
dialog.answers.push({
    text: 'Ехать до конечной.',
    type: 'fail',
    comment: 'Мама будет тебя искать на ближайшей остановке. Если ты уедешь дальше, она проищет тебя целый день!'
});
dialog.answers.push({
    text: 'Попросить водителя открыть на следующей остановке и выйти.',
    nextDialog: 1
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Ты вышел на следующей остановке. Что теперь?';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Стоять на месте и ждать',
    nextDialog: 2
});
dialog.answers.push({
    text: 'Пойти назад, туда, где осталась мама.',
    type: 'fail',
    comment: 'Не надо никуда уходить! Мама сама за тобой приедет.'
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Очень скоро на другом автобусе приезжает мама.';
dialog.type = 'character';
dialog.characterImg = 'mother';
dialog.answers.push({
    text: '«Мам, не теряйся больше, пожалуйста.»',
    type: 'win'
});
novel.dialogs.push(dialog);

novels.push(novel);

novel = {};
novel.locationName = 'Forest';
novel.dialogs = [];

dialog = {};
dialog.answers = [];
dialog.question = 'Вы с бабушкой собираетесь идти за ягодами в лес. Вот здорово! Что ты возьмешь с собой?';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Собрать рюкзак',
    type: 'bag'
});
novel.dialogs.push(dialog);
novels.push(novel);

novel = {};
novel.locationName = 'School';
novel.dialogs = [];

dialog = {};
dialog.answers = [];
dialog.question = 'Ты очень устал после тяжелого дня в школе. Вечереет. Хочется побыстрей домой - ужинать и смотреть любимый мультик. Как ты будешь выбирать путь?';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Через хорошо освещенный парк.',
    nextDialog: 1
});
dialog.answers.push({
    text: 'По обочине шоссе',
    type: 'fail',
    comment: 'Не ходи вдоль дороги без тротуара, тебя может сбить автомобиль!'
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Как дальше?';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Сейчас ведь еще стоит лед – можно попробовать пройти по замерзшему озеру!',
    type: 'fail',
    comment: 'Даже если лед выглядит прочным, он может проломиться в любом месте! Не ходи по замерзшим рекам и озерам.'
});
dialog.answers.push({
    text: 'Обойти озеро по берегу.',
    nextDialog: 2
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Как дальше?';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Обойду через детскую площадку.',
    nextDialog: 3
});
dialog.answers.push({
    text: 'Сокращу путь через гаражи.',
    type: 'fail',
    comment: 'Выбирай освещенные и людные дороги!'
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Как дальше?';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Срежу через пустырь.',    
    type: 'fail',
    comment: 'Выбирай освещенные и людные дороги!'
});
dialog.answers.push({
    text: 'Лучше пройду по освещенным улицам.',
    type: 'win'
});
novel.dialogs.push(dialog);

novels.push(novel);

novel = {};
novel.locationName = 'Home';
novel.dialogs = [];

dialog = {};
dialog.answers = [];
dialog.question = 'В школе объявили карантин. Целый день придется сидеть дома. Одному... Но вдруг раздается звонок в дверь. Ты спрашиваешь: «Кто там?» В ответ – молчание. Что надо сделать?';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Открыть.',
    type: 'fail',
    comment: 'Никому не открывай, когда ты дома один! У твоих близких есть ключи.'
});
dialog.answers.push({
    text: 'Не открывать.',
    nextDialog: 1
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Снова звонок.';
dialog.type = 'simple';
dialog.answers.push({
    text: '«Кто там?»',
    nextDialog: 2
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = '«Откройте, почта.»';
dialog.type = 'character';
dialog.characterImg = 'unknown_man';
dialog.answers.push({
    text: 'Открыть.',
    type: 'fail',
    comment: 'Никому не открывай, когда ты дома один! Почтальон справится сам.'
});
dialog.answers.push({
    text: 'Не открывать.',
    nextDialog: 3
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Проходит время. Снова раздается звонок.';
dialog.type = 'simple';
dialog.answers.push({
    text: '«Кто там?»',
    nextDialog: 4
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = '«Это бабушка.»';
dialog.type = 'character';
dialog.characterImg = 'unknown_woman';
dialog.answers.push({
    text: 'Открыть.',
    type: 'fail',
    comment: 'Никому не открывай, когда ты дома один! Злоумышленник может притвориться твоим родственником, как в сказке про волка и козлят.'
});
dialog.answers.push({
    text: '«Назови пароль!»',
    nextDialog: 5
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'У вас в семье есть свой пароль? Если еще нет – обязательно придумайте его, чтобы отличать своих от чужих.';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Отличная идея!',
    nextDialog: 6
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Опять раздается звонок в дверь.';
dialog.type = 'simple';
dialog.answers.push({
    text: '«Кто там?»',
    nextDialog: 7
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = '«Мама.»';
dialog.type = 'character';
dialog.characterImg = 'unknown_woman';
dialog.answers.push({
    text: 'Открыть.',
    type: 'fail',
    comment: 'Никому не открывай, когда ты дома один! Злоумышленник может притвориться твоим родственником, как в сказке про волка и козлят.'
});
dialog.answers.push({
    text: '«Назови пароль!»',
    nextDialog: 8
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = '«Не помню. Я устала, открой пожалуйста.»';
dialog.type = 'character';
dialog.characterImg = 'unknown_woman';
dialog.answers.push({
    text: 'Открыть.',
    type: 'fail',
    comment: 'Никому не открывай, когда ты дома один! Злоумышленник может притвориться твоим родственником, как в сказке про волка и козлят.'
});
dialog.answers.push({
    text: '«Назови пароль!»',
    nextDialog: 9
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = '«Хватит дурачиться! Открывай сейчас же!!!»';
dialog.type = 'character';
dialog.characterImg = 'unknown_woman';
dialog.answers.push({
    text: 'Открыть.',
    type: 'fail',
    comment: 'Никому не открывай, когда ты дома один! Злоумышленник может притвориться твоим родственником, как в сказке про волка и козлят.'
});
dialog.answers.push({
    text: 'Не открывать.',
    nextDialog: 10
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Хм... очень подозрительная ситуация! Пожалуй, нужно...';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Позвонить маме по телефону и убедиться, что это не она!',
    nextDialog: 11
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Мама перепугалась не на шутку. Она вызвала полицию, чтобы поймать этих злоумышленников! Раздается звонок в домофон. «Откройте, это полиция!»';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Открыть.',
    type: 'fail',
    comment: 'Никому не открывай, когда ты дома один! Вдруг это не полицейский, а грабитель?'
});
dialog.answers.push({
    text: '«Взрослых нет дома, я не буду открывать».',
    type: 'win'
});
novel.dialogs.push(dialog);

novels.push(novel);

novel = {};
novel.locationName = 'Finish';
novel.dialogs = [];

dialog = {};
dialog.answers = [];
dialog.question = 'Молодец! Ты проявил отличные знания в области собственной безопасности! Осталось последнее задание...';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Начать!',
    type: 'puzzle'
});
novel.dialogs.push(dialog);

novels.push(novel);



stranger_novels = []; 

novel = {};
novel.locationName = 'Stranger';
novel.dialogs = [];
dialog = {};
dialog.answers = [];
dialog.question = 'К тебе подходит человек. Он говорит: «Представляешь, я нашел за гаражами, неподалеку, трех щенков! Хочешь посмотреть?»';
dialog.type = 'character';
dialog.characterImg = 'stranger1';
dialog.answers.push({
    text: '«Да, хочу!»',
    type: 'fail',
    comment: 'Избегай незнакомых людей. Громко скажи "Я тебя не знаю!" или "Пожар", чтобы привлечь внимание и испугать преступника.'
});
dialog.answers.push({
    text: '«Мне не разрешают общаться с незнакомыми.»',
    nextDialog: 1
});
dialog.answers.push({
    text: 'Кричать «Я тебя не знаю!»',
    nextDialog: 2
});
dialog.answers.push({
    text: 'Кричать «ПОЖАААР!»',
    nextDialog: 2
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Тогда давай знакомиться. Меня зовут Аркадий Валентинович.';
dialog.type = 'character';
dialog.characterImg = 'stranger1';
dialog.answers.push({
    text: '«А меня зовут %name%, я живу вон в том доме.»',
    type: 'fail',
    comment: 'Избегай незнакомых людей. Никогда не говори им своё имя и адрес.'
});
dialog.answers.push({
    text: 'Кричать «Я тебя не знаю!»',
    nextDialog: 2
});
dialog.answers.push({
    text: 'Кричать «ПОЖАААР!»',
    nextDialog: 2
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Мужчина теряется и убегает.';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Это обычная уловка похитителей детей! Позвоню родителям и расскажу про этот случай.',
    type: 'win'
});
novel.dialogs.push(dialog);

stranger_novels.push( novel );

novel = {};
novel.locationName = 'Stranger';
novel.dialogs = [];
dialog = {};
dialog.answers = [];
dialog.question = 'По дороге в школу к тебе подходит незнакомый парень в кепке. Он говорит: «У меня есть на планшете интересная игра, хочешь дам поиграть?»';
dialog.type = 'character';
dialog.characterImg = 'stranger2';
dialog.answers.push({
    text: '«Да, хочу!»',
    type: 'fail',
    comment: 'Избегай незнакомых людей. Громко скажи "Я тебя не знаю!" или "Пожар", чтобы привлечь внимание и испугать преступника.'
});
dialog.answers.push({
    text: 'Кричать «Я тебя не знаю!»',
    nextDialog: 1
});
dialog.answers.push({
    text: 'Кричать «ПОЖАААР!»',
    nextDialog: 1
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Парень убегает, роняя на ходу свою кепку.';
dialog.type = 'simple';
dialog.answers.push({
    text: 'То-то же, как напугался! Это точно похититель детей!',
    type: 'win'
});
novel.dialogs.push(dialog);

stranger_novels.push( novel );

novel = {};
novel.locationName = 'Stranger';
novel.dialogs = [];
dialog = {};
dialog.answers = [];
dialog.question = 'На детской площадке к тебе подходит незнакомая женщина. Она говорит: «Ты знаешь, твоя бабушка попросила меня тебя найти, ей очень нужна твоя помощь! Пойдем, я тебя провожу!»';
dialog.type = 'character';
dialog.characterImg = 'stranger3';
dialog.answers.push({
    text: 'Бабушка в беде, ей нужна помощь! Нельзя терять ни минуты!',
    type: 'fail',
    comment: 'Преступник может быть очень изобретательным и сыграть на твоих добрых чувствах.'
});
dialog.answers.push({
    text: 'Кричать «Я тебя не знаю!»',
    nextDialog: 1
});
dialog.answers.push({
    text: 'Кричать «ПОЖАААР!»',
    nextDialog: 1
});
dialog.answers.push({
    text: 'Достать телефон и позвонить бабушке.',
    nextDialog: 1
});
novel.dialogs.push(dialog);

dialog = {};
dialog.answers = [];
dialog.question = 'Женщина начинает беспокойно озираться и убегает.';
dialog.type = 'simple';
dialog.answers.push({
    text: 'Надо быстрее поговорить с бабушкой по телефону и убедиться, что у нее все хорошо!',
    type: 'win'
});
novel.dialogs.push(dialog);

stranger_novels.push( novel );



puzzle_novel = {};
puzzle_novel.locationName = 'Bus2';
puzzle_novel.dialogs = [];
dialog = {};
dialog.answers = [];
dialog.answers.push({
    text: 'Собрать паззл!',
    type: 'puzzle'
});
dialog.question = 'Вы попали в пробку. Самое время собрать паззл, чтобы не скучать!';
dialog.type = 'simple';
puzzle_novel.dialogs.push(dialog);