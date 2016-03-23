var AWS = require('aws-sdk')
var base = require('../base.js')
var fs = require('fs')

function S3Backend (config) {
  var s3conf = {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
  }

  // if custom endpoint is passed we are probably dealing with some
  // development S3 server, so set `s3ForcePathStyle` as well (otherwise
  // buckets become subdomains off `localhost`)
  if (config.endpoint) {
    s3conf.s3ForcePathStyle = true
    s3conf.endpoint = new AWS.Endpoint(config.endpoint)
  }

  this.config = config
  this.client = new AWS.S3(s3conf)
}

// TODO accept stream
S3Backend.prototype.upload = function (task, filePath, callback) {
  var params = {
    Key: base.keyFromTask(task),
    Bucket: base.bucketFromTask(task),
    Body: fs.createReadStream(filePath)
  }
  this.client.upload(params, function (err, data) {
    if (err) {
      callback(err)
    } else {
      callback(null, {done: data})
    }
  })
}

module.exports = S3Backend
