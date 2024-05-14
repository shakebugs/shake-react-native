require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-shake"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  Bug reporting SDK for React Native apps
                   DESC
  s.homepage     = "https://www.shakebugs.com"
  # brief license entry:
  s.license      = "MIT"
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "Shakebugs" => "friends@shakebugs.com" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/shakebugs/shake-react-native", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true

  s.dependency "React"
  s.dependency "#{ENV['IOS_DEPENDENCY']}", "~> 17.0.0-rc"
  # ...
  # s.dependency "..."
end

