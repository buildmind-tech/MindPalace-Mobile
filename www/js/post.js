/**
* mindpalace.post Module
*
* Description
*/
angular.module('mindpalace.post', [])

.directive('post',function($base,$http){
	return {
		restrict:"E",
		replace:true,
		scope:{
			posting:"=postData",
			type:"@type"
		},
		templateUrl:"templates/post.html",
		link:function(scope,element,attr){
			console.log(scope);

			$http.get($base+"get-post-stat/"+scope.posting.id).success(function(data){
				console.log(data[0]);
				scope.stat=data[0]
			})
		}
	}
})