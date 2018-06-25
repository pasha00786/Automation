// Developed by Ashutosh Gupta using Puppeteer.
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: false, args: ['--disable-infobars','--start-fullscreen']})
  const page = await browser.newPage()
  await page.setViewport({ width: 1366, height: 768});
  await page.goto('https://erp.iitkgp.ac.in/SSOAdministration/login.htm?sessionToken=605004DADA90BF5FB1BF8CABAB515F25.worker2&requestedUrl=https://erp.iitkgp.ac.in/IIT_ERP3/home.htm')
  await page.type('#user_id', '')
  await page.type('#password', '',{delay: 7})
  await page.waitForSelector('#question')
  const name = await page.evaluate(() => document.querySelector('#question').innerText)
  var answer;
  switch(name) {
  	case '':
  		answer = '';
  		break;
	case '':
  		answer = '';
  		break;
  	case '':
  		answer = '';
  		break;  	
  }
  await page.waitForSelector('#answer')
  await page.type('#answer', answer)
  await page.click('#signin > div > div > div > div > form > fieldset > div.row > div > input.btn.btn-primary')
  await page.waitForNavigation({ waitUntil: 'networkidle0' })
  await page.click('#skiplink')
  await page.goto('https://erp.iitkgp.ernet.in/IIT_ERP3/menulist.htm?module_id=16')
  await page.waitForNavigation({ waitUntil: 'networkidle0' })
  await page.click('#accordion > div:nth-child(11) > div.panel-heading.accordion-toggle.collapsed')
  await page.waitFor(100)
  await page.click('#collapse163 > div > div:nth-child(11) > a.text-default')
  await page.waitForNavigation()
})()
