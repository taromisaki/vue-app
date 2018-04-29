let  fs = require('fs');
let  join = require('path').join;
/**
 * 
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
    let result=[];
    let musicraa = [];
    let mar = new RegExp('(.mp3)$');
    function finder(path) {
        let files=fs.readdirSync(path);
        files.forEach((val,index) => {
            let fPath=join(path,val);
            let stats=fs.statSync(fPath);
            if(stats.isDirectory()) finder(fPath);
            if(stats.isFile() && mar.test(fPath)) result.push(fPath);
        });
        console.log(result)
    }
    finder(startPath);
    return result;
}
let fileNames=findSync('f:/');
