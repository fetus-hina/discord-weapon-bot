import WEAPON1 from './weapons/splatoon1.js';
import WEAPON2 from './weapons/splatoon2.js';
import getCategoryList from './converters/get-types.js';
import { CLIENT_ID, GUILD_ID, TOKEN } from './config.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { SlashCommandBuilder } from '@discordjs/builders';

// const categoryNames = {
//   blaster: 'blaster - ブラスター',
//   brella: 'brella - シェルター(カサ)',
//   brush: 'brush - フデ',
//   charger: 'charger - チャージャー',
//   maneuver: 'maneuver - マニューバー',
//   reelgun: 'reelgun - リールガン',
//   roller: 'roller - ローラー',
//   shooter: 'shooter - シューター(他に該当するものを除く)',
//   slosher: 'slosher - スロッシャー(バケツ)',
//   spinner: 'spinner - スピナー'
// };

const addWeaponCategoryEnum = (option, categoryList) => {
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
    ['all'].concat(categoryList).map(id => ({
      // name: categoryNames[id] ?? id,
      name: id,
      value: id
    }))
  );
  return option;
};

const commands =
  [
    new SlashCommandBuilder()
      .setName('weapon1')
      .setDescription('Splatoon 1 のブキルーレット')
      .addStringOption(
        opt => addWeaponCategoryEnum(
          opt.setName('category').setDescription('ブキ種別'),
          getCategoryList(WEAPON1)
        )
      ),
    new SlashCommandBuilder()
      .setName('weapon2')
      .setDescription('Splatoon 2 のブキルーレット')
      .addStringOption(
        opt => addWeaponCategoryEnum(
          opt.setName('category').setDescription('ブキ種別'),
          getCategoryList(WEAPON2)
        )
      ),
    new SlashCommandBuilder().setName('category1').setDescription('Splatoon 1 のブキ種別リスト'),
    new SlashCommandBuilder().setName('category2').setDescription('Splatoon 2 のブキ種別リスト')
  ].map(command => command.toJSON());

const rest = new REST({
  version: '9'
}).setToken(TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
