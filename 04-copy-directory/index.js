const fs = require('fs');
const path = require('path');
const { copyFile, mkdir } = require('fs/promises');

class CopyDir {
  constructor () {
    this.pathToFolder = path.join(__dirname, 'files');
    this.pathToFolderCopy = path.join(__dirname, 'files-copy');
    this.removeFile(this.pathToFolderCopy);
  }

  getFile() {
    fs.readdir(this.pathToFolder, { withFileTypes: true }, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        console.log('PATH', path.join(__dirname, 'files', file.name));
        this.copy(file.name);
      });
    });
  }
  

  async copy (name) {
    try {
      copyFile(path.join(__dirname, 'files', name), path.join(__dirname, 'files-copy', name));
    } catch (error) {
      console.log(error);
    }
  }

  removeFile (pathToFile) {
    fs.readdir(pathToFile, { withFileTypes: true }, (err, files) => {
      if(err) {
        mkdir(this.pathToFolderCopy, { recursive: true });
      }
      if(files) {
        for (let file of files){
          const pathToFile = path.join(__dirname,'files-copy', file.name);
          fs.stat(pathToFile, (errStat, status) => {
            if(errStat) throw errStat;
            if(status.isDirectory()){
              this.removeFile(pathToFile + '/' + file.name);
            }else{
              fs.unlink(path.join(__dirname, 'files-copy', file.name), (err) => {
                if (err) return console.error(err);
              });
            }
          });
        }
      }
      
      this.getFile();
    });
  }
}

new CopyDir();