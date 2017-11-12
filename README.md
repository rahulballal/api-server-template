# API Server Template

A template project for Node.js HTTP API

## Key Features :sparkles:

1. Uses latest LTS node.js (v8.9.x)
2. Builds a lightweight (Node Alpine) Docker container following best practices.
3. Uses [node-config](https://github.com/lorenwest/node-config) for easy config management.
4. A functional Jenkinsfile for CI/CD, setup to be configured with Nomad/Kubernetes container orchestration.
5. Super fast [pino.js](http://getpino.io/#/) logger
6. Follow these simple [steps](./docs/Steps.md) to use this template.

## Description

## Web Framework

### [Fastify](https://fastify.io)

- A fast lightweight Node.js framework for building http apis
- Out of box schema support
- Strong plugin architecture

## Testing

### Philosophy

- All unit and integration tests are colocated with the system under test.

_For example `my-module.js` will be colocated with `my-module.spec.js` file._

- All Http/Functional tests are located in the [e2e](./e2e) directory

### [ESLint](https://eslint.org)

- Along with popular airbnb config, helps the code lint free!

### [Mocha](https://mochajs.org)

- De-facto testing framework for node.js
- All configuration has been stored in the [mocha](./mocha) directory.

### [Chai](https://chaijs.com)

- De-facto assertion framework for node.js

### [Sinon](https://sinonjs.org)

- De-facto mocking framework for node.js

### [Supertest](https://github.com/visionmedia/supertest)

- A feature complete Http API and connect based applications

### [nyc Code Coverage](https://istanbul.js.org/)

- De-facto javascript code coverage tool.

## CI/CD

### CloudFormation to create cloud resources

- All cloudformation stacks are located at [infra](./infra) directory

  - [prod-cf.yml](./infra/prod-cf.yml) for PRODUCTION
  - [stage-cf.yml](./infra/stage-cf.yml) for STAGE

### [npm-run-all](https://www.npmjs.com/package/npm-run-all)

- Simple node module to run npm script in sequence or parallel

### [Rakefile](https://ruby.github.io/rake/)

#### Why not just use npm scripts or Grunt or Gulp?

We want to ensure that we are able to run scripts after devDependencies have been pruned for the project. One way is to manipulate how and when devDependencies are installed or keep the logic simple. All the CI/CD orchestration is baked into
the Rakefile.

#### Why not bake all CI CD logic in the Jenkinsfile?

From my experience baking deployment/build logic in Jenkinsfile/Groovy is extremely painful.
Rakefile is a modern version of a task system much like Make. It is an extremely flexible and testable task system.
Having a file like this helps the repository portable with any kind of CI/CD tool. Jenkins has been configured in this case.

*NOTE: The CI/CD runtime must include node.js , Ruby and Rake. This is only required at build time*

### [Jenkins](https://jenkins.io) with Scripted Pipelines

#### When a commit happens on master branch

- Run ci
- Build Docker container
- Publish Docker container
- Publish Nomad Job to default environment (eg: STAGE)

#### When a commit happens on a hotfix branch

- Run ci
- Build Docker container
- Publish Docker container
- Publish Nomad Job to PRODUCTION environment

#### Deploying to an environment using Docker Artifact

- Go to Jenkins
- Navigate to the Job
- Build with Parmeters
- Fill out the form

  - Provide the ARTIFACT_NAME e.g. `api-server-template:latest`
  - Pick an environment to deploy
  - Click Build

## Container Scheduler / Orchestrator

It is extremely common these days to to use a Container orchestration and scheduling system like :

- [Nomad](https://www.nomadproject.io/)
- [Kubernetes](https://kubernetes.io/)

Because a system like this is considered infrastructure related:

- [infra/nomad-settings.json](./infra/nomad-settings.json)
- [infra/nomad-deployment.groovy](./infra/nomad-deployment.groovy)

Both these files are consumed in the [Jenkinsfile](./Jenkinsfile).
