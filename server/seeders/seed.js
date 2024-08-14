const db = require('../config/connection');
const { User, Score } = require('../models');
const userSeeds = require('./userSeeds.json');
// const scoreSeeds = require('./scoreSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('score', 'scores');
    await cleanDB('User', 'users');

    await User.create(userSeeds);

    //   for (let i = 0; i < scoreSeeds.length; i++) {
    //     const { _id, scoreAuthor } = await Score.create(scoreSeeds[i]);
    //     const user = await User.findOneAndUpdate(
    //       { username: scoreAuthor },
    //       {
    //         $addToSet: {
    //           scores: _id,
    //         },
    //       }
    //     );
    //   }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
