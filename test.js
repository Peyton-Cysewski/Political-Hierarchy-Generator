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







// for (let i = 0; i < rulerArray.length; i++) {
//   if (i === 0) {
//     // government tier template
//   } else {
//     for (let j = 0; j < rulerArray[i].length; j++) {
//       if (j === 0) {
//         // tier 1 ruler template
//       } else {
//         for (let k = 0; k < rulerArray[i][j].length; k++) {
//           if (k == 0) {
//             // tier 2 ruler template
//           } else {
//             for (let l = 0; l < rulerArray[i][j][k].length; l) {
//               // tier 3 ruler template
//             }
//           }
//         }
//       }
//     }
//   }
// }






if (loggedIn) {
  
}