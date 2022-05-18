const fs = require('fs');
const path = require('path');


class FileInFoleder {
  constructor () {
    this.pathToFolder = path.join(__dirname, 'secret-folder');
    this.searchFile(this.pathToFolder);
  }

  searchFile(pathToFolder) {
    fs.readdir(pathToFolder,{withFileTypes: true}, (err, files) => {
      if(err) throw err;
      files.forEach((file)=>{
        const pathToFile = path.join(__dirname,'secret-folder', file.name);
        if(file.isDirectory()) return;
        const extname = path.extname(file.name);
        fs.stat( pathToFile, (err, stats) => {
          if (err) return err;
          console.log(`${path.basename(pathToFile, extname)} - ${extname} - ${this.formatBytes(stats.size)}`);
        });
      });
    });
  }

  formatBytes(bytes, decimals = 3) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}

new FileInFoleder();



  
  
