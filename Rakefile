# Helper functions
default_tag =  "latest"
default_app_name = "test"

def should_abort_pipeline
  message = `git log -1 --oneline --pretty=format:%s`
  return message.include? "[NOBUILD]"
end

def should_build_container
  branch = `git rev-parse --abbrev-ref HEAD`
  return branch == "master" || branch.starts_with?("hotfix")
end

def should_run_pipeline
  branch = `git rev-parse --abbrev-ref HEAD`
  return branch == "master"
end

# Tasks

desc "Default Task"
task :default do
  puts "No Default Task specified"
end

desc "Build Docker Container"
task :build_container do

  if should_build_container and not should_abort_pipeline
    tag = ENV['TAG'] || default_tag
    app = ENV['APP_NAME'] || default_app_name

    sh "docker build -t #{app}:#{tag} ."
  else
    puts "Skipping Docker Container Build"
  end


end

desc "Publish Container"
task :publish_container do

  if should_build_container and not should_abort_pipeline

    user = ENV['DKR_USER']
    pass = ENV['DKR_PASS']
    registry = ENV['DKR_REGISTRY']
    tag = ENV['TAG'] || default_tag
    app = ENV['APP_NAME'] || default_app_name

    sh "docker login -u #{user} -p #{pass} #{registry}"
    sh "docker push #{registry}/#{app}:#{tag}"

  else

    puts "Skipping Docker Container Push"

  end


end

desc "Run CI"
task :ci do
  if should_abort_pipeline
    puts 'Skipping CI stage'
  else
    sh "npm run ci"
  end

end

desc "Cleanup workspace"
task :clean_workspace do
  FileUtils.rm_rf(".nyc_output")
  FileUtils.rm_rf("coverage")
  FileUtils.rm_rf("node_modules")
end

desc "Prepare for running pipeline"
task :prepare do

  sh "git config user.email jenkins@jenkins.com.au"
  sh "git config user.name jenkins-ci"

  user = ENV['GIT_USER']
  pass = ENV['GIT_PASS']
  tag = ENV['TAG'] || default_tag

  new_git_url = "https://#{user}:#{pass}@github.com/api-server-template.git"
  sh "git remote add origin2 #{new_git_url}"
end

desc "Create and push git tag"
task :make_tag do
  tag = ENV['TAG'] || default_tag
  sh "git tag -a #{tag}"
  sh "git push origin2 #{tag}"
end
