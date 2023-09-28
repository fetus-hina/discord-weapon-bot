<?php

declare(strict_types=1);

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
set('github_keys', ['github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl']);

host('ayanami3')
    ->hostname('2403:3a00:202:1127:49:212:205:127')
    ->user('discord-bot')
    ->stage('production')
    ->roles('app')
    ->set('deploy_path', '~/{{application}}.dep');

task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:ssh_config',
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

task('deploy:ssh_config', function () {
    run(sprintf('mkdir -p --mode=%s %s', '700', '~/.ssh'));
    run('touch ~/.ssh/known_hosts');
    run('chmod 600 ~/.ssh/known_hosts');
    run(sprintf('ssh-keygen -R %s', escapeshellarg('github.com')));
    foreach (get('github_keys') as $line) {
        run(
            vsprintf('echo %s >> ~/.ssh/known_hosts', [
                escapeshellarg($line),
            ]),
        );
    }
    run('ssh-keygen -H');
    run('rm -f ~/.ssh/known_hosts.old');
});

task('deploy:git_config', function () {
    run('git config --global advice.detachedHead false');
    run(
        vsprintf('git config --global core.sshCommand %s', [
            escapeshellarg(
                'ssh -o HostKeyAlgorithms=ssh-ed25519 -o KexAlgorithms=curve25519-sha256,curve25519-sha256@libssh.org',
            ),
        ]),
    );
});

task('deploy:shared', function () {
    within('{{release_path}}', function () {
        run('cp {{deploy_path}}/shared/config.js config.js');
    });
});

task('deploy:vendors', function () {
    within('{{release_path}}', function () {
        run('npm clean-install');
        run('npm prune --production');
    });
});

task('deploy:restart_service', function () {
    run('sudo /usr/local/sbin/restart-discord-weapon-bot');
});
