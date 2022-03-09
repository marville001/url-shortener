const express = require('express');
const Express = require('Express');
const app = Express();


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api', require('./routes/urls'));

// Server Setup
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});