const connection = require("../data/db");

// Index

function index(req, res, next) {
  // query

  const sql = "SELECT * FROM movies";

  // esecuzione query

  connection.query(sql, (err, results) => {
    if (err) return next(err);
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

  const reviewSql = `
  SELECT R.*
  FROM reviews R
  WHERE movie_id = ?
  ORDER BY R.created_at DESC
  `;

  connection.query(moviesSql, [id], (err, moviesResults) => {
    if (err) {
      return next(err);
    }

    if (moviesResults.length === 0) {
      return res.status(404).json({
        error: "Movie not found",
      });
    }

    const movie = moviesResults[0];

    connection.query(reviewSql, [id], (err, reviewResults) => {
      if (err) {
        return next(err);
      }

      movie.reviews = reviewResults;

      res.json(movie);
    });
  });
}

function store(req, res, next) {
  const { id } = req.params;
  const { name, vote, text } = req.body;

  const sql = `
    INSERT INTO reviews (name, vote, text, movie_id)
    VALUES (?, ?, ?, ?)
  `;

  connection.query(sql, [name, vote, text, id], (err, results) => {
    if (err) return next(err);

    res.status(201).json({
      id: results.insertId,
      name,
      vote,
      text,
      movie_id: id,
    });
  });
}

module.exports = { index, show, store };
