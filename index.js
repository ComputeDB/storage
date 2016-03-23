var S3Backend = require('./s3backend.js')

var task = {
  name: 'TodaysProfit'
}

var fs = require('fs')

var filePath = '/tmp/hello.txt'

fs.writeFileSync(filePath, 'hello')

var conf = {
  storage: {
    s3: {
      accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
      secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
      endpoint: 'http://localhost:4567'
    }
  }
}

var s3 = new S3Backend(conf)

s3.uploadResult(task, filePath, function (err, status) {
  if (err) {
    console.error(err.stack || err)
    process.exit(-1)
  }

  if (status.progress) {
    console.log(JSON.stringify(status.progress, null, 2))
  }

  if (status.done) {
    console.log('done', status.done)
    process.exit(0)
  }
})
