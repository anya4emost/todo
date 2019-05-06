const yargs = require('yargs');
const compServer = require('./commands/compileServer');
const startServer = require('./commands/startServer');
const compileFront = require('./commands/compileFront');

const commonEnv = {
  PORT: 3000,
  API_ORIGIN: 'https://api.hrexport.com',
  API_AUTH_ORIGIN: 'https://apittm.beapps.ru',
  MOCK_USER: false,
  USE_MOCKS: false,
  FACEBOOK_ID: 262915454599121,
  VK_ID: 6851247,
  VK_REDIRECT_URI: 'http://localhost:3000',
  VK_CLIENT_SECRET: 'Ly6PhMewZ9B96toHwQOR',
  GOOGLE_ID: '332807059647-qbbrei188q5uir6ttt9tlqn34j6pgate.apps.googleusercontent.com',
  GOOGLE_SECRET: 'aaaK0-Tgqsyrn95om9w3KZV_',
  LINKEDIN_ID: '77g5c33uiigjl6',
  LINKEDIN_REDIRECT_URI: 'http://localhost:3000',
  LINKEDIN_SECRET: 'w0jsGLIzqAZo4Z7X',
};

const dev = () => {

  const devEnv = {
    ...commonEnv,

    /** Для всех proxy api **/
    USE_MOCKS: true,

    /** Если аутентификация не работает **/
    MOCK_USER: false,
  };

  compileServer();
  startServer(devEnv);
};

const startProd = (type) => {

  console.log('PROD TYPE', type);

  const env = {
    NODE_ENV: 'production',
    ...commonEnv,
    FACEBOOK_ID: 2106697632886053,
    LINKEDIN_ID: '77w1jqqfi127i0',
    LINKEDIN_REDIRECT_URI: 'https://hrexport.com',
    LINKEDIN_SECRET: 'g6Sa3ameCxfdX8Vy',
    VK_ID: '6860132',
    VK_CLIENT_SECRET: 'bYBHyouJsTO8vVXohvow',
    VK_REDIRECT_URI: 'https://hrexport.com',
    GOOGLE_ID: '64360690418-f36uh2pfo2kao0l7m2spidpd4gsn7039.apps.googleusercontent.com',
    GOOGLE_SECRET: 'zXsn6Jv5FOaBVPxvI8MXyDGv',
  };

  startServer(env);
};

const compileServer = () => {
  console.log('START COMPILE SERVER');
  compServer();
  console.log('END COMPILE SERVER');
};

const compileFrontend = () => {
  console.log('START COMPILE FRONTEND');
  compileFront();
  console.log('END COMPILE FRONTEND');
};

const compileForProd = () => {
  compileServer();
  compileFrontend();
};

yargs
  .command({
    command: 'development',
    desc: 'запускает билд и сервер с настройками для локальной разработки',
    handler: dev,
  })
  .command({
    command: 'staging',
    desc: 'запускает сервер с настройками для staging',
    handler: () => startProd('staging'),
  })
  .command({
    command: 'production',
    desc: 'запускает сервер с настройками для production',
    handler: () => startProd('production'),
  })
  .command({
    command: 'compileServer',
    desc: 'запускает билд сервера',
    handler: compileServer,
  })
  .command({
    command: 'compileFront',
    desc: 'запускаем билд фронта',
    handler: compileFrontend,
  })
  .command({
    command: 'compileForProd',
    desc: 'запускаем билд для прода',
    handler: compileForProd,
  })
  .argv;




