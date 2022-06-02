// 1.	Получить перечень спортивных сооружений указанного типа в целом или удовлетворяющих
// заданным характеристикам (например, стадионы, вмещающие не менее указанного числа зрителей).
db.getCollection("builds").aggregate([{
      $match: {
        $and: [
          { buildType: "Манеж" },
          { limit: { $gte: 100 } }
        ]
      }
    },
    {
      $project: {
        _id: 1,
        comps: 0
      }
    }
  ])
  // 2.	Получить список спортсменов, занимающихся указанным видом спорта в целом либо не ниже определенного разряда.
db.getCollection("emps").aggregate([

  {
    $match: { "clubs.emps.sport.name": "Тяжёлая атлетика" }
  },
  { $unwind: "$clubs.emps" },
  { $unwind: "$clubs.emps.sport" },
  {
    $project: {
      _id: 1,
      "clubs.emps.sport.name": 1
    }
  }
])

// 3.	Получить список спортсменов, занимающихся более чем одним видом спорта с указанием этих видов спорта.
db.emps.aggregate([
  { $unwind: "$clubs" },
  { $unwind: "$clubs.emps" },
  {
    $addFields: { count: { $size: "$clubs.emps.sport" } }
  },
  {
    $match: { count: { $gt: 1 } }
  },
  {
    $project: {
      "clubs.emps.sport": 1,
      _id: 1,
      count: 1
    }
  },
])

// 4.	Получить перечень соревнований, проведенных в течение заданного периода времени в целом либо указанным организатором.
db.builds.aggregate([{
    $match: {
      "comps.startDate": {
        $gte: new Date("2021-09-21"),
        $lt: new Date("2021-12-11")
      }
    }
  },
  { $unwind: "$comps" },
  {
    $project: {
      _id: 1,
      "comps.name": 1
    }
  },
])

// 5.	Получить перечень соревнований, проведенных в указанном спортивном сооружении в целом либо по определенному виду спорта.
db.builds.aggregate([{
    $match: {
      name: "КУЗГТУ"
    }
  },
  { $unwind: "$comps" },
  {
    $project: {
      _id: 1,
      name: 1,
      "comps.name": 1
    }
  },
])

// 6.	Получить перечень спортивных клубов и число спортсменов этих клубов, участвовавших в
//спортивных соревнованиях в течение заданного интервала времени.
db.emps.aggregate([{
      $match: {
        "clubs.date_start": {
          $gte: new Date("2022-05-21"),
          $lt: new Date("2023-05-21")
        }
      }
    },
    {
      $addFields: { count: { $size: "$clubs.emps" } }
    },
    {
      $project: {
        _id: 1,
        "clubs.club_name": 1,
        "clubs.emps.lastName": 1,
        count: 1
      }
    }
  ])
  // 7.	Получить список тренеров по определенному виду спорта.
db.emps.aggregate([
    { $unwind: "$clubs" },
    { $unwind: "$clubs.emps" },
    { $unwind: "$clubs.emps.tren" },
    {
      $match: {
        "clubs.emps.tren.sportTren": "Метание ядра"
      }
    },
    {
      $project: {
        _id: 1,
        "clubs.emps.tren.nameOne": 1,
        "clubs.emps.tren.sportTren": 1,
      }
    }
  ])
  // 8.	Получить список спортсменов, не участвовавших ни в каких соревнованиях в течение определенного периода времени.
db.emps.aggregate([{
    $match: {
      "clubs.date_start": {
        $not: {
          $gte: new Date("2023-05-21"),
          $lt: new Date("2024-05-22")
        },
      }
    }
  },

  {
    $project: {
      _id: 1,
      "clubs.emps.lastName": 1,
      "clubs.emps.firstName": 1,
    }
  }
])

// 9.	Получить список организаторов соревнований и число проведенных ими соревнований в течение определенного периода времени.
db.builds.aggregate([
  { $addFields: { count: { $size: "$comps" } } },
  {
    $match: {
      "comps.startDate": {
        $gte: new Date("2021-05-21"),
        $lt: new Date("2021-12-21")
      }
    }
  },
  {
    $project: {
      _id: 1,
      count: 1,
      "comps.orgs.name": 1
    }
  }
])

// 10.	Получить перечень спортивных сооружений и даты проведения на них соревнований в течение определенного периода времени.
db.builds.aggregate([{
    $match: {
      "comps.startDate": {
        $gte: new Date("2021-05-21"),
        $lt: new Date("2021-12-21")
      }
    }
  },
  {
    $project: {
      _id: 1,
      "name": 1,
      "comps.startDate": 1
    }
  }
])