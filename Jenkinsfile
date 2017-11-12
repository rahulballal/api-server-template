parameters {
  string(name: "ARTIFACT_NAME", defaultValue: "NONE", description: "Docker Tag for Deployment"),
  choice(name: "APP_ENVIRONMENT", choices: "NONE\nSTAGE\nPRODUCTION\nUAT")
}

node('linux') {

  checkout scm

  def BUILD_BOX = "scardon/ruby-node-alpine"
  def CONF = [
    APP_NAME: "api-server-template",
    BUILD: "${repo.buildnumber}",
    BRANCH: "${env.BRANCH_NAME}",
    TAG: "${env.BRANCH_NAME}-${repo.buildnumber}"
  ]

  docker.inside(BUILD_BOX) {
    stage('Prepare') {
      sh "rake prepare GIT_USER=${env.GIT_USER} GIT_PASS=${env.GIT_PASS} TAG=${CONF.TAG}"
    }

    stage('CI') {
      sh "rake ci"
    }

    stage('Docker:Build') {
      sh "rake build_container[${CONF.APP_NAME},${CONF.TAG}]"
    }

    stage('Docker:Push') {
      sh "rake publish_container DKR_REGISTRY=${CONF.DKR_REGISTRY} DKR_USER=${CONF.DKR_USER} DKR_PASS=${CONF.DKR_PASS} TAG=${CONF.TAG} APP_NAME=${CONF.APP_NAME}"
    }

    stage('Git:Tag') {
      sh "rake make_tag TAG=${CONF.TAG}"
    }
  }



  stage('Nomad:Deploy') {

  }


}
