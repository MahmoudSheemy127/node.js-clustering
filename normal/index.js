const express = require('express')
const app = express();

const PORT = 3001


app.get('/', (req,res) => {

    /* Processing delay */
    const start = Date.now()
    while (Date.now() - start < 2000);
    
    /* Server respond */
    res.send("Hello World");
})

app.listen(PORT,() => {
    console.log(`Server started listening on ${PORT}`)
})

