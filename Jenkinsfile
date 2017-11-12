parameters {
  string(name: "ARTIFACT_NAME", defaultValue: "NONE", description: "Docker Tag for Deployment"),
  choice(name: "APP_ENVIRONMENT", choices: "NONE\nSTAGE\nPRODUCTION\nUAT")
}

node('linux') {

  def BUILD_BOX = "scardon/ruby-node-alpine"
  def CONF = [:]
  CONF.APP_NAME = "api-server-template"

  docker.inside(BUILD_BOX) {
    stage('Prepare') {
      sh ""
    }

    stage('CI') {
      sh "rake ci"
    }

    stage('Docker:Build') {
      sh "rake build_container[${APP},]"
    }

    stage('Docker:Push') {

    }
  }



  stage('Nomad:Deploy') {

  }


}
