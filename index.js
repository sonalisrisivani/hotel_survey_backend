const express=require('express');
const path=require('path');
const app=express();
const mysql=require('mysql');
const bodyparser=require('body-parser');
const db=require('./public/db');

app.use(bodyparser.urlencoded({
extended:true
}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




app.get('/', (req, res)=> {
res.sendFile(path.join(__dirname, 'public/' +'index.html'));});



app.get('/home', (req, res)=> {
res.sendFile(path.join(__dirname, 'public/' +'index.html'));});



app.get('/survey', (req, res)=> {
res.render('survey');});







app.post('/submit_survey', (req, res) => {
    const { name, email, service, timeliness, support, value, overall_satisfaction, comments, products_services, satisfaction, recommend, frequency, age, gender, income, occupation } = req.body;

    db.query('INSERT INTO user (username, email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error inserting user data");
            return;
        }

        const userId = result.insertId; // Get the inserted user ID

        db.query('INSERT INTO survey (userid, qos, timeliness, value_for_money, overall_satisfaction) VALUES (?, ?, ?, ?, ?)', [userId, service, timeliness, value, overall_satisfaction], (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error inserting survey data");
                return;
            }

            db.query('INSERT INTO preferences (userid, satisfaction, recommendation_likelihood, service_usage_frequency) VALUES (?, ?, ?, ?)', [userId, satisfaction, recommend, frequency], (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Error inserting preferences data");
                    return;
                }

                db.query('INSERT INTO demographic (userid, age, gender, household_income, occupation) VALUES (?, ?, ?, ?, ?)', [userId, age, gender, income, occupation], (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send("Error inserting demographic data");
                        return;
                    }

                    res.render('submit', { username: name });
                });
            });
        });
    });
});







app.get('/dashboard', (req, res)=> {
res.render('dashboard');});



app.listen(3000, ()=> {
console.log("server is up and ruuning");
});
