angular.module('starter.directives', [])

.directive('survey', function ($location, $timeout) {
    return {
      templateUrl: 'surveys/question_group.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs, ctrls) {

        $timeout(function(){

          console.log(attrs);

          scope.survey = scope.$parent.survey

          scope.questionGroups = _.flatten(scope.$parent.questionGroups);

          // -->  eliminate
          scope._LABELS = scope.labels || [
              {name:'back',label:'Back'},
              {name:'next',label:'Next'},
              {name:'submit', label:'Save'}
          ];

              // scope._SURVEY_FAILURE_LABEL = scope.surveyFailureLabel || '<b>Unfortunately, this survey failed to load:</b>';



              // scope.surveyFailure = function(){

              //       var error = {};
              //       //there are no questions
              //       if (scope.questionGroups.length == 0 && _.isArray(scope.questionGroups)) {
              //             error = { error:true, message:"There are no questions available." }
              //       }
              //       //questions are not in an array
              //       else if (_.isArray(scope.questionGroups) == false){
              //             error = { error:true, message:"Questions are not properly formatted." }
              //       }
              //       else {
              //             error = { error:false }
              //       }

              //       if (error.error == true){
              //             console.error(error);
              //       }

              //       return error

              // }

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


          // //is overridden by scope.complete function if different action is desired at the end of survey
          // scope.submit = scope.submit || function(){
          //     console.log('OVERRIDE THIS IN YOUR CONTROLLER SCOPE: ',$('form').serializeArray());
          //     $location.path('#/');
          // }

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
