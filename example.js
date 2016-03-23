var fs = require('fs')
var Storage = require('./index.js')

var filePath = '/tmp/hello.txt'
fs.writeFileSync(filePath, 'hello')

var task = {name: 'TodaysProfit'}

Storage.upload_file(task, filePath, function (err, status) {
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
