const { Thought, User } = require('../models');

const thoughtController = {
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
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId},
                { $addToSet: { thoughts: thought._id}},
                { new: true}
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought created, but no user found with that ID',
                });
            }

            res.json('Thought Successfully Posted!');
        }   catch (err) {
        console.log(err);
        res.status(500).json(err);
        }
    },
    //====================================UPDATE THOUGHT==============================================================================
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        }   catch (err) {
        console.log(err);
        res.status(500).json(err);
        }
    },
    //====================================DELETED THOUGHT=============================================================================
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thoughts with this id!' });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thought: req.params.thoughtId } },
                { new: true }
            );
            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Thought created but no user with this id!' });
            }
        
                res.json({ message: 'Thought successfully deleted!' });
            }   catch (err) {
                res.status(500).json(err);
            }
    },
    //====================================ADD REACTION================================================================================
    async addThoughtReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
    
                res.json(thought);
            }       catch (err) {
                res.status(500).json(err);
            }
    },
    //====================================DELETE REACTION=============================================================================
    async deleteThoughtReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            )

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
    
                res.json(thought);
            }     catch (err) {
                res.status(500).json(err);
            }
    },
};

module.exports = thoughtController;