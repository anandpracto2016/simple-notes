let config =  {
  public_path: '/assets/',
  paths: {
    assets: {
      root: 'public'
    },
    client: {
      root: 'src',
      entry_script: 'src/client',
      main_style: 'src/stylesheets/main.scss'
    },
    output: {
      root: 'build',
      scripts: 'javascripts',
      styles: 'stylesheets'
    }
  }
};

module.exports = config;
