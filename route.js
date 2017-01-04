var distance = require('google-distance');

distance.get(
  {
    origin: '天神駅',
    destination: '博多駅'
  },
  function(err, data) {
    if (err) return console.log(err);
    console.log(data);
});
