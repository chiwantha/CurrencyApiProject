const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//setup middlewares
app.use(express.json());
app.use(cors());

//add currencies
app.get("/getAllCurrencies", async(req, res)=>{

    const nameURL = `https://openexchangerates.org/api/currencies.json?
    app_id=2836a9ffcd154733a01cb58d99dc468c`;

    try{
        const nameResponse = await axios.get(nameURL);
        const nameData = nameResponse.data;
        
        return res.json(nameData);
    }
    catch(err){
        console.error(err)
    }

})

//add target amount
app.get("/convert", async(req,res)=>{
    
    const {date,saurceCurrency,targetCurrency,amountInsaurceCurrency} = req.query;
    
    const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=2836a9ffcd154733a01cb58d99dc468c`;

    try{
        const dataResponse = await axios.get(dataURL);
        const rates = dataResponse.data.rates;

        //rates
        const saurceRate = rates[saurceCurrency];
        const targetRate = rates[targetCurrency];
        const targetAmount = (targetRate / saurceRate) * amountInsaurceCurrency;

        //return the rate
        return res.json(targetAmount.toFixed(2));
        
    } catch (err) {
        console.error(err);
    }
})

//listen to a port
app.listen(5000, ()=>{
    console.log("server started !")
});
