const request = require('request');
const fs = require('fs');

//Catching initial User Inputs
const input = process.argv.slice(2);
const URL = input[0];
const localFilePath = input[1];

//For further user interactivity
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

//Main Function 
const fileCreator = function (url) {

  request(url, (err, res, body) => {
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

  rl.close();
}

//Checking if FILE exists

if (fs.existsSync(localFilePath)) {
  rl.question('File already exist, do you want to overwrite? Press Y for Yes and N to terminate', (response) => {
    if (response === 'y') {
      fileCreator(URL);
    } else if (response === 'n') {
      rl.close();
    }
  })
} else {
  fileCreator(URL);
}









