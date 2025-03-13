const dotenv = require("dotenv");
const stream = require('stream')
function initEnv() {
  return dotenv.config({
    path: `./.env.${process.env.NODE_ENV || "production"}`,
  });
}

function ImageuploadBuffer(data){
  const bufferStream = new stream.PassThrough();
  bufferStream.end(data.buffer);
  return bufferStream
}

module.exports = {initEnv,ImageuploadBuffer};
