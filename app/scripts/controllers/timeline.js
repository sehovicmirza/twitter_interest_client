'use strict';

/**
 * @ngdoc function
 * @name twitterInterestClientApp.controller:TimelineCtrl
 * @description
 * # TimelineCtrl
 * Controller of the twitterInterestClientApp
 */
angular.module('twitterInterestClientApp')
.controller('TimelineCtrl', function ($scope, $http, $sce, $timeout)
{
    //GET ALL 
    $http.get("http://localhost:3000/interests").then(function(result)
    {
        console.log(result);
        $scope.interests = result.data;
        console.log(result.data)
    });

    //GET
    $scope.showTimeline = function(interestId)
    {
        var route = "http://localhost:3000/interests/"+ interestId;
        console.log(route);

        $http.get(route).then(function(result)
        {
            console.log(result);

            var tweets = result.data.join();
            $scope.tweets = $sce.trustAsHtml(tweets);

            //wait and render tweets with widgets.js
            $timeout(function () 
            {
                twttr.widgets.load();
            }, 30);
        });
    };

    //DELETE
    $scope.removeInterest = function(interestId)
    {
        var route = "http://localhost:3000/interests/"+ interestId;
        console.log(route);

        $http.delete(route).then(function(result)
        {
            console.log(result);

            alert("Interest removed");
        });

        $scope.interests = $scope.interests.filter(function(e) { return e.id !== interestId })
     };

    //POST
    $scope.createInterest = function()
    {
        var msg = generateInterestBodyMsg($scope);
        console.log(JSON.stringify(msg));

        $http.post("http://localhost:3000/interests", msg).then(
        function(result) 
        {
            console.log(result.data);
            $scope.interests.unshift(result.data);

            alert("Interest registered sucessfully");
            $('#newInterestModal').modal('hide');
        },
        function(error) 
        {
            console.log(error);
        });
    };
});

function generateInterestBodyMsg($scope)
{
        var hashtags_attributes = [];
        for(var i in $scope.hashtags)
        {
            hashtags_attributes.push({text: $scope.hashtags[i]})
        };

        var mentions_attributes = [];
        for(var i in $scope.mentions)
        {
            mentions_attributes.push({text: $scope.mentions[i]})
        }; 

        var bodyMsg = 
        {
            interest: 
            {
                screen_name: $scope.screen_name,
                hashtags_attributes: hashtags_attributes,
                mentions_attributes: mentions_attributes
            }
        };

        return bodyMsg;
}