const connection = require("../data/db");

// Index

function index(req, res, next) {
  // query

  const sql = "SELECT * FROM movies";

  // esecuzione query

  connection.query(sql, (err, results) => {
    if (err) return next(err)
    res.json(results);
  });
}

function show(req, res, next) {
  const { id } = req.params;

  const moviesSql = `
    SELECT *
    FROM movies
    WHERE id = ?
  `;

  const reviewSql =`
  SELECT R.*
  FROM reviews R
  WHERE movie_id = ?
  `;

  connection.query(moviesSql, [id], (err, moviesResults) => {
    if (err) {
      return next(err)
    }

    if (moviesResults.length === 0) {
      return res.status(404).json({
        error: "Movie not found",
      });
    }

    const movie = moviesResults[0];

     connection.query(reviewSql, [id], (err, reviewResults) => {
    if (err) {
      return next(err)
    }

    movie.reviews = reviewResults

    
    res.json(movie);
    });
  });
}

module.exports = { index, show};