var backends = {
  s3: './s3backend.js'
}

function pick_backend (config) {
  for (var key of Object.keys(backends)) {
    if (config[key]) {
      var Backend = require(backends[key])
      return new Backend(config[key])
    }
  }
}

function Storage (config) {
  this.backend = pick_backend(config)
  if (!this.backend) {
    throw Error('failed to initialize backend')
  }
}

Storage.upload_file = function (task, filePath, callback) {
  this.backend.upload_file(task, filePath, callback)
}

module.exports = Storage
