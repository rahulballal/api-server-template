desc "Default Task"
task :default do
  puts "No Default Task specified"
end

desc "Build Docker Container"
task :build_container,[:app, :tag] do |t, args|
  args.with_defaults(:app => "test", :tag => "latest")
  sh "docker build -t #{args.app}:#{args.tag} ."
end

desc "Publish Container"
task :publish_container, [:user, :pass, :registry, :tag] do |t, args|
  sh "docker login -u #{args.user} -p #{args.pass} #{args.registry}"
  sh "docker push #{args.registry}/#{args.tag}:latest"
end

desc "Run CI"
task :ci do
  sh "npm run ci"
end

desc "Cleanup workspace"
task :clean_workspace do
  FileUtils.rm_rf(".nyc_output")
  FileUtils.rm_rf("coverage")
  FileUtils.rm_rf("node_modules")
end
