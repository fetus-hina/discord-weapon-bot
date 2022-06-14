import WEAPON1 from './weapons/splatoon1.js';
import WEAPON2 from './weapons/splatoon2.js';
import getCategoryList from './converters/get-types.js';
import getSpecialList from './converters/get-specials.js';
import getSubWeaponList from './converters/get-subweapons.js';
import { CLIENT_ID, GUILD_ID, TOKEN } from './config.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { SlashCommandBuilder } from '@discordjs/builders';

function decorateStringOptionsEnum (option, idList) {
  // addChoices は次のように:
  //    option.addChoices(
  //      { name: 'Funny', value: 'gif_funny' },
  //      { name: 'Meme', value: 'gif_meme' },
  //      { name: 'Movie', value: 'gif_movie' },
  //    ));
  // 配列ではなく、引数にオブジェクトを連ねて渡す必要があるので
  // function.apply を使って頑張る必要がある

  option.addChoices.apply(
    option,
    // 特別な値 "all" を先頭に追加する
    ['all'].concat(idList).map(id => ({
      name: id,
      value: id
    }))
  );
  return option;
}

const commands =
  [
    new SlashCommandBuilder()
      .setName('weapon1')
      .setDescription('Splatoon 1 のブキルーレット')
      .addStringOption(
        opt => decorateStringOptionsEnum(
          opt.setName('category').setDescription('ブキ種別'),
          getCategoryList(WEAPON1)
        )
      )
      .addStringOption(
        opt => decorateStringOptionsEnum(
          opt.setName('subweapon').setDescription('サブウェポン'),
          getSubWeaponList(WEAPON1)
        )
      )
      .addStringOption(
        opt => decorateStringOptionsEnum(
          opt.setName('special').setDescription('スペシャルウェポン'),
          getSpecialList(WEAPON1)
        )
      ),
    new SlashCommandBuilder()
      .setName('weapon2')
      .setDescription('Splatoon 2 のブキルーレット')
      .addStringOption(
        opt => decorateStringOptionsEnum(
          opt.setName('category').setDescription('ブキ種別'),
          getCategoryList(WEAPON2)
        )
      )
      .addStringOption(
        opt => decorateStringOptionsEnum(
          opt.setName('subweapon').setDescription('サブウェポン'),
          getSubWeaponList(WEAPON2)
        )
      )
      .addStringOption(
        opt => decorateStringOptionsEnum(
          opt.setName('special').setDescription('スペシャルウェポン'),
          getSpecialList(WEAPON2)
        )
      )
  ].map(command => command.toJSON());

const rest = new REST({
  version: '9'
}).setToken(TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
