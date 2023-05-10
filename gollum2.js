


const axios = require('axios');
const { Telegraf } = require('telegraf');

const apikey = 'iD1k03X9U5cXsZkq6P684o7BHvvO8OOE'; 
const gasPriceUrl = `https://ethgasstationapi.com/api/v1/ethgasAPI.json?api-key=${apikey}`;

const bot = new TelegramBot(process.env.TELEGRAM_BOT_KEY, { polling: true });


bot.command('gasfee', async (ctx) => {
  try {
    const response = await axios.get(gasPriceUrl);
    const data = response.data;
    const gasPrices = {
      low: data.safeLow / 10,
      average: data.average / 10,
      high: data.fast / 10,
    };
    const message = `Current Ethereum gas prices:\nLow: ${gasPrices.low} Gwei\nAverage: ${gasPrices.average} Gwei\nHigh: ${gasPrices.high} Gwei`;
    ctx.reply(message);
  } catch (error) {
    console.error(error);
    ctx.reply('Sorry, an error occurred while retrieving gas prices.');
  }
});

bot.launch();
