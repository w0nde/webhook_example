const express=require('express')
const { exec } = require('child_process')
const router=express.Router()

router.use(express.json())

router.post("/webhooks",(req,res)=> {
    console.log(req.body);
    const child=exec(`
    git clone git@github.com:oltursa/ventas-ws.git
    cd ventas-ws
    mvn clean package
    cd ..
    mv ventas-ws/target/ws-tienda.war ws-tienda.war
    rm -rf ventas-ws/
    `)
    child.stdout.on('data', function(data) {
        console.log(data.toString()); 
    })
    res.send("hello world")
})
const app = express()
app.use('/', router)

app.listen(3000,()=>{
    console.log('ready');
})



