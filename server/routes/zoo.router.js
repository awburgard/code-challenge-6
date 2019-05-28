const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    const queryString = `SELECT * FROM "class"
                        JOIN "species" ON "class"."id"="species"."class_id";`;
    pool.query(queryString)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
});

router.post('/', (req,res) => {
    const queryString = `INSERT INTO "species" ("species_name", "class_id")
                        VALUES ($1, $2)`;
    console.log(req.body)

    pool.query(queryString, [req.body.name, req.body.id])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error posting to species table: ${err}`);
            res.sendStatus(500);
        });
})

module.exports = router;