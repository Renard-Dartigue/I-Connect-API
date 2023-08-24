const { Thought } = require('../models');

module.export = {
    //=================================GET ALL THOUGHTS================================================================================
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //=================================GET A THOUGHT==================================================================================
    async getSingleThought(req, res) {
        try { 
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
        
            res.json(thought);
            } catch (err) {
            res.status(500).json(err);
            }
    },
    //==================================CREATE THOUGHT==================================================================================
    async createThought(req, res) {
        try {
        //     const dbthoughtData = await Thought.create(req.body);
        //     res.json(dbthoughtData);
        // } catch (err) {
        //     res.status(500).json(err);
        // }
        const thought = await Thought.create(req.body);
        const user = await User.findOneandUpdate(
            { _id: req.body.userId},
            { $addToSet: { thoughts: thought._id}},
            { new: true}
        );
        res.json('Thought Successfully Posted!');
    }   catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    },
    //====================================UPDATE THOUGHT==============================================================================

    //====================================DELETED THOUGHT=============================================================================

    //====================================ADD REACTION================================================================================

    //====================================DELETE REACTION=============================================================================
}

