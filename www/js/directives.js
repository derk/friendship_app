angular.module('starter.directives', [])

.directive('survey', function ($location, $timeout) {
    return {
      templateUrl: 'surveys/question_group.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs, ctrls) {

        $timeout(function(){

          scope.survey = scope.$parent.survey;

          scope.questionGroups = scope.$parent.questionGroups;

          scope._LABELS = scope.labels || [
              {name:'back',label:'Back'},
              {name:'next',label:'Next'},
              {name:'submit', label:'Save'}
          ];

          scope.label = function(labelName){
              return _.where(scope._LABELS, {name:labelName})[0].label
          }

          scope.numberOfQuestions = scope.questionGroups.length;


          scope.currentIndex = scope.questionIndex || 0;

          scope.showQuestion = function(questionIndex){
              return questionIndex == scope.currentIndex;
          }

          scope.next = function(){
              scope.currentIndex++;
              console.log(scope.survey);
          };

          scope.back = function(){
              scope.currentIndex--;
          };

          scope.questionViewType = function(questionType){

              switch (questionType){

                  case "radio":
                  return "radio"
                  break;

                  case "checkbox":
                  return "checkbox"
                  break;

                  case "html":
                  return "html"
                  break;

                  default:
                  return questionType
                  break;

              }

          }
        },0);
      }
    };
  });
