require("dotenv").config();

const Agenda = require("agenda");
const dayjs = require("dayjs");
const { File } = require("../../models/file");

const database = process.env.DATABASE_URL || "";
const agenda = new Agenda({
  db: {
    address: database,
    collection: "col_QueueJobs"
  }
});

// agenda.define("instantJob", async (job) => {
//   const data = job?.attrs?.data;
//   console.log("This job is running as soon as it was received. This is the data that was sent:");
//   console.log(data);
// });

// agenda.define("delayedJob", async (job) => {
//   const data = job?.attrs?.data;
//   console.log("This job is running after a 5 second delay. This is the data that was sent:");
//   console.log(data);
// });

//TODO: (First Job On Queue) Read all file which have "NL_Processed:" false and "UploadFinished": true

agenda.define("jobReadAllFiles", async (job) => {
  const data = job;
  console.log("jobReadAllFiles: started", { data });
  const files = File.find({}).exec();
  console.log(files);
});

agenda.start();

module.exports = (app) => {
  app.use("/jobs", (req, res) => {
    console.log(req);
    const jobType = req?.query?.jobType;
    const allowedJobs = Object.keys(agenda._definitions);

    if (!jobType) {
      return res.send("Must pass a jobType in the query params.");
    }

    if (!allowedJobs.includes(jobType)) {
      return res.send(`${jobType} is not supported. Must pass one of ${allowedJobs.join(", or ")} as jobType in the query params.`);
    }

    agenda.now(jobType, req.body);

    // if (jobType === "delayedJob") {
    //   agenda.schedule(dayjs().add(5, "seconds").format(), req?.query?.jobType, req.body);
    // }

    res.send("Job added to queue!");
  });
};
