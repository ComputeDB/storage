# What

Store objects (bytes) ; supported backends

- Local filesystem
- Memory
- Amazon S3
- Backblaze B2
- Ceph.io
- IPFS

## API

```javascript
var Storage = require('compute-storage')

var store = new Storage(/* pass config here */)

storage.uploadResult(task, filePath, function (err, update) {
  if (err) {
    // `handle` errors
    console.error('Error occurred uploading ' + filePath, err)
  } else {
    // called when upload has finished
    if (update.done) {
      console.log('finished uploading', update.done)
    }
    // called on progress updates (if supported by backend)
    if (update.progress) {
      console.log('upload progress', update.progress)
    }
  }
})
```

## Usage

Using local Amazon S3 compatible server. https://github.com/jubos/fake-s3

```sh
gem install fakes3 # install it
# start with /tmp/data as storage dir on port 4567
fakes3 -r /tmp/data -p 4567
```

Create a config file

```javascript
var fake_s3 = {
  accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
  secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  endpoint: 'http://localhost:4567'
}
```
