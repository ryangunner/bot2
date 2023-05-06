const TelegramBot = require('node-telegram-bot-api');
const Web3 = require('web3');


const bot = new TelegramBot('6030206630:AAEdsXx4s9_2gra6UhgFdHL02XZ6zNj1eDc', { polling: true });

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/02622daf652444d18a2f49d2f3ed24af'));

async function getGasPrice() {
  const gasPrice = await web3.eth.getGasPrice();
  return gasPrice;
}

bot.onText(/\/gasfee/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const gasPrice = await getGasPrice();
    const gasPriceInGwei = web3.utils.fromWei(gasPrice, 'gwei');
    bot.sendMessage(chatId, `Current gas fee: ${gasPriceInGwei} Gwei`);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'Error fetching gas fee. Please try again later.');
  }
});


bot.launch()