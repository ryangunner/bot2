const TelegramBot = require('node-telegram-bot-api');
const { ethers } = require('ethers');


const bot = new TelegramBot(process.env.TELEGRAM_BOT_KEY, { polling: true });


const provider = new ethers.InfuraProvider('mainnet', process.env.INFURA_KEY);


const gasPriceLevel = {
  low: 'standard',
  average: 'fast',
  high: 'fastest'
};

bot.onText(/\/gasfee/, async (msg) => {
  try {
   
    const gasPrices = await Promise.all([
      provider.getGasPrice(),
      provider.getFeeData(gasPriceLevel.average),
      provider.getFeeData(gasPriceLevel.high),
    ]);

    
    const formattedGasPrices = gasPrices.map((price) => ethers.utils.formatUnits(price, 'gwei'));

  
    const replyText = `Current Ethereum gas prices:\n\nLow: ${formattedGasPrices[0]} Gwei\nAverage: ${formattedGasPrices[1]} Gwei\nHigh: ${formattedGasPrices[2]} Gwei`;

  
    bot.sendMessage(msg.chat.id, replyText);
  } catch (error) {
    console.error(error);
    bot.sendMessage(msg.chat.id, 'Sorry, an error occurred while fetching gas prices.');
  }
});
