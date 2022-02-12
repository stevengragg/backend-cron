const cron = require("node-cron");
const axios = require("axios");
const cronJob = () => {
  cron.schedule("*/3 * * * *", async () => {
    console.log("running a task every 3 minutes");
    const resp = await axios({
      method: "POST",
      url: `http://localhost:5001/jobs?jobType=jobReadAllFiles`,
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        name: "Luke"
      }
    });
  });
};

module.exports = cronJob;
