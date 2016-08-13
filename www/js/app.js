// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
moment.locale("zh-cn");

angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.services',
  'mindpalace.post'
  ])

.run(function($ionicPlatform,$ionicHistory,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on("$stateChangeStart", function(ev, toState) {
    if (toState.name.indexOf("tab") != -1) {
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true,
            historyRoot: true,
        });
    }
  })
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller:"TabCtrl"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab': {
        templateUrl: 'templates/main.html',
        controller:'MainCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  // 子state全部独立，用“@“，也不要再前面加"tabs."
    .state('chat-detail', {
      url: '/chats/:chatId',
      views: {
        '@': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })


    .state('followandfans', {
        url: '/follow-and-fans/:id',
        templateUrl: "templates/followandfans.html",
        controller: "FFCtrl",
    })

    .state('detail', {
        url: '/detail/:fxxk',
        templateUrl: "templates/detail.html",
        controller: "DetailCtrl",
    })

    .state('personal-page', {
        url: '/personal-page/:id',
        templateUrl: "templates/personal-page.html",
        controller: "PersonalPageCtrl",
    })

    .state('post-detail', {
        url: '/post-detail/:id',
        templateUrl: "templates/post-detail.html",
        controller: "PostDetailCtrl",
    })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});



