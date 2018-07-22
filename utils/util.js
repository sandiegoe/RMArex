function callAjax(url, params, suFun) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'Content-Type': 'json'
    },
    success: function (res) {
     suFun(res.data);
    }
  })
}

function processDoubanData(data) {
  var movies = [];
  for (var idx in data.subjects) {
    var movie = data.subjects[idx];
    movies.push({
      image: movie.images.large,
      average: movie.rating.average,
      title: movie.title,
      stars: processMovieStars(movie.rating.stars)
    });
  }
  return movies;
}

function processMovieStars(stars) {
  var starsArray = [];
  //stars = parseInt(stars);
  stars = stars.substring(0, 1);
  for (var i = 1; i <= 5; ++i) {
    if (i <= stars) {
      starsArray.push(1);
    } else {
      starsArray.push(0);
    }
  }
  return starsArray;
}

module.exports = {
  callAjax: callAjax,
  processDoubanData: processDoubanData
}