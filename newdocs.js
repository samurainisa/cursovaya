db.emps.drop()
db.builds.drop()

const emps = db.emps;
const builds = db.builds;

let emp1 = emps.insertOne({
  club_name: "ШВЕДЫ",
  date_start: new Date(),
  emps: [{
    firstName: "Веня",
    lastName: "Димов",
    startDate: new Date(),
    sport: [{
      category: "Юношеский",
      name: "Футбол",
    }, ],
    tren: [{
      nameOne: "Федя",
      secondName: "Тутиков",
      sportTren: "Футбол",
      startDate: new Date(),
      salary: 75464,
    }],
  }]
})
let emp2 = emps.insertOne({
  club_name: "ЛИВОН",
  date_start: new Date(),
  emps: [{
    firstName: "Алексей",
    lastName: "Петров",
    startDate: new Date(),
    sport: [{
      category: "Первый юношеский",
      name: "Тяжёлая атлетика",
    }, ],
    tren: [{
      nameOne: "Вася",
      secondName: "Ильин",
      sportTren: "Тяжёлая атлетика",
      startDate: new Date(),
      salary: 50000,
    }, ],
  }]
})
let emp3 = emps.insertOne({
  club_name: "ИНДУСТРИЯ",
  date_start: new Date(),
  emps: [{
    firstName: "Валерий",
    lastName: "Жмышенко",
    startDate: new Date(),
    sport: [{
      category: "КМС",
      name: "Лёгкая атлетика",
    }, ],
    tren: [{
      nameOne: "Никита",
      secondName: "Виктов",
      sportTren: "Лёгкая атлетика",
      startDate: new Date(),
      salary: 45054,
    }, ],
  }]
})
let emp4 = emps.insertOne({
  club_name: "САМОКАТ",
  date_start: new Date(),
  emps: [{
    firstName: "Витя",
    lastName: "Александров",
    startDate: new Date(),
    sport: [{
      category: "МС",
      name: "Бокс",
    }, ],
    tren: [{
      nameOne: "Саша",
      secondName: "Филосов",
      sportTren: "Бокс",
      startDate: new Date(),
      salary: 123423,
    }, ],
  }]
})
let emp5 = emps.insertOne({
  club_name: "БРИТАНЦЫ",
  date_start: new Date(),
  emps: [{
    firstName: "Саша",
    lastName: "Повозов",
    startDate: new Date(),
    sport: [{
        category: "КМС",
        name: "Метание ядра",
      },
      {
        category: "КМС",
        name: "Тяжёлая атлетика",
      },
      {
        category: null,
        name: "Лёгкая атлетика",
      },
    ],
    tren: [{
      nameOne: "Вася",
      secondName: "Ильин",
      sportTren: "Тяжёлая атлетика",
      startDate: new Date(),
      salary: 50000,
    }],
  }]
})

let build1 = builds.insertOne({
  name: "Крапивинская спортивная школа",
  cover: "Деревянное",
  buildType: "Манеж",
  limit: 100,
  comps: [{
    name: "Соревнования по футболу",
    winPlace: 2,
    emp: [
      emp1.insertedId
    ],
    startDate: new Date("2021-09-26"),
    orgs: [{
      name: "Кемеровская нефтеперерабатывающая компания"
    }]
  }],
})

let build2 = builds.insertOne({
  name: "Кемеровская спортивная школа",
  cover: "Резиновое",
  buildType: "Спортзал",
  limit: 200,
  comps: [{
    name: "Соревнования по тяжёлой атлетике",
    winPlace: 1,
    emp: [
      emp2.insertedId
    ],
    startDate: new Date("2021-09-26"),
    orgs: [{
      name: "Кемеровская нефтеперерабатывающая компания"
    }]
  }]
})

let build3 = builds.insertOne({
  name: "КУЗГТУ",
  cover: "Деревянное",
  buildType: "Спортивный комплекс",
  limit: 300,
  comps: [{
    name: "Соревнования по лёгкой атлетике",
    winPlace: 3,
    emp: [
      emp3.insertedId
    ],
    startDate: new Date("2021-09-26"),
    orgs: [{
      name: "Кемеровская нефтеперерабатывающая компания"
    }]
  }]
})

let build4 = builds.insertOne({
  name: "Берёзовская спортивная школа",
  cover: "Деревянное",
  buildType: "Зал",
  limit: 100,
  comps: [{
    name: "Соревнования по боксу",
    winPlace: 4,
    emp: [
      emp4.insertedId
    ],
    startDate: new Date("2021-09-26"),
    orgs: [{
      name: "Кемеровская нефтеперерабатывающая компания"
    }]
  }]
})

let build5 = builds.insertOne({
  name: "КЕМГУ",
  cover: "Смешанное",
  buildType: "Манеж",
  limit: 400,
  comps: [{
    name: "Соревнования по тяжёлой атлетике",
    winPlace: 1,
    emp: [
      emp5.insertedId
    ],
    startDate: new Date("2021-09-26"),
    orgs: [{
      name: "Кемеровская нефтеперерабатывающая компания"
    }]
  }]
})