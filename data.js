// Fictional buyer records. Policy references are verified public A Better Bid articles.
export const industries = {
  onboarding: {
    name:'Допуск к торгам', topic:'Почему не могу участвовать?', client:'Анна', initials:'АК', ref:'DEMO-P1048',
    context:'Проверка демо-профиля', source:'Демо-профиль · DEMO-P1048', outcome:'Покупателю понятен следующий шаг',
    policyMessages:[4,6],sourceLabel:'Официальное руководство по регистрации', sourceUrl:'https://help.abetter.bid/hc/user-guide/articles/1771497217-car-auction-getting-started-guide',
    visual:{title:'Готовность к аукциону',subtitle:'Профиль DEMO-P1048 · вымышленный',items:[['Аккаунт создан','done'],['Проверка личности','active'],['Допуск к торгам','pending']]},
    messages:[
      ['agent','Здравствуйте! Я AI-помощник «{company}». Помогу разобраться с участием в аукционе.'],
      ['client','Я зарегистрировалась, но не могу участвовать в торгах. Чего не хватает?'],
      ['agent','В вашем демо-профиле не завершена проверка личности. Для участия в live-торгах нужен документ, загруженный в личном кабинете.'],
      ['client','Мне нужно прислать паспорт сюда?'],
      ['agent','Нет. Документ загружается в личном кабинете A Better Bid. В этом демонстрационном чате документы не принимаются.'],
      ['client','Понятно. Где посмотреть порядок действий?'],
      ['agent','В официальном руководстве описаны регистрация, выбор членства, Buying Power и проверка личности. Ссылка доступна под диалогом.'],
    ],
    questions:[
      ['С чего начать участие в торгах?','Руководство описывает создание аккаунта, выбор членства, настройку Buying Power, загрузку ID и контактных данных. Демонстрация не проверяет настоящий аккаунт.','https://help.abetter.bid/hc/user-guide/articles/1771497217-car-auction-getting-started-guide'],
      ['Что такое Buying Power?','Buying Power определяет доступный размер ставок и количество автомобилей для участия. Он связан с обеспечительным депозитом. Конкретный лимит нужно смотреть в аккаунте; демо его не рассчитывает.','https://help.abetter.bid/hc/user-guide/articles/1771497180-what-is-buying-power'],
      ['Куда загружать документ?','Для live-торгов руководство предусматривает загрузку ID через аккаунт платформы. В этом прототипе нет формы приёма документов и доступа к проверке личности.','https://help.abetter.bid/hc/user-guide/articles/1771497217-car-auction-getting-started-guide'],
      ['Какие сборы учитывать?','Помимо цены лота, справка указывает аукционные сборы, сборы A Better Bid и применимые налоги. Для детализации есть официальный калькулятор. Агент не выдаёт вымышленную окончательную стоимость.','https://help.abetter.bid/hc/user-guide/articles/1771497199-what-fees-are-added-to-the-winning-bid-or-the-buy-it-now-price'],
    ],
  },
  shipping:{
    name:'Доставка автомобиля',topic:'Что с доставкой моего авто?',client:'Михаил',initials:'МП',ref:'DEMO-L2048',
    context:'Доставка · Toyota Camry 2021',source:'Демо-логистика · DEMO-L2048',outcome:'Клиент знает статус и способ уточнения доставки',
    policyMessages:[4,6],sourceLabel:'Официальная справка о доставке',sourceUrl:'https://help.abetter.bid/hc/user-guide/articles/1771497223-shipping',
    visual:{title:'Toyota Camry · 2021',subtitle:'DEMO-L2048 · вымышленный лот',items:[['Заявка принята','done'],['Назначение перевозчика','active'],['Доставка','pending']]},
    messages:[
      ['agent','Здравствуйте! Я AI-помощник «{company}». Подскажу по доставке автомобиля.'],
      ['client','Выиграл автомобиль. Демо-лот DEMO-L2048. Что с доставкой?'],
      ['agent','В демонстрационной заявке на Toyota Camry доставка запрошена. Перевозчик ещё не назначен; подтверждённой даты пока нет.'],
      ['client','А сколько будет стоить перевозка?'],
      ['agent','На странице автомобиля есть предварительный расчёт. Точную стоимость можно запросить у команды через официальный чат или email.'],
      ['client','Можно просто приехать и уехать на машине?'],
      ['agent','По правилам A Better Bid автомобиль забирает лицензированный и застрахованный перевозчик. Уехать своим ходом с площадки нельзя.'],
    ],
    questions:[
      ['Как получить стоимость доставки?','На странице лота есть предварительная оценка. Точную стоимость предлагает команда доставки через официальный чат или email. Фиксированные цены и даты в демо не обещаются.','https://help.abetter.bid/hc/user-guide/articles/1771497223-shipping'],
      ['Можно забрать автомобиль своим ходом?','В справке указано: выдача производится лицензированной и застрахованной транспортной компании, независимо от состояния авто. Самостоятельно уехать с площадки нельзя.','https://help.abetter.bid/hc/user-guide/articles/1771497207-may-i-pick-up-the-vehicle-by-myself-and-drive-it-home'],
      ['Какой статус у DEMO-L2048?','Это вымышленная карточка: заявка принята, перевозчик не назначен, дата не подтверждена. Этот статус не получен из A Better Bid и не относится к реальному автомобилю.'],
      ['Что с международной доставкой?','Раздел доставки описывает доставку по США и до портов. Конкретный маршрут, стоимость и условия нужно уточнять у команды. Демо не рассчитывает таможенные платежи.','https://help.abetter.bid/hc/user-guide/articles/1771497223-shipping'],
    ],
  },
  documents:{
    name:'Документы после покупки',topic:'Где документы на автомобиль?',client:'Елена',initials:'ЕС',ref:'DEMO-L3086',
    context:'Документы · Honda CR-V 2020',source:'Демо-карточка · DEMO-L3086',outcome:'Клиент понимает порядок получения документов',
    policyMessages:[4],sourceLabel:'Официальная справка о документах',sourceUrl:'https://help.abetter.bid/hc/user-guide/articles/1771497206-when-will-i-receive-my-ownership-documents',
    visual:{title:'Honda CR-V · 2020',subtitle:'DEMO-L3086 · вымышленный лот',items:[['Авто вывезено','done'],['Обработка документов','active'],['Отправка и трек-номер','pending']]},
    messages:[
      ['agent','Здравствуйте! Я AI-помощник «{company}». Помогу с вопросом о документах.'],
      ['client','Автомобиль уже вывезли с площадки. Демо-лот DEMO-L3086. Где документы?'],
      ['agent','В демонстрационной карточке документы находятся в обработке. Отправка пока не отмечена; трек-номера нет.'],
      ['client','Как я узнаю, что их отправили?'],
      ['agent','Согласно справке A Better Bid, после обработки и отправки документов приходит email с номером отслеживания FedEx.'],
      ['client','Можно узнать точную дату?'],
      ['agent','В демо подтверждённой даты нет. Для конкретного лота её нужно уточнять у команды; не буду обещать срок без данных.'],
    ],
    questions:[
      ['Когда придут документы?','Справка описывает общий порядок и сроки, включая исключения по штатам. Для конкретного лота нужен актуальный статус. Демо не обещает универсальную дату получения.','https://help.abetter.bid/hc/user-guide/articles/1771497206-when-will-i-receive-my-ownership-documents'],
      ['Где найти трек-номер?','Справка указывает email с номером отслеживания FedEx после обработки и отправки документов. В вымышленном DEMO-L3086 отправка ещё не отмечена.','https://help.abetter.bid/hc/user-guide/articles/1771497206-when-will-i-receive-my-ownership-documents'],
      ['Где проверить зачисление оплаты?','Инструкция описывает email-подтверждение и раздел Transaction List в аккаунте. Демо не подтверждает оплату и не содержит банковских реквизитов.','https://help.abetter.bid/hc/user-guide/articles/1771497223-paying-for-a-won-vehicle'],
      ['Когда подключить специалиста?','Если нужна проверка конкретного срока, платежа или спорного статуса. Демонстрация собирает вопрос и номер лота для сотрудника, но не создаёт реального обращения.'],
    ],
  },
};
export const conversations=[
  {id:'ABB-1048',name:'Анна К.',initials:'АК',channel:'voice',topic:'Допуск к торгам',status:'resolved',time:'12:42',duration:'0:42',industry:'onboarding'},
  {id:'ABB-1047',name:'Михаил П.',initials:'МП',channel:'whatsapp',topic:'Статус доставки',status:'resolved',time:'12:38',duration:'1:16',industry:'shipping'},
  {id:'ABB-1046',name:'Елена С.',initials:'ЕС',channel:'voice',topic:'Документы на автомобиль',status:'resolved',time:'12:31',duration:'0:58',industry:'documents'},
  {id:'ABB-1045',name:'Дмитрий В.',initials:'ДВ',channel:'sms',topic:'Как забрать автомобиль',status:'resolved',time:'12:24',duration:'0:38',industry:'shipping'},
  {id:'ABB-1044',name:'Мария Н.',initials:'МН',channel:'voice',topic:'Уточнение документов',status:'handoff',time:'12:18',duration:'1:32',industry:'documents'},
  {id:'ABB-1043',name:'Александр Б.',initials:'АБ',channel:'whatsapp',topic:'Готовность аккаунта',status:'resolved',time:'12:09',duration:'0:46',industry:'onboarding'},
  {id:'ABB-1042',name:'Ольга Д.',initials:'ОД',channel:'sms',topic:'Отслеживание документов',status:'resolved',time:'11:56',duration:'0:35',industry:'documents'},
  {id:'ABB-1041',name:'Игорь А.',initials:'ИА',channel:'whatsapp',topic:'Нужен специалист по доставке',status:'handoff',time:'11:48',duration:'2:04',industry:'shipping'},
];
export const channels={voice:'Звонок',whatsapp:'WhatsApp',sms:'SMS'};
export const metrics = {
  today: { total: '1 248', auto: '86', duration: '0:42', rating: '4,9', labels: ['08–10', '10–12', '12–14', '14–16', '16–18', '18–20', '20–22'], ai: [63, 108, 126, 199, 171, 235, 171], human: [12, 21, 20, 29, 26, 38, 29], chartLabel: 'Обращения по часам', comparison: 'Иллюстративные показатели за день', split: [682, 416, 150] },
  week: { total: '8 736', auto: '84', duration: '0:46', rating: '4,8', labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'], ai: [824, 998, 949, 1115, 1320, 982, 1150], human: [152, 207, 189, 236, 222, 171, 221], chartLabel: 'Обращения по дням', comparison: 'Иллюстративные показатели за 7 дней', split: [4778, 2912, 1046] },
  month: { total: '37 440', auto: '82', duration: '0:49', rating: '4,8', labels: ['1–4', '5–8', '9–12', '13–16', '17–20', '21–24', '25–30'], ai: [3050, 3400, 4020, 3870, 4780, 5470, 6111], human: [651, 715, 840, 720, 901, 1075, 1837], chartLabel: 'Обращения по интервалам месяца', comparison: 'Иллюстративные показатели за 30 дней', split: [20420, 12480, 4540] },
};
