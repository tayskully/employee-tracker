// DEPENDENCIES
const mysql = require('mysql2');
const fs = require('fs');
const express = require('express')
// const inquirerData= require('index.js') ?? 

// DATA
const db = require('./config/connection.js') //modular login for privacy using dotenv


//APP/PORT
const app = express();
const PORT = process.env.PORT || 4000;

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// ROUTES
// GET Route for retrieving DB content

// app.get("/api/movies", (req, res) => {
//   db.query(
//     `SELECT movie_name, movie_id, reviews.movie_id review 
//   FROM movies JOIN reviews 
//   ON movies.id = reviews.movie_id`,
//     (err, results) => {
//       res.json(results);
//     }
//   );
// });

// app.post("/api/add-movie", async (req, res) => {
//   const [result] = await db
//   promise()
//   .query(
//     `INSERT INTO movies (movie_name)
//   VALUES ("Jaws"), `,
//     (err, results) => {
//       res.json(results);
//     }
//   );
// });

// app.post("/api/review", async (req, res) => {
//   const {movie_id, review } = req.body;
//   const [result] = await db
//   promise()
//   .query(
//     `INSERT INTO reviews (movie_id, review) VALUES(?, ?)` [
// movie_id, reviews
//     ],
//     (err, results) => {
//       res.json(results);
//     }
//   );
// });

// app.put("/api/update-review", async (req, res) => {
//   const {review_id, movie_id, review } = req.body;
//   const [result] = await db
//   promise()
//   .query(
//     `UPDATE reviews SET movie_id = ? AND review = ? WHERE id = ?) VALUES(?, ?)`, 
//     [movie_id, reviews ],
//     (err, results) => {
//       res.json(results);
//     }
//   );
// });



app.use((req, res) => {
  res.status(404).end();
});

//init start the server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});


