const yargs=require('yargs');

//customize yarg version
yargs.version('1.1.0')

yargs.command({
    command:'add',
    describe:'Add a new notes',
    handler:function(){
        console.log('Add new note')
    }
})

yargs.command({
    command:'remove',
    describe:'Remove a new notes',
    handler:function(){
        console.log('Remove a note')
    }
})

yargs.command({
    command:'add2',
    describe:'add with builder',
    builder: {
        title: {
            describe: 'No title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'No body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log('Title: ' + argv.title)
        console.log('Body: ' + argv.body)
    }
})

yargs.parse()
console.log(yargs.argv)