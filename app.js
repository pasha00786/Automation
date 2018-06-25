var express = require('express');
var app = express();
const puppeteer = require('puppeteer');
var http = require('http'),
    fs = require('fs'),
    url = require('url')

app.get('/pnr/:pnr', function (req, res) {
   const viewPort = { width: 1366, height: 768 }
	const pnr = req.params.pnr;
	const file = __dirname + '/'+pnr+'.png';
	console.log('entered');
	(async () => {
	  const browser = await puppeteer.launch({headless:false,args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-infobars']})
	  const page = await browser.newPage()
	  await page.setViewport(viewPort)
	  await page.goto('https://www.trainspnrstatus.com/')
	  await page.type('#fullname', pnr)
	  await page.click('#contact_form > div > button')
	  await page.waitForNavigation()
	  const element = await page.$('#menu-1 > div > div > div.col-md-8');
	  await element.screenshot({
	    path: pnr + '.png',
	  });
	  browser.close();
  	  await res.sendFile(file);
  	  //await res.download(file);
	})()
})

var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})