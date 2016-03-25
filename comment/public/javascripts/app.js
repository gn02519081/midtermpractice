angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope, $http){
    $scope.test = 'Hello world!';
    
    $scope.comments = [
	{title:'Allen',category: 'American',  upvotes:5},
        {title:'Kim',category: 'Chinese',  upvotes:4},
	{title:'Ray',category: 'Dessert', upvotes:1},
	{title:'Alex',category: 'French',  upvotes:6},
	{title:'Shang',category: 'India',  upvotes:3},
    ];
    
    $scope.create = function(comment) {
      return $http.post('/comments', comment).success(function(data){
        $scope.comments.push(data);
      });
    };
	$scope.addComment = function() {
	  $scope.create({title:$scope.formContent,category: $scope.formContent2, upvotes:0});
      $scope.formContent='';
      $scope.formContent2='';
    };

    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes += 1;
        });
    };
    
    $scope.incrementUpvotes = function(comment){
	$scope.upvote(comment); 
    }; 
    

    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      });
    };

	$scope.getAll();
    }
]);
