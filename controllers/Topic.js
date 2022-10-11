const Topic = require("../models/Topic");

class TopicController{

    async createTopic(req, res){
        try {
            const topicPayload = req.body.topic
            const newTopic = new Topic(topicPayload);
            await newTopic.save();
            res.json({
                message: "Тематика успешно добавлена",
                topic: newTopic
            });

        } catch (error) {
            res.status(500).json({
                message: "Случилась какая та ошибка"
            });
        }
    }

    async getTopics(req, res){
        try{
            const topics = await Topic.find({}).populate(['takenBy'])
            res.json({
                message: "Запрос успешно отработал",
                topics
            })
        }catch(error){
            console.log(error)
            res.status(500).json({
                message: "Случилась какая та ошибка"
            })
        }
    }

    async getRemainedTopics(req, res){
        try{
            const topics = await Topic.find({ takenBy: null });

            res.json({
                message: "Запрос успешно отработал",
                topics
            })
        }catch(error){
            console.log(error)
            res.status(500).json({
                message: "Случилась какая та ошибка"
            })
        }
    }

    async chooseTopic(req, res){
        try{
           const user = req.user.payload
            const chosenTopic = req.body.topicId
            const topic = await Topic.findOne({ _id: chosenTopic });
           await topic.updateOne({ $set: { takenBy: user._id }})
            res.json({
                message: "Тема успшно выбрано"
            })
        }catch(error){
            console.log(error)
            res.status(500).json({
                message: "Случилась какая та ошибка"
            })
        }
    }

    async isTopicTaken(req, res){
       try{
           const user = req.user.payload
           const foundTopic = await Topic.find({ takenBy: user._id })
           res.json({
               message: "Запрос успешно отработал",
               isTopicChosen: foundTopic.length > 0
           })
       }catch(error){
           console.log(error)
           res.status(500).json({
               message: "Случилась какая та ошибка"
           })
       }
    }
}

module.exports = new TopicController();
