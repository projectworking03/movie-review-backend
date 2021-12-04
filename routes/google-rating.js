// Imports
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

// Initializations
const router = express.Router();

// Routes
router.get("/ratings/imdb/:imdbId", async (req, res) => {
  // Extract the movie title
  const imdbId = req.params.imdbId;

  // Form the URL
  const url = `https://imdb.com/title/${imdbId}`;

  // Scrape the Google webpage
  axios
    .get(url)
    .then((_res) => {
      // Form the DOM object
      const html = _res.data;
      const $ = cheerio.load(html);

      // Extract the rating
      const rating = $(
        ".AggregateRatingButton__RatingScore-sc-1ll29m0-1.iTLWoV"
      ).text();

      // Return the data
      res.json({
        IMDB: rating.substr(0, 3),
      });
    })
    .catch((err) => {
      console.log("IMDB Scraping Error >>> ", err.message);
      res.status(500);
      res.json({ status: "failed" });
    });
});

// Exports
module.exports = router;
