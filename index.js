import WEAPONS1 from './weapons/splatoon1.js';
import WEAPONS2 from './weapons/splatoon2.js';
import choiceWeapon from './roulette/choice-weapon.js';
import formatCategoryList from './formatters/category-list.js';
import formatWeapon from './formatters/weapon.js';
import getTypes from './converters/get-types.js';
import { Client, Intents } from 'discord.js';
import { GUILD_ID, TOKEN } from './config.js';

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS
  ]
});
const emojis = {};

client.once('ready', () => {
  console.log('The bot ready, fetching emojis');

  client.guilds.fetch(GUILD_ID)
    .then(guild => guild.emojis.fetch())
    .then(list => list.each(emoji => {
      if (emoji.animated === false) {
        emojis[emoji.name] = emoji;
      }
    }))
    .then(() => console.log(`Emoji fetched, size=${Object.keys(emojis).length}`))
    // .then(() => console.log(emojis.wakaba?.toString()))
    .catch(console.error);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) {
    return;
  }

  const { commandName, user } = interaction;
  console.log(`Request /${commandName} from ${user?.username}`);

  switch (commandName) {
    case 'category1':
      await interaction.reply({
        ephemeral: true,
        content: formatCategoryList(getTypes(WEAPONS1))
      });
      break;

    case 'category2':
      await interaction.reply({
        ephemeral: true,
        content: formatCategoryList(getTypes(WEAPONS2))
      });
      break;

    case 'weapon1':
      await interaction.reply({
        ephemeral: true,
        content: formatWeapon(
          choiceWeapon(
            WEAPONS1,
            interaction.options.getString('category')
          ),
          emojis
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
          ),
          emojis
        )
      });
      break;
  }
});

client.login(TOKEN);
