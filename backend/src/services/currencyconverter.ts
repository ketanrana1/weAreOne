var https = require('https');

export default function convertCurrency(amount: any, fromCurrency: any, toCurrency: any, cb:any) {
  var apiKey = '7be7ff38a13ccc19088c';

  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  var query = fromCurrency + '_' + toCurrency;

  var url = 'https://api.currconv.com/api/v7/convert?q='
            + query + '&compact=ultra&apiKey=' + apiKey;

  https.get(url, function(res: any){
      var body = '';

      res.on('data', function(chunk: any){
          body += chunk;
      }); 

      res.on('end', function(){
          try {
            var jsonObj = JSON.parse(body);


            var val = jsonObj[query];
            if (val) {
              var total = val * amount;
              cb(null, Math.round(total * 100) / 100);
            } else {
              var err = new Error("Value not found for " + query);
              console.log(err);
              cb(err);
            }
          } catch(e) {
            console.log("Parse error: ", e);
            cb(e);
          }
      });
  }).on('error', function(e: any){
        console.log("Got an error: ", e);
        cb(e);
  });
}
