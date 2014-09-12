Friendship Bench Tablet Application
==========================
The Friendship Bench project is intended to support an on-the-ground research project and intervention by providing care providers and researchers with the ability to manage enrolled patients, collect data about the intervention, and periodically assess patients for research outcome data.

Friendship App is an HTML5 Cordova Android tablet application that works in conjunction with [Friendship Dash](https://github.com/cbitstech/friendship_dash).

## Technology Stack
- Ionic
  - [Ionic Tutorials](http://ionicframework.com/tutorials/)
  - AngularJS (1.2.10)
  - NodeJS (0.10.28)
  - Codorva (3.5.0)
    - Android SDK (23.0.1)
    - Ant (1.9.3)
  
## App Install
For OSX, use [Homebrew](http://brew.sh/) for package management. Use git for version control.
AngularJS requires node.js and the bower package manager.
### Install git:
`brew install git`
### Install node.js:
`brew install node`
### Install bower:
`sudo npm install -g bower`
### Install JSHint (for linting)
`sudo npm install -g jshint`
### Install the Android SDK:
`brew install android-sdk`

`android`

`[Click] 'Install Packages' <accept licenses>`

### Install Ant in order to use the Android emulator:
`brew install ant`
### Fetch repo and serve in local browser
`$ git clone git@github.com:cbitstech/friendship_app.git (if ssh)`

`$ cd friendship_app`

`$ ionic serve`
### To emulate Adroid Make sure all dependencies have been installed.

- [haxm link for intel hardware acceleration for mac](https://confluence.nubic.northwestern.edu/download/attachments/1802317/haxm-macosx_r04.zip?version=1&modificationDate=1404249630272&api=v2)
- The Intel accelerator is found in the Extras folder of SDK
- Run `android avd`
- Go to 'Device Definitions'
- Select type of android device to add to Virtual Devices list
- Check 'use host gpu'

### Emulate
`$ ionic platform add android`

`$ ionic emulate android`

### Further References
[hax emulator configuration](http://www.javaexperience.com/hax-is-not-working-and-emulator-runs-in-emulation-mode/#ixzz2p3inMj34)

[android emulation tutorial](http://panopticdev.com/blog2014/phonegap-mac-osx-setup-configuration-android-ios#createanandroiddevice)
