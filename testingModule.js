 
// call back function 
function message(){
    console.log("\nTask Completed");
}

function print(a,b,message){

    console.log(a+b);
    
    message();
}

// print(1,2,message);


// inbuild module like os and fs

const os = require('os');
const fs = require('fs');

// installed library lodash --> use to manage the basic performance of the code
const _ = require('lodash');
const { log } = require('console');

const osmemo = os.freemem()*100/os.totalmem();
const info = os.userInfo()
const userinfo = info.username;



// console.log("free "+osmemo);
// console.log(info);
// console.log("Hello " +userinfo);


// fs module

// fs.appendFile('testing.txt','Hello '+ userinfo+ '\n',function(err){
//     if(err){
//         console.log("Error");
//     }
//     else{
//         console.log("File Created");
//     }
// }); 

const data = [11,11,5,4,6,5,4,12,5,56,6,1,1,15,5,5];

const unique = _.uniq(data);
const sorted = _.sortBy(unique);
console.log(unique);
console.log(sorted);

const Add = _.add(1,2);
console.log(Add);

const Random = _.random(1,10);
console.log(Random);

