import { CLIENT_ID, GUILD_ID, TOKEN } from './config.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { SlashCommandBuilder } from '@discordjs/builders';

const commands =
  [
    new SlashCommandBuilder()
      .setName('weapon1')
      .setDescription('Splatoon 1 のブキルーレット')
      .addStringOption(opt => opt.setName('category').setDescription('ブキ種別 (`/category1` で取得)')),
    new SlashCommandBuilder()
      .setName('weapon2')
      .setDescription('Splatoon 2 のブキルーレット')
      .addStringOption(opt => opt.setName('category').setDescription('ブキ種別 (`/category2` で取得)')),
    new SlashCommandBuilder().setName('category1').setDescription('Splatoon 1 のブキ種別リスト'),
    new SlashCommandBuilder().setName('category2').setDescription('Splatoon 2 のブキ種別リスト')
  ].map(command => command.toJSON());

const rest = new REST({
  version: '9'
}).setToken(TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
