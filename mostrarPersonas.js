const request = require('request-promise')

request('https://reclutamiento-14cf7.firebaseio.com/personas.json',function(error, response, body) {
    console.log(JSON.parse(body));
    console.log('statusCode:', response.statusCode);
})
