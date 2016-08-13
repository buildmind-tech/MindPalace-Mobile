angular.module('starter.controllers', [])

.controller('TabCtrl', function($scope,$ionicModal,$base,$id,$http) {


  $ionicModal.fromTemplateUrl('templates/add-weibo-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.add = function(){
    $scope.modal.show();
  }

  $scope.confirm = function(_text){
    console.log(_text);
    $http.post($base+"new-post",{
      user_id:$id,
      text:_text
    }).success(function(){
      $scope.modal.hide();
      $scope.$broadcast("$new.post")
    })
  }
  $scope.close = function(){
    $scope.modal.hide()
  }


})

.controller('DashCtrl', function($scope) {})
.controller('PersonalPageCtrl', function($scope,$stateParams,$http,$base) {
  $scope.refresh= function(){
    $http.get($base+"get-all-post/"+$stateParams.id).success(function(data,code){
      $scope.posts = data;
    }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  }

  $http.get($base+"personal-stat/"+$stateParams.id).success(function(data){
    console.log(data);
    $scope.stat = data;
  })

  $scope.$on("$ionicView.enter",function(){
    $scope.refresh();
  })
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
 
})

.constant('$id', "f6f45cb4-8e45-4a8d-9706-320858316003")
.constant('$base',"http://localhost:5555/")

.controller("MainCtrl",function($scope,$http,$id,$base){
  $scope.users = [];

  var id = $id;
  $scope.my_id = $id;

  // $http.get($base+"get-following/"+id).success(function(data,code){
  //   $scope.followings = data;
  // })

  // $http.get($base+"get-follower/"+id).success(function(data,code){
  //   console.log(data);
  //   $scope.followers = data;
  // })

  

  $scope.refresh= function(){
    $http.get($base+"get-dashboard-post/"+id).success(function(data,code){
      $scope.posts = data;
    }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  }

  $scope.deletePost=function(id){
    console.log(id);
    $http.post($base+"fuckyou-delete-post",{
      post_id:id
    }).success(function(){
      $scope.refresh();
    })
  }

  $scope.refresh();
  $scope.$on("$new.post",function(){
    $scope.refresh();
  })
  

  // $scope.post = function() {
  //   $http.post("http://localhost:5555/test-post",{
  //     hi:"tani",
  //     who_is_stupid:"yummy"
  //   })
  // }

  // $http.post("http://localhost:5555/",{}).success(function(){
  //   console.log("success");
  // }).error(function(err,code){
  //   console.log("error")
  // })

  

})
.controller("FFCtrl",function($base,$scope,$http,$id,$stateParams){

  var id = $stateParams.id;

  $http.get($base+"personal-stat/"+id).success(function(data){
    console.log(data);
    $scope.stat = data;
  })

  $http.get($base+"get-following/"+id).success(function(data,code){
    $scope.followings = data;
  })
})

.controller("PostDetailCtrl",function($base,$scope,$http,$id,$stateParams){

  var id = $stateParams.id;

  $scope.refresh= function(){
    $http.get($base+"get-post-detail/"+id).success(function(data){
    console.log(data);
    $scope.posting = data[0];
  }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  }

  $scope.refresh()

})

.controller("DetailCtrl",function($base,$scope,$http,$id,$stateParams){

  var id =$id;
  var fid = $stateParams.fxxk;

  $scope.getCommon = function(fid){
    console.log("getting");
    $http.get($base+"get-common-following/" + fid + `/`+id).success(function(data){
      //console.log(data);
      $scope.commons = data; 
    })
    $http.get($base+"get-common-follower/" + fid + `/`+id).success(function(data){
      //console.log(data);
      $scope.commonfans = data;
      
    })
  }

  $http.get($base+"following-stat/"+fid).success(function(data){
    console.log(data);
    $scope.stat = data;
  })

  $http.get($base+"get-user-detail/"+fid).success(function(data){
    console.log(data);
    $scope.user = data;
  })

  $scope.getCommon(fid);
})

.filter("from_now",function(){
  return function(input){
    var from_now = moment(input).fromNow();
    return from_now;
  }
})


