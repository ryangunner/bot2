const TelegramBot = require('node-telegram-bot-api');
const { ethers } = require('ethers');

// replace <YOUR_TELEGRAM_BOT_TOKEN> with your actual bot token
const bot = new TelegramBot('6030206630:AAEdsXx4s9_2gra6UhgFdHL02XZ6zNj1eDc', { polling: true });

// create an Ethers.js provider using the Infura API
const provider = new ethers.providers.InfuraProvider('mainnet', '02622daf652444d18a2f49d2f3ed24af');

// gasPriceLevel maps a gas price level to the corresponding priority fee
const gasPriceLevel = {
  low: 'standard',
  average: 'fast',
  high: 'fastest'
};

bot.onText(/\/gasfee/, async (msg) => {
  try {
    // fetch the current gas prices for low, average, and high priority fees
    const gasPrices = await Promise.all([
      provider.getGasPrice(),
      provider.getFeeData(gasPriceLevel.average),
      provider.getFeeData(gasPriceLevel.high),
    ]);

    // format the gas prices as Gwei
    const formattedGasPrices = gasPrices.map((price) => ethers.utils.formatUnits(price, 'gwei'));

    // generate the reply message with the formatted gas prices
    const replyText = `Current Ethereum gas prices:\n\nLow: ${formattedGasPrices[0]} Gwei\nAverage: ${formattedGasPrices[1]} Gwei\nHigh: ${formattedGasPrices[2]} Gwei`;

    // send the reply message to the user
    bot.sendMessage(msg.chat.id, replyText);
  } catch (error) {
    console.error(error);
    bot.sendMessage(msg.chat.id, 'Sorry, an error occurred while fetching gas prices.');
  }
});
