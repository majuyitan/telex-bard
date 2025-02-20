// ./server.js

const app = require('./src/app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Telex Bard server is running on http://localhost:${PORT}`);
});
