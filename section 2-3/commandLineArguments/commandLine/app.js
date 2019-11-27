console.log(process.argv);
console.log(process.argv[2]);

var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);