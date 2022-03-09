const router = require("express").Router();
const shortid = require("shortid");
const validateUrl = require("../utils/validateUrl");

const urls = []; // [{original, short}]

// Excode url
router.post("/encode", async (req, res) => {
    // Validate req.body
    if (!req.body.origUrl)
        return res.status(400).json({ message: "\"origUrl\"Url is required" });

    const { origUrl } = req.body;

    // generate short id
    const urlId = shortid.generate();

    // Validate that url is valid
    if (validateUrl(origUrl)) {
        try {
            // Check if url is already encooded
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

router.get("/decode", async (req, res) => {
    // Validate req.body
    if (!req.body.short)
        return res.status(400).json({ message: "\"short\" Url is required" });

    const { short } = req.body;

    try {
        // Check if we have url in memory
        let url = urls.find((u) => u.short === short);
        if (url) {
            res.json({ original: url.original });
        } else {
            res.status(400).json({ message: "URL does not exist" });
        }
    } catch (error) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
