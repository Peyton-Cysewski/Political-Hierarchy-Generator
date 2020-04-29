const superagent = require('superagent');

let url = 'https://api.namefake.com/english-united-states/female';

superagent.get(url)
  .then(res => {
    console.log(JSON.parse(res.text));
  })
  .catch(err => {
    console.log(err);
  })