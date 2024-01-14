const fs = require('fs')
const path = require('path')

const upload = (filePath) => {
    const fileContent  = fs.readFileSync(filePath , 'utf-8' );


    const destinationPath = path.join(__dirname,"/Uploads",'sk.txt')

    fs.writeFileSync(destinationPath , fileContent , 'utf-8');


    console.log("file uploaded succesfully :" , destinationPath)
}

if (process.argv.length < 3) {
    console.error('Usage: node fileUploadScript.js <file_path>');
    process.exit(1);
  }
  const filePath = process.argv[2];
  upload(filePath);

  module.exports = {
    upload
  }