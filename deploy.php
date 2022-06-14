<?php

namespace Deployer;

require 'recipe/common.php';

set('application', 'discord-weapon-bot');
set('repository', 'git@github.com:shimiclean/discord-weapon-bot.git');
set('git_tty', true); 
set('shared_files', []);
set('shared_dirs', []);
set('writable_dirs', []);
set('writable_mode', 'chmod');
set('writable_chmod_recursive', false);

host('ayanami2')
    ->user('discord-bot')
    ->stage('production')
    ->roles('app')
    ->set('deploy_path', '~/{{application}}.dep');

task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:git_config',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:vendors',
    'deploy:writable',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:restart_service',
    'deploy:unlock',
    'cleanup',
    'success'
])->desc('Deploy the project');

after('deploy:failed', 'deploy:unlock');

task('deploy:git_config', function () {
    run('git config --global advice.detachedHead false');
});

task('deploy:shared', function () {
    within('{{release_path}}', function () {
        run('cp {{deploy_path}}/shared/config.js config.js');
    });
});

task('deploy:vendors', function () {
    within('{{release_path}}', function () {
        run('npm clean-install');
    });
});

task('deploy:restart_service', function () {
    run('sudo /usr/local/sbin/restart-discord-weapon-bot');
});

