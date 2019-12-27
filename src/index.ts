import os from 'os';
import path from 'path';
import { existsSync, readdirSync } from 'fs';
import { spawn } from 'child_process';
import inquirer from 'inquirer';

const noop = () => {};

const getRootDirPath = (): string => {
  const _dirName = '.' + require('../package.json').name;
  return path.resolve(os.homedir(), _dirName);
};

const getDataPathsByName = (name: string): [string, string] => {
  const _rootPath = getRootDirPath();
  const _nameDirPath = path.join(_rootPath, name);
  const extensionsDir = path.join(_nameDirPath, 'extensions');
  const userDataDir = path.join(_nameDirPath, 'user-data');
  return [extensionsDir, userDataDir];
};

const getExecutable = (): string[] => {
  switch (process.platform) {
    case 'win32':
      return [
        os.homedir() + '/AppData/Local/Programs',
        'c:/Program Files',
        'c:/Program Files (x86)'
      ].map(dir => path.join(dir, 'Microsoft VS Code', 'Code.exe'));
    case 'darwin':
      return [
        path.join(
          '/Applications',
          'Visual Studio Code.app',
          'Contents',
          'MacOS',
          'Electron'
        )
      ];
    case 'linux':
      return ['/usr/share/code'];
    default:
      throw new Error('Not supported platform!');
  }
};

export const startRun = (name: string) => {
  console.log('Use config: ', name);
  const [extensionsDir, userDataDir] = getDataPathsByName(name);

  const possibleExecutablePaths = getExecutable();

  let executable: string = '';

  try {
    const _executable = possibleExecutablePaths.find(file => existsSync(file));
    _executable && (executable = _executable);
  } catch (e) {}

  if (!executable) {
    throw new Error(`Can't get executable for VS Code!`);
  }

  console.log('Executable: ', executable);

  const sp = spawn(
    `${executable}`,
    [`--extensions-dir=${extensionsDir}`, `--user-data-dir=${userDataDir}`],
    {
      detached: true,
      stdio: 'ignore'
    }
  );
  sp.unref();
};

export const startInteractiveRun = async () => {
  let configs: { name: string }[];

  try {
    const dirents = readdirSync(getRootDirPath(), { withFileTypes: true });
    configs = dirents
      .filter(_dirent => _dirent.isDirectory())
      .map(_dirent => ({ name: _dirent.name }));
  } catch (e) {
    configs = [];
  }

  if (configs.length < 1) {
    configs.push({ name: 'default' });
  }

  const { name } = await inquirer.prompt<{ name: string }>({
    name: 'name',
    message: 'Select the config you want to use',
    type: 'list',
    choices: configs
  });

  startRun(name);
};
