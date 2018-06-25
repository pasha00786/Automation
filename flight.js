// Developed by Ashutosh Gupta using Puppeteer.
// Provides the cheapest flight deatils by scrapping MMT webiste. 
const puppeteer = require('puppeteer');
var readline = require('readline-sync');
var from = readline.question("Enter the Source airport code!\n");
var to = readline.question("Enter the Destination airport code!\n");
var date = readline.question("Enter the date in 'DD-MM-YYYY' format to query the flight stats!\n");
var direct = readline.question("Type 'Y' to consider other than direct flight else type 'N'!\n");
var type;
var info = '';
console.log('Searching...');
(async () => {
  const browser = await puppeteer.launch({headless: false, args: ['--disable-infobars']})
  const page = await browser.newPage()
  await page.setViewport({ width: 1366, height: 768});
  await page.goto('https://flights.makemytrip.com/makemytrip/search/O/O/E/1/0/0/S/V0/'+from+'_'+to+'_'+date+'?contains=false&remove=') 
  if(direct == 'N')
  await page.click('#stops_0_dep');
  const duration = await page.evaluate(() => document.querySelector('#content > div > div.container.ng-scope > div.row > div.main.col-lg-9.col-md-9.col-sm-12.col-xs-12 > div:nth-child(5) > div > div.top_first_part.clearfix > div.col-lg-2.col-md-2.col-sm-2.hidden-xs.row.time_info.duratn > span.block.city_name.ng-binding').innerText)
  if(duration == 'Non stop')
    type = 'is direct.';
  else
    if (duration == '1 Stop') {
      type = 'is not direct and has 1 stop.';
      await page.click('#content > div > div.container.ng-scope > div.row > div.main.col-lg-9.col-md-9.col-sm-12.col-xs-12 > div:nth-child(5) > div > div.c-listing_row__more.c-listing_row_append.clearfix > div.pull-right.hidden-xs > span > a');
      info = await page.evaluate(() => document.querySelector('#content > div > div.container.ng-scope > div.row > div.main.col-lg-9.col-md-9.col-sm-12.col-xs-12 > div:nth-child(5) > div > div.clearfix.main-div1.first_active.c-listing_row.c-listing_row__details > div > div > div:nth-child(2) > p > span').innerText)
    }
  const airline= await page.evaluate(() => document.querySelector('#content > div > div.container.ng-scope > div.row > div.main.col-lg-9.col-md-9.col-sm-12.col-xs-12 > div:nth-child(5) > div > div.top_first_part.clearfix > div.col-lg-2.col-md-2.col-sm-2.col-xs-2.logo_section.padR0 > span.block.append_bottom3.clearfix > span.pull-left.airline_info_detls > span.logo_name.append_bottomSpace6.hidden-xs.visible-stb.ng-binding.ng-scope').innerText)
  const price = await page.evaluate(() => document.querySelector('#content > div > div.container.ng-scope > div.row > div.main.col-lg-9.col-md-9.col-sm-12.col-xs-12 > div:nth-child(5) > div > div.top_first_part.clearfix > div.col-lg-2.col-md-2.col-sm-2.col-xs-4.text-right.price_sectn.make_relative.pad0 > p.price_info.RobotoRegular > span.num.ng-binding').innerText)
  console.log("The cheapest flight is of " + airline + " worth Rs. " + price + " on the given date. This flight "+ type+" "+info);
  browser.close();
})()