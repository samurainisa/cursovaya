const express = require('express');
const router = express.Router();
const app = express();
const Build = require('../models/Buildings');
const Emps = require('../models/Emps')
const {ObjectId} = require("mongodb");
var methodOverride = require('method-override')
router.get('/', (req, res, next) => {
    const title = "Home"
    res.render('home', {title})
});
app.use(methodOverride('_method'))
router.get('/sports', (req, res, next) => {
    const title = "Список Спортиков"
    Emps
        .aggregate([{
            $project: {
                _id: 1,
                "emps.sport.name": 1,
                "emps.firstName": 1,
                "emps.lastName": 1,
                "emps.startDate": 1,
                "emps.sport.category": 1,
                "club_name": 1,
                "emps.tren": 1
            }
        }])
        .then((sports) => res.render('sports', {sports, title}))
})
router.get("/add-emp", (req, res) => {
    const title = "Добавить статью";
    res.render("add-emp", {title})
});
//вставка данных
router.post("/add-emp", (req, res) => {
    const {
        club_name,
        date_start,
        firstName,
        lastName,
        sport_name,
        category,
        data_roj,
        nameOne,
        secondName,
        trenStartDate,
        sportTren
    } = req.body;

    const emp = new Emps({
        club_name: club_name, date_start: date_start, emps: [{
            firstName: firstName, lastName: lastName, startDate: data_roj, sport: [{
                category: category, name: sport_name
            }], tren: [{
                nameOne: nameOne, secondName: secondName, sportTren: sportTren, startDate: trenStartDate,
            }]
        }]
    });
    emp.save()
    const {
        name, cover, buildType, startDate, limit, name_comp, winPlace, orgs_name
    } = req.body;

    const build = new Build({
        name: name, cover: cover, buildType: buildType, limit: limit, comps: [{
            name: name_comp, winPlace: winPlace, emp: [emp._id], startDate: startDate, orgs: [{
                name: orgs_name,
            }],
        }]
    })

    build.save()
        .then((result) => res.redirect('/sports'))
        .catch((error) => {
            console.log(error);
            res.render("error", {title: "Error"});
        });
});
router.delete("/sports/:id", async (req, res) => {
    await Emps.findByIdAndDelete(req.params.id)
    await Build.deleteMany({
        "comps.emp": ObjectId(req.params.id)
    })
        .then(res.sendStatus(200))
        .catch((error) => {
            console.log(error);
            res.render("error", {title: "Error"});
        });
});
router.get("/sports/:id", (req, res) => {
    Emps.aggregate([{$match: {_id: ObjectId(req.params.id)}}, {
        $project: {
            _id: 1,
            "emps.sport.name": 1,
            "emps.firstName": 1,
            "emps.lastName": 1,
            "emps.startDate": 1,
            "emps.sport.category": 1,
            "club_name": 1,
            "emps.tren": 1
        }
    }])
        .then((sportss) => res.render("sport", {sportss}))
        .catch((error) => {
            console.log(error);
            res.render("error", {title: "Error"});
        });
});
router.get("/builds", async (req, res) => {
    const buildss = await Build.aggregate([{
        $project: {
            _id: 1, "name": 1, "cover": 1, "buildType": 1, "limit": 1, "comps": 1,
        }
    }])
    res.render('builds', {buildss})
});

router.get("/edit-emp/:id", (req, res) => {
    const title = "Редактировать";
    Emps.aggregate([{$match: {_id: ObjectId(req.params.id)}}, {
        $project: {
            _id: 1,
            "emps.sport.name": 1,
            "emps.firstName": 1,
            "emps.lastName": 1,
            "emps.startDate": 1,
            "emps.sport.category": 1,
            "club_name": 1,
            "emps.tren": 1
        }
    }])
        .then((sports) => res.render("edit-emp", {sports, title}))
        .catch((error) => {
            console.log(error);
            res.render("error", {title: "Error"});
        });
});

router.put("/edit-emp/:id", (req, res) => {
    console.log(req.params.id)
    const {
        club_name,
        date_start,
        firstName,
        lastName,
        sport_name,
        category,
        data_roj,
        nameOne,
        secondName,
        trenStartDate,
        sportTren
    } = req.body;

    const {id} = req.params;

    Emps.findByIdAndUpdate(id, {
        club_name,
        date_start,
        firstName,
        lastName,
        sport_name,
        category,
        data_roj,
        nameOne,
        secondName,
        trenStartDate,
        sportTren
    })
        .then((result) => res.redirect(`/sports/${id}`))
        .catch((error) => {
            console.log(error);
            res.render("error", {title: "Error"});
        });
});
module.exports = router;
