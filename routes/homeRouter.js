const express = require('express');
const router = express.Router();

const Build = require('../models/Buildings');
const Emps = require('../models/Emps')

router.get('/', (req, res, next) => {
    const title = "Home"
    res.render('home', {title})
});
//просто json в браузере чекнуть
router.get('/sportss', (req, res, next) => {
    const title = "Список Спортиков"
    Emps
        .aggregate([
            {
                $project: {
                    _id: 1,
                    "clubs.emps.sport.name": 1,
                    "clubs.emps.firstName": 1,
                    "clubs.emps.lastName": 1,
                    "clubs.emps.startDate": 1,
                    "clubs.club_name": 1
                }
            }
        ])
        .then((sports) => res.json(sports));
})

router.get('/sports', (req, res, next) => {
    const title = "Список Спортиков"
    Emps
        .aggregate([
            // {$group:{_id: "$clubs.emps."}123},
            {
                $project: {
                    _id: 1,
                    "emps.sport.name": 1,
                    "emps.firstName": 1,
                    "emps.lastName": 1,
                    "emps.startDate": 1,
                    "emps.sport.category": 1,
                    "club_name": 1,
                    "emps.tren":1
                }
            }
        ])
        .then((sports) => res.render('sports', {sports, title}))
})

router.get("/add-emp", (req, res) => {
    const title = "Добавить статью";
    res.render("add-emp", {title})
});
//вставка данных
router.post("/add-emp", (req, res) => {
    const {club_name, date_start, firstName, lastName, name, category, startDate, nameOne, secondName} = req.body;
    const emp = new Emps({
        club_name: club_name,
        date_start: date_start,
        emps: [{
            firstName: firstName,
            lastName: lastName,
            startDate: startDate,
            sport: [{
                category: category,
                name: name
            }],
            tren: [{
                nameOne: nameOne,
                secondName: secondName,
            }]
        }]
    });
    emp.save()
        .then((result) => res.redirect("/sports"))
        .catch((error) => {
            console.log(error);
            res.render("error", {title: "Error"});
        });
});

router.delete("/sports/:id", (req, res) => {
    Emps.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(error);
            res.render("error", { title: "Error" });
        });
});
// 1)СДЕЛАТЬ ДОБАВЛЕНИЕ СОРЕВНОВАНИЙ И ЗДАНИЙ
// 2)СДЕЛАТЬ УДАЛЕНИЕ СОРЕВНОВАНИЙ И ЗДАНИЙ
// 3)СДЕЛАТЬ ИЗМЕНЕНИЕ ДАННЫХ

// app.delete("/posts/:id", (req, res) => {
//     Post.findByIdAndDelete(req.params.id)
//         .then((result) => {
//             res.sendStatus(200);
//         })
//         .catch((error) => {
//             console.log(error);
//             res.render(createPath("error"), { title: "Error" });
//         });
// });

//
// router.get('/sports', (req, res, next) => {
//     const title = "Список спортсменов"
//     Emps
//         .find()
//         .then((emps) => res.render('sports', {emps, title}))
//         .catch((err) => {
//             console.log(err);
//             res.render('error', {title})
//         })
// })
//
// router.get('/comps', (req, res, next) => {
//     const title = "Список соревнований"
//     Comps
//         .find()
//         .then((comps) => res.render('comps', {comps, title}))
//         .catch((err) => {
//             console.log(err);
//             res.render('error', {title})
//         })
// })
//


// router.get("/add-treners", (req, res) => {
//     const title = "Добавить статью";
//     res.render("add-treners", {title})
// });
//
// router.get("/add-comps", (req, res) => {
//     const title = "Добавить статью";
//     res.render("add-comps", {title})
// });


module.exports = router;
