// work to implement
// input directorypath
// create organized_files directory inside input directorypath
// identify categories of all the files in input directorypath
// copy/cut files from input directory to organized_files directory

let fs= require("fs");
let path= require("path");

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    images: ['jpeg','png']
}


function organizeFn(dirpath){
    // console.log("organize command has been implemented for ",dirpath);

    // check if user have provided path of directory to organize

    let despath;
    if(dirpath==undefined){

        // means user haven't told which directory to organize
        // so we will gona organize current working directory

        // console.log("please Enter a path");

        
        despath=path.join(process.cwd(),"organized_files"); 
        // return;
        if( fs.existsSync(despath)==false ){
            fs.mkdirSync(despath);
            // Directory(organized_files) created inside current working directory 
        }

        organizeHelper(process.cwd(),despath); //this function will organize cwd

    }else{

        // if user have provided path 
        // then check is this path exists in our system

        let doesexist= fs.existsSync(dirpath);
        if(doesexist){

            // Means path provided by user exists in system

            // now we will create organized_files directory inside our cwd
            // this organized_files going to contain our data of cwd in organized way

           
             despath=path.join(dirpath,"organized_files"); // iss path pr directory bnayenge

            if( fs.existsSync(despath)==false ){
                fs.mkdirSync(despath);
                 // Directory(organized_files) created inside current working directory 
            }
            organizeHelper(dirpath,despath); //this function will organize cwd
        }else{
            console.log("please Enter a correct path");
            return;
        }
        
    }
    
}

function organizeHelper(src,dest){

    // Now we have to get all the files/folders inside cwd

    let childNames = fs.readdirSync(src);

    // console.log(childNames);

    //  Now we want address of all the files/folders inside cwd
    for(let i=0;i<childNames.length;i++){

        let childaddress=path.join(src,childNames[i]);  // Now we have the path of all the files/folders
        // console.log(childaddress);


        //  Now we will check is it a path of file or a folder
        // Because we are going to organize all the files of cwd in organized_files directory and Not folders
        let isFile= fs.lstatSync(childaddress).isFile();

        if(isFile){
            // console.log(childNames[i]);

            // Now we have to find out to which category current file belongs
            // so that we can move it to its respective folder in organized_files directory

            let category= getCategory(childNames[i]);

            // console.log(childNames[i]," belongs to --->",category);

            sendFiles(childaddress,dest,category);  //this function will copy all the files from cwd and paste it to our organized_files directory according to the their category

        }
    }

}

function sendFiles(srcFilePath,dest,category){

    
    // Firstly we are going to check is that folder(in which we have to paste files of certain category) exists in organized_files directory or not 
    
    let categoryPath= path.join( dest,category );

    if(fs.existsSync(categoryPath)==false){   //if that folder doesn't exists
        // create it
        fs.mkdirSync(categoryPath);  
    }

    // now we have to make path like where we have to paste the file 

    let fileName= path.basename(srcFilePath);

    let destFilePath= path.join( categoryPath,fileName );

    fs.copyFileSync(srcFilePath,destFilePath);

    // for cut paste 
    // fs.unlinkSync(srcFilePath); 
    console.log(fileName," Copied to ",category);

}




function getCategory(name){

    // firstly we have to find the extension of the given file so that we can find that to this category this file belongs
    let ext = path.extname(name);
    // console.log(ext);

    ext=ext.slice(1);


    for(let type in types){

        let cTypearr= types[type];

        for(let i=0;i<cTypearr.length;i++){
            if(ext==cTypearr[i]){
                return type;
            }
        }
    }

    return "others";  //

}

module.exports={
    organizeKey: organizeFn
}
