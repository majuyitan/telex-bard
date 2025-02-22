// ./src/routes/integration.js

const express = require('express');
const router = express.Router();

router.get('/integration', (req, res) => {
    res.json({
        "data": {
            "date": {
                "created_at": "2025-02-20",
                "updated_at": "2025-02-20"
            },
            "descriptions": {
                "app_name": "Telex Bard",
                "app_description": "This integration posts a short poem or excerpt from a famous poet at a scheduled interval (daily at 8 AM). The poems are pre-stored in a local database and are selected sequentially.",
				"app_logo": "https://telex-bard.onrender.com/quill.png",
                "app_url": "https://telex-bard.onrender.com/",
                "background_color": "#fff"
            },
            "is_active": true,
            "integration_type": "interval",
            "key_features": [
                "Prints out a poem every day at 8 AM."
            ],
            "author": "Majuyi",
            "integration_category": "Communication & Collaboration",
            "website": "https://telex-bard.onrender.com",
            "settings": [
                {
                    "label": "Time Interval",
                    "type": "number",
                    "required": true,
                    "default": "* * * * *"
                }
            ],
            "target_url": "https://telex-bard.onrender.com/",
            "tick_url": "https://telex-bard.onrender.com/tick"
        }
    });
});

module.exports = router;
