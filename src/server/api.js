const express = require("express");
const api_helper = require('./api_helper')
const app = express();
const port = 3000; // <- React와 안 겹치게 생성


app.get("/", (req, res) => {
    res.send("Hello");
});

app.get('/getAPIResponse', (req, res) => {
    api_helper.make_API_call('https://api.iamport.kr/users/getToken?_token=d4e5270e69cac09bed753964db0f2a61935ee96a')
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    })
})

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});