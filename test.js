const superagent = require('superagent');

let promises = [];

function determineGender(request) {
  let gender = '';
  // let genderBias = request.body.gender;
  let genderBias = request;
  let genderRoll = Math.random();
  if (genderRoll < genderBias) {
    gender = 'male';
  } else {
    gender = 'female';
  }
  return gender;
}




for (let i = 0; i < 10; i++) {
  let gender = determineGender(0.5);
  let url = `https://api.namefake.com/english-united-states/${gender}`;
  // promises.push(superagent.get(url).then(res => JSON.parse(res.text).name));
  promises.push(superagent.get(url));
}

Promise.all(promises)
  .then(people => {
    // console.log(people.map(person => JSON.parse(person.text).name));
    return people.map(person => {
      let name = JSON.parse(person.text).name;
      let gender = JSON.parse(person.text).pict;
      let temp = {
        name: name,
        sex: gender.slice(gender.search(/[a-z]/i))
      }
      console.log(temp);
      return temp;
    });
  }).then(nameArray => {




  }).catch(error => {
    console.log(error);
  })
