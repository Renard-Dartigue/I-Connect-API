const names = [
'Stygian',
'Lesser_Stygian',
'Elite_Stygian',
'Death_Knight',
'Frost_Knight',
'Hell_Knight',
'Ravager',
'Harpie',
'Patho',
'Batho',
'Tyrant',
'Butcher',
'Rage_Spawn',
'Rage',
'Ghost_Rage',
'Blood_Rage',
'Witch',
'Dreamrunner',
'Critter',
];

//==========Taken from Example to test
const descriptionsBodies = [
    'How to disagree with someone',
    'iPhone review',
    'how-to video',
    'video essay on the history of video games',
    'How to make money on the App Store',
    'Learn NextJS in five minutes (Not clickbate)',
    'Movie trailer',
    'Hello world',
    'Another possible solution to the algorithm',
    'Apology video',
    'Submission for startup pitch',
];

//==========Taken from Example to test
const possibleResponses = [
    'I disagree!',
    'I tried your algorithm, here were the results',
    'This was awesome',
    'Thank you for the great content',
    'Please check out my video response',
    'Like and subscribe to my channel please',
    'Reply: The side effects of in app purchases on digital marketplaces',
];


const users = [];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUser = () =>
    `${getRandomArrItem(names)}`;

const getRandomThought = (int) => {
    const getThoughtReactions = (count) => {
        const reactions = [];
        for (let i = 0; i < count; i++) {
            reactions.push({
                text: getRandomArrItem(possibleResponses),
                likes: Math.floor(Math.random() * 100),
            });
        }
        return reactions;
    };

        let results = [];
        for (let i = 0; i < int; i++) {
            results.push({
                published: Math.random() < 0.5,
                description: getRandomArrItem(descriptionsBodies),
                reactions: [...getThoughtReactions(3)],
            });
        }

        return results;
};

module.exports = {
    getRandomThought,
    getRandomUser,
};