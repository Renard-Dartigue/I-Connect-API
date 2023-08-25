const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomUser, getRandomThought } = require('./data');

connection.once('open', async () => {
    console.log('connected');

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    const thoughts = getRandomThought(10);

    const users = [];
    for (let i = 0; i < 20; i++) {
        const username = getRandomUser();
        const email = `user${i}@example.com`;
        const friends = [];

        users.push({
            username,
            email,
            thoughts,
            friends,
        })
    }

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});