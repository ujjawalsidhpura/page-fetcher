const request = require('request');
const fs = require('fs');

const input = process.argv.slice(2);
const URL = input[0];
const localFilePath = input[1];

request(URL, (err, res, body) => {
  if (err) {
    console.log('Error: ', err);
  }
  // console.log('StatusCode', res && res.statusCode);
  // console.log(body)

  fs.writeFile(localFilePath, body, err => {
    if (err) {
      console.log(err)
      return;
    }

    const stats = fs.statSync(localFilePath);
    const fileSizeInBytes = stats.size;

    console.log(`Downloaded ${fileSizeInBytes} bytes and saved to ${localFilePath}`);
  })
})

