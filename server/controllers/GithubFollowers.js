const axios = require("axios");

exports.getGithubFollowers = function (req, res) {
  try {
    axios({
      method: "get",
      url: "https://api.github.com/users/mosh-hamedani/followers",
    })
    .then(function (response) {
      res.send(response.data);
    });
  } catch (error) {
    console.error(error);
  }
};
