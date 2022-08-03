import WEAPONS1 from './weapons/splatoon1.js';
import WEAPONS2 from './weapons/splatoon2.js';
import choiceWeapon from './roulette/choice-weapon.js';
import formatWeapon from './formatters/weapon.js';
import { Client, GatewayIntentBits } from 'discord.js';
import { GUILD_ID, TOKEN } from './config.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
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
    case 'weapon1':
      {
        const weapon = choiceWeapon(
          WEAPONS1,
          interaction.options.getString('category'),
          interaction.options.getString('subweapon'),
          interaction.options.getString('special')
        );
        if (weapon) {
          console.log(`${user?.username}: ${weapon.id}`);
        } else {
          console.log(`${user?.username}: No weapon candidates`);
        }

        await interaction.reply({
          ephemeral: true,
          content: formatWeapon(weapon, emojis)
        });
      }
      break;

    case 'weapon2':
      {
        const weapon = choiceWeapon(
          WEAPONS2,
          interaction.options.getString('category'),
          interaction.options.getString('subweapon'),
          interaction.options.getString('special')
        );
        if (weapon) {
          console.log(`${user?.username}: ${weapon.id}`);
        } else {
          console.log(`${user?.username}: No weapon candidates`);
        }

        await interaction.reply({
          ephemeral: true,
          content: formatWeapon(weapon, emojis)
        });
      }
      break;
  }
});

client.login(TOKEN);
