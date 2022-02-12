const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new Schema({
  UserId: {
    type: mongoose.Types.ObjectId
  },
  Date: {
    type: Date
  },
  FileName: {
    type: String
  },
  BlobPath: {
    type: String
  },
  UploadFinished: {
    type: Boolean
  },
  NlProcessed: {
    type: Boolean
  }
});

const File = mongoose.model("File", fileSchema, "col_UploadedFiles");

module.exports = { File };
