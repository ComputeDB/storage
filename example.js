var fs = require('fs')
var Storage = require('./index.js')

var filePath = '/tmp/hello.txt'
fs.writeFileSync(filePath, 'hello')

var task = {name: 'TodaysProfit'}

// https://github.com/jubos/fake-s3
// install:   gem install fakes3
// start:     fakes3 -r /tmp/data -p 4567

var fake_s3 = {
  accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
  secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  endpoint: 'http://localhost:4567'
}

var storage = new Storage({s3: fake_s3})

storage.upload(task, filePath, function (err, status) {
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
