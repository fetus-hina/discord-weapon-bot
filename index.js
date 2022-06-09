import WEAPONS1 from './weapons/splatoon1.js';
import WEAPONS2 from './weapons/splatoon2.js';
import choiceWeapon from './roulette/choice-weapon.js';
import formatCategoryList from './formatters/category-list.js';
import formatWeapon from './formatters/weapon.js';
import { Client, Intents } from 'discord.js';
import { TOKEN } from './config.js';

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS
  ]
});

client.once('ready', () => {
  console.log('The bot ready.');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) {
    return;
  }

  const { commandName } = interaction;

  switch (commandName) {
    case 'category1':
      await interaction.reply({
        ephemeral: true,
        content: formatCategoryList(Object.keys(WEAPONS1))
      });
      break;

    case 'category2':
      await interaction.reply({
        ephemeral: true,
        content: formatCategoryList(Object.keys(WEAPONS2))
      });
      break;

    case 'weapon1':
      await interaction.reply({
        ephemeral: true,
        content: formatWeapon(
          choiceWeapon(
            WEAPONS1,
            interaction.options.getString('category')
          )
        )
      });
      break;

    case 'weapon2':
      await interaction.reply({
        ephemeral: true,
        content: formatWeapon(
          choiceWeapon(
            WEAPONS2,
            interaction.options.getString('category')
          )
        )
      });
      break;
  }
});

client.login(TOKEN);
