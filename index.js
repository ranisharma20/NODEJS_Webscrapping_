const Cheerio = require("cheerio")
const axios = require('axios');
const url = "https://www.quill.com/hanging-file-folders/cbl/4378.html"

const fetchRawHtml = async (url) => {
  const rawHtml = await axios.get(url);
  return rawHtml.data;
}


const scrapeProductNames = ($) => {
  const product_class = $(".sku-description");
  let product_names = [];
  product_class.each(function (idx, el) {
    if (idx < 10)
      product_names.push($(el).text())
  })
  return product_names
}

const scrapeProductPrice = ($) => {
  const product_price_id = $("#SkuPriceUpdate");

  let product_prices = [];
  product_price_id.each(function (idx, el) {
    if (idx < 10)
      product_prices.push($(el).text())
  })
  return product_prices;
}

const scrapeItemNumber = ($) => {

  const item_class = $(".iNumber");
  const item_numbers = [];
  item_class.each(function (idx, el) {
    if (idx < 10) {
      item_numbers.push($(el).text())
    }
  })
  return item_numbers;
}


const scrapeModelNumber = ($) => {

  const model_class = $(".model-number");
  const model_numbers = [];
  model_class.each(function (idx, el) {
    if (idx < 10) {
      model_numbers.push($(el).text())
    }
  })
  return model_numbers;
}


const scrapeDesc = ($) => {
  const desc_class = $(".skuBrowseBullets")
  const descriptions = [];
  desc_class.each(function (idx, el) {
    if (idx < 10) {
      descriptions.push({ desc: $(el).text() })
    }
  })
  return descriptions;
}

const main = async () => {
  const html = await fetchRawHtml(url);
  const $ = Cheerio.load(html);
  const product_names = scrapeProductNames($);
  const product_prices = scrapeProductPrice($);
  const item_numbser = scrapeItemNumber($);
  const model_numbers = scrapeModelNumber($);
  const descriptions = scrapeDesc($);

  console.log(descriptions)
  for (let i = 0; i < 10; i++) {
    console.log(`${i + 1} Name: ${product_names[i]} \n Price: ${product_prices[i]} \n ItemNumber: ${item_numbser[i]} \n ModelNumber: ${model_numbers[i]} \n Desc: ${descriptions[i].desc}`)
    console.log("===========================");
  }
}

main()