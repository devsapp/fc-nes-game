async function preInit(inputObj) {

}

async function postInit(inputObj) {
    console.log(`\n    ____________________     ________    _____      _____  ___________
    \\_   _____/\\_   ___ \\   /  _____/   /  _  \\    /     \\ \\_   _____/
     |    __)  /    \\  \\/  /   \\  ___  /  /_\\  \\  /  \\ /  \\ |    __)_ 
     |     \\   \\     \\____ \\    \\_\\  \\/    |    \\/    Y    \\|        \\
     \\___  /    \\______  /  \\______  /\\____|__  /\\____|__  /_______  /
         \\/            \\/          \\/         \\/         \\/        \\/ 
     `)
    console.log(`\n    Welcome to the fc-nes-game application
     This application requires to open these services: 
         FC : https://fc.console.aliyun.com/
     This application can help you quickly deploy the fc-nes-game project.
     The application uses FC component：https://github.com/devsapp/fc
     The application homepage: https://github.com/devsapp/fc-nes-game\n`)
}

module.exports = {
    postInit,
    preInit
}
