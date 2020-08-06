const router = require(`express`).Router();
const musik = require(`../controllers/MusikController`);

router.get("/", musik.getEvent);
router.get("/search/:keyword", musik.searchEvent);

module.exports = router;
