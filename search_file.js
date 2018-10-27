const fs = require('fs');
const path = require('path');
var filesCollection = [];

const extension = process.argv[2]; // Getting the first parameter
const searchValue = process.argv[3]; // Getting the second parameter

if(!extension || !searchValue){  // Checking if the parameters contain a value => if not return
    console.log("USAGE: node search [Ext] [Text]");
    return;
}

function readDirSync(directory) {
    var currentDirectorypath = path.join(__dirname + directory);
    var currentDirectory = fs.readdirSync(currentDirectorypath, 'utf8');
    currentDirectory.forEach(file => {
        var pathOfCurrentItem = path.join(__dirname + directory + '/' + file);
        if (fs.statSync(pathOfCurrentItem).isFile()) {
            if(checkExtension(file))
                if(readFileAndSearchString(pathOfCurrentItem)){
                    filesCollection.push(pathOfCurrentItem); // Adding the file's path to array
                    console.log(pathOfCurrentItem);
                }
        }
        else {
            var directorypath = path.join(directory + '\\' + file);
            readDirSync(directorypath);
        }
    });
}

const checkExtension = function(file){
    return file.endsWith(extension); // Returns if the file is type of extension
}

function readFileAndSearchString(file) {
    var text = fs.readFileSync(file, 'utf8'); // Reads the file
    return text.includes(searchValue); // Returns if the file containts the specific string of search
}

readDirSync('');
if(filesCollection.length === 0){ // Checking if the array has value
    console.log("No file was found");
}