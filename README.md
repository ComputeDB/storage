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
console.log(Storage.backends) // => ['s3']
```

Configure storage system. Top level key has to be one of `backends`.

```javascript
var s3_store = new Storage({s3: /* pass AWS S3 config here */})
var b2_store = new Storage({b2: /* pass Backblaze B2 config here */})
var fs_store = new Storage({fs: /* pass local filesystem config here */})
```

Upload a file, same API for any backend

```javascript
storage.upload(task, filePath, function (err, update) {
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

## S3 Example

Using local Amazon S3 compatible server. https://github.com/jubos/fake-s3

```sh
gem install fakes3 # install it
# start with /tmp/data as storage dir on port 4567
fakes3 -r /tmp/data -p 4567
```

Create a config file and pass to constructor

```javascript
var fake_s3 = {
  accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
  secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  endpoint: 'http://localhost:4567'
}

// config key selects backend (`s3`)
var storage = new Storage({s3: fake_s3})
```
