const TelegramBot = require('node-telegram-bot-api');
const Web3 = require('web3');


const bot = new TelegramBot('<6030206630:AAEdsXx4s9_2gra6UhgFdHL02XZ6zNj1eDc>', { polling: true });


const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/<02622daf652444d18a2f49d2f3ed24af>'));

bot.onText(/\/gasfee/, async (msg) => {
  try {
    const [low, medium, high] = await Promise.all([
      web3.eth.getGasPrice(),
      web3.eth.getGasPrice('average'),
      web3.eth.getGasPrice('fast'),
    ]);

    const replyText = `Current Ethereum gas prices:\n\nLow: ${web3.utils.fromWei(low, 'gwei')} Gwei\nAverage: ${web3.utils.fromWei(medium, 'gwei')} Gwei\nHigh: ${web3.utils.fromWei(high, 'gwei')} Gwei`;

    bot.sendMessage(msg.chat.id, replyText);
  } catch (error) {
    console.error(error);
    bot.sendMessage(msg.chat.id, 'Sorry, an error occurred while fetching gas prices.');
  }
});
