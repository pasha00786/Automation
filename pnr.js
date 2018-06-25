// Developed by Ashutosh Gupta using Puppeteer.
// Screenshots user's PNR details and returns to the user.
const viewPort = { width: 1366, height: 768 }
const pnr = '2147267263';
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-infobars']})
  const page = await browser.newPage()
  await page.setViewport(viewPort)
  await page.goto('https://www.trainspnrstatus.com/')
  await page.type('#fullname', pnr)
  await page.click('#contact_form > div > button')
  await page.waitForNavigation()
  const element = await page.$('#menu-1 > div > div > div.col-md-8');
  await page.waitFor(1000);
  await element.screenshot({
    path: 'pnr.png',
  });
  browser.close();
})()