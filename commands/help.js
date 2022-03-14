function helpFn(){
    console.log(`
        List of All Commands:
            node main.js tree "directorypath"
            node main.js organize "directorypath"
            node main.js help
    `);
}

module.exports={
    helpKey : helpFn
}