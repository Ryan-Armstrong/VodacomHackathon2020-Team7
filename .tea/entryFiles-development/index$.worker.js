if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


      if( navigator.userAgent && (navigator.userAgent.indexOf('LyraVM') > 0 || navigator.userAgent.indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../node_modules/mini-antui/es/badge/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-antui/es/tabs/index?hash=b998354db5b64281090d8969355b2b3db41cda49');
require('../../components/card/card?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-antui/es/tabs/tab-content/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-antui/es/modal/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/landing-page/landing-page?hash=0987146e62d7dba080cc38f6ca3a0cee70a11801');
require('../../pages/payment-summary/payment-summary?hash=0fbd6ec9fb6d35e88a902d403d5cd2e6b46e36e0');
require('../../pages/payment-selection/payment-selection?hash=9da628b04f094e34216fdae1918f0b967bcf6d7f');
require('../../pages/card-selection/card-selection?hash=9da628b04f094e34216fdae1918f0b967bcf6d7f');
require('../../pages/display-voucher/display-voucher?hash=9da628b04f094e34216fdae1918f0b967bcf6d7f');
require('../../pages/message/message?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}