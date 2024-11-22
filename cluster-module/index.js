const express = require('express')
const cluster = require('cluster')
const os = require('os')

const numOfCpus = os.cpus().length

/* Main process */
if(cluster.isMaster) {
 
    /* Based on the number of cores, child processes will be forked */
    for(i=0; i<numOfCpus; i++) {
        /* Create a fork */
        const worker = cluster.fork()
        
        worker.on('exit', (code,signal) => {
            if(signal) {
                console.log(`worker ${worker.process.pid} exited with signal ${signal}`)
            } 
            if(code) {
                console.log(`worker ${worker.process.pid} exited with code ${code}`)
            }
        })   
    }
} else {
    /* Create a server */
    const app = express()
    /* Add server logic */
    app.get('/',async (req,res) => {
        
        /* Processing delay */
        const start = Date.now()
        while (Date.now() - start < 2000);

        res.status(200).send(`Hello World from ${process.pid}`);

    })

    app.listen(3000,() => {
        console.log(`Process ${process.pid} is running at port 3000`)
    })
}


