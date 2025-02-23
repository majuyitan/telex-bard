# Telex Bard

## **Project Overview**
Telex Bard is an Interval Integration for Telex that delivers a 'Poem of the Day' from a predefined collection at a specific time every day. This integration is developed using **Node.js** and integrates seamlessly with the **Telex API** to post messages automatically.

---

## **Key Features**
- Automatically selects and posts a random poem to a Telex channel daily.
- Uses the **Telex Messages API** to deliver the poems.
- Configured to run at **8 AM every evening** using Interval cron scheduling.
- Implements **Bearer Token Authentication** for secure API access.

---

## **Tech Stack**
- **Node.js** - Backend server.
- **Express.js** - API routing.
- **Axios** - HTTP client for external API calls.
- **Interval** - Task scheduling.
- **dotenv** - Environment variable management.

---

##  **Setup Instructions**

### 1. **Clone the Repository:**
```sh
git clone https://github.com/majuyitan/telex-bard.git
cd telex-bard
```

### 2. **Install Dependencies:**
```sh
npm install
```

### 3. **Environment Variables:**
Create a `.env` file in the root directory and add:
```plaintext
PORT=PORT
TELEX_WEBHOOK_URL=https://ping.telex.im/v1/webhooks/YOUR-WEBHOOK-ID
```

Replace `YOUR-WEBHOOK-ID` with your actual Telex webhook ID.

### 4. **Run the Server:**
```sh
npm start
```

### 5. **Test the Endpoint:**
Use Postman or any API testing tool to **POST** to `http://localhost:3000/tick`.

### 6. **Run Tests:**
```sh
npm test
```

---

## **Integrating Telex Bard with a Telex Channel**

### Step-by-Step Integration Guide:
#### 1. **Create a Telex Channel:**
- Go to Telex and create a new channel.
- Note the Webhook URL provided by Telex.

#### 2. **Configure Your Integration:**
- In your integration.js file, add the Webhook URL to ensure your integration is connected correctly.
- Example configuration:
```json
{
    "return_url": "https://ping.telex.im/v1/webhooks/YOUR_WEBHOOK_ID",
    "settings": [
        {
            "label": "interval",
            "default": "0 8 * * *"
        }
    ]
}
```

#### 3. **Set Up Cron Interval:**
- The interval setting uses cron syntax.
- The example `"0 8 * * *"` triggers the integration daily at 8 AM.
- Cron Expression Generator can help customize this.

#### 4. **Deploy & Test:**
- Ensure your server is running:

```sh
npm start
```

- Trigger a tick event to verify the integration:

```sh
curl -X POST http://localhost:3000/tick
```

#### 5. **Verify Telex Channel:**
- Check your Telex Channel to see if the Poem of the Day is delivered as expected.

### Updating Integration Settings:
- You can update the cron interval or return URL by editing the settings in the integration.js file.
- After updating, restart your server:

```sh
npm run start
```

### Troubleshooting:
- No Poem Posted?
- Check server logs:

```sh
npm run logs
```

- Verify Webhook URL and network connectivity.

### Scheduling Issues?
- Test the /tick route directly to ensure it’s reachable:

```sh
curl -X POST http://localhost:3000/tick
```

---

## **How It Works**
- `tick.js` is the main route that triggers the poem delivery.
- It fetches a random poem using the `getRandomPoem()` utility.
- Sends the poem to the Telex channel using the **Telex Messages API**.
- Scheduled to run automatically at **8 AM daily**.

---

## **Testing**

To run the test suite for this project, follow these steps:

### 1. **Install Dependencies**

Ensure all required packages are installed:

```sh
npm install
```

### 2. **Setup Environment Variables**

Create a .env.test file (or use .env) and add any necessary environment variables for testing. For example:

```sh
TELEX_WEBHOOK_URL=https://example.com/webhook
```

### 3. **Run Tests**

To execute all tests:

```sh
npm test
```

Or, using **Jest**, you can also run:

```sh
npx jest
```

### 4. **Running Specific Tests**

To run a single test file:

```sh
npx jest path/to/testFile.test.js
```

### 5. **Skipping or Focusing Tests**
- Skip a test using .skip:

```js
it.skip('should do something', () => {
    // test code
});
```

- Run only a specific test using .only:

```js
it.only('should do something', () => {
    // test code
});
```

6. **Test Coverage**

To generate a test coverage report:

```sh
npx jest --coverage
```

The coverage report will be available in the coverage/ directory.

![Telex Bard on telex-bard channel](image.png)
Get logged in to the `telex-bard` or `github-telex-integration` channels on Telex test organization to view the activity of Telex Bard live in real-time

---

## **Project Structure**
```
├── public
│   └── quill.png
├── src
│   ├── routes
│   │   ├── health.js
│   │   ├── index.js
│   │   ├── integration.js
│   │   ├── tick.js
│   │   └── webhook.js
│   ├── utils
│   │   ├── getRandomPoem.js
│   │   ├── jobManager.js
│   │   └── telexPoster.js
│   ├── app.js
│   └── poems.json
├── tests
│   ├── routes
│   │   ├── health.test.js
│   │   └── integration.test.js
│   ├── utils
│   │   └── getRandomPoem.test.js
│   ├── app.test.js
│   └── jest.config.js
├── README.md
├── image.png
├── package-lock.json
├── package.json
└── server.js
```

## **API Endpoints**

### **Health Check**
```http
GET /health
```
- **Response:** `{ "status": "Healthy" }`

### **Integration Info**
```http
GET /api/integration
```
- **Response:** Provides metadata for Telex integration.

### **Tick Endpoint**
```http
POST /tick
```
- **Request Body:**
```json
{
    "return_url": "https://your-webhook-url.com",
    "settings": [
        {
            "label": "interval",
            "default": "0 8 * * *"
        }
    ]
}
```

---

## **Future Improvements**
- Add more advanced scheduling options.
- Implement error handling and retries for API requests.
- Expand the poem collection dynamically from external sources.

---

## Contributing

1. **Fork the repository**.

2. **Create a feature branch**:

```bash
git checkout -b feature/YourFeatureName
```

3. **Commit your changes**:

```bash
git commit -m 'Add YourFeatureName'
```

4. **Push to the branch**:

```bash
git push origin feature/YourFeatureName
```

5. **Open a Pull Request**.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Support

For support, please open an issue in the GitHub repository.
