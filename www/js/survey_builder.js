angular.module('friendshipBench.survey_builder', [])

.service('SurveyBuilder', function (GuidMaker){
  return {
    build: function(source) {
      var content = [];
      var source = source;
      var surveyName = "";

      console.log(source);
      // Loop through each object
      _.each(source["surveys"], function (survey){

        //build new survey object
        surveyName = survey.survey

        _.each(survey["survey_questions"], function (object) {

            if(object.type === "numeric") {
                object.type = "number";
            };
            var question = {
                id: object.guid,
                questionGroup: source.guid,
                questionDataLabel: (source.group_name + '_' + object.orderer),
                responseGroupId: source.group_name,
                type: object.type,
                order: (surveyName + '_' + object.orderer),
                content: object.content,
                language: object.language,
                required: object.required
            };

            var valuelessResponses = [];
            var responses = [];
            // construct responses
            _.each(object, function (value, key, list){

                // Check if key begins with 'response'
                if(key.startsWith("response")) {

                    //parse out order_identifier
                    var orderer = key.match(/\d+/)[0];

                    //Check if it is a response label and exists
                    if(!key.endsWith("value") && value !== null) {

                        //construct response object
                        var responseObject = {
                            Objectid: question.id,
                            label: value,
                            order: orderer,
                            responseGroupId: question.questionGroup,
                            responseGroupLabel: question.questionGroup
                        }

                        // insert into responses array
                        valuelessResponses.push(responseObject);
                    };

                    if (key.endsWith("value") && value !== null) {

                        // parse out orderer
                        var orderer = key.match(/\d+/)[0];

                        // find associated response object
                        var responseObject = _.find(valuelessResponses, {order: orderer});

                        // set the value
                        responseObject.value = value;

                        // push completed response object into finished array
                        responses.push(responseObject);

                    }
                }
            });

            // attach responses array to question
            question.responses = responses;

            // push question object into content array
            content.push(question);
         });
      });

        var groupedContent = _.toArray(_.groupBy(content, 'order'));
        console.log(groupedContent);
        return groupedContent;

    }
  }
})
