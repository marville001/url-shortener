const router = require("express").Router();
const shortid = require("shortid");
const validateUrl = require("../utils/validateUrl");
const url = require('url');

const urls = [];
// [{original, short}]

// Short URL Generator
router.post("/encode", async (req, res) => {
    if (!req.body.origUrl) return res.status(400).json({ message: "Url is required" });
    const { origUrl } = req.body;

    const urlId = shortid.generate();
    if (validateUrl(origUrl)) {
        try {
            let url = urls.find((u) => u.original === origUrl);
            if (url) {
                res.json(url.short);
            } else {
                const shortUrl = `http://localhost:3333/${urlId}`;
                urls.push({ original: origUrl, short: shortUrl });
                res.json(shortUrl);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server Error" });
        }
    } else {
        res.status(400).json({ message: "Invalid Original Url" });
    }
});

module.exports = router;
