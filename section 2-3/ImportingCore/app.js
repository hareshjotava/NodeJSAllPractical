const fs=require('fs');

fs.writeFileSync("demo.txt","Hi")
fs.writeFileSync("demo.txt","How are you?")

fs.appendFileSync("demp.txt","Hi,");
fs.appendFileSync("demp.txt","How are you?");
