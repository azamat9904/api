const Router = require("express");
const topicController = require("../controllers/Topic");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();
router.post('/', authMiddleware, topicController.getTopics)
router.post('/add', authMiddleware, topicController.createTopic)
router.post('/remains', authMiddleware, topicController.getRemainedTopics)
router.post('/choose', authMiddleware, topicController.chooseTopic)
router.post('/taken', authMiddleware, topicController.isTopicTaken)
module.exports = router;


