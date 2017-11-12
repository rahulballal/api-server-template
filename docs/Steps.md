# Follow these steps to make this template your own

## Git

[] After cloning this repo, blow away the .git folder

## NPM

1. Modify the [package.json](../package.json) to make it your project.

## Application Configuration

1. The setup *only* assumes `NODE_ENV=development|production|test` environments.
2. Modify the appropriate config file so that correct config is injected in the app.
3. Use environment variable `APP_ENV` to identify configuration for application environments
like staging, uat etc.

## Jenkins

1. Modify the `CONF` variable in the Jenkinsfile to consist of values you would like
2. Modify the parameter to accommodate your application environments as targets.

## CloudFormation

1. Modify [production stack](../infra/prod-cf.yml) and [stage stack](../infra/prod-cf.yml)  to suit your project needs
