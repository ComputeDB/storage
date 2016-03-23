var backends = {
  s3: './backends/s3.js',
  b2: './backends/b2.js',
  fs: './backends/fs.js'
}

function pick_backend (config) {
  for (var key of Object.keys(backends)) {
    if (config[key]) {
      var Backend = require(backends[key])
      return new Backend(config[key])
    }
  }
}

// create and initialize backend
function Storage (config) {
  this.backend = pick_backend(config)
  if (!this.backend) {
    throw Error('failed to initialize backend')
  }
}

// list available backends
Storage.backends = function () {
  return Object.keys(backends)
}

// upload a file using selected backend
Storage.prototype.upload = function (task, filePath, callback) {
  this.backend.upload(task, filePath, callback)
}

module.exports = Storage
