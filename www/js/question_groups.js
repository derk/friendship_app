angular.module('starter.questions', [])

.service('QuestionGroups', [ function() {
  return {
    questions: [
        {
          content: "Include demographic information",
          id: "d485d4c8d859f8cc",
          order: 0,
          questionDataLabel: "",
          questionGroup: "demographics",
          required: "",
          responseGroupId: "",
          responses: [],
          type: "html"
        },
        {
          content: "Over the past week, how often have you been bothered by LITTLE INTEREST OR PLEASURE IN DOING THINGS?",
           id: "f99a845eea530b2c",
           order: 1,
           questionDataLabel: "demographics1",
           questionGroup: "demographics",
           required: "required",
           responseGroupId: "demographics",
           type: "radio",
           responses: [
            {
              Objectid: "6f04febc1dcd99011",
              label: "Not at all",
              order: "1",
              value: "0",
              responseGroupId: "demographics",
              responseGroupLabel: "demographics"
            },
            {
            Objectid: "6f04febc1dcd99012",
              label: "Several days",
              order: "2",
              value: "2",
              responseGroupId: "demographics",
              responseGroupLabel: "demographics"
            },
            {
            Objectid: "6f04febc1dcd99013",
              label: "More than half the days",
              order: "3",
              value: "3",
              responseGroupId: "demographics",
              responseGroupLabel: "demographics"
            },
            {
            Objectid: "6f04febc1dcd99014",
              label: "Nearly every day",
              order: "4",
              value: "4",
              responseGroupId: "demographics",
              responseGroupLabel: "demographics"
            }
          ]

        },
        {
          content: "Over the past week, how often have you been bothered by LITTLE INTEREST OR PLEASURE IN DOING THINGS?",
           id: "f99a845eea530b2c",
           order: 2,
           questionDataLabel: "demographics1",
           questionGroup: "demographics",
           required: "required",
           responseGroupId: "demographics",
           type: "checkbox",
           responses: [
            {
              Objectid: "6f04febc1dcd99011",
              label: "Not at all",
              order: "1",
              value: "0",
              responseGroupId: "demographics",
              responseGroupLabel: "demographics"
            },
            {
            Objectid: "6f04febc1dcd99012",
              label: "Several days",
              order: "2",
              value: "2",
              responseGroupId: "demographics",
              responseGroupLabel: "demographics"
            },
            {
            Objectid: "6f04febc1dcd99013",
              label: "More than half the days",
              order: "3",
              value: "3",
              responseGroupId: "demographics",
              responseGroupLabel: "demographics"
            },
            {
            Objectid: "6f04febc1dcd99014",
              label: "Nearly every day",
              order: "4",
              value: "4",
              responseGroupId: "demographics",
              responseGroupLabel: "demographics"
            }
          ]

        }
      ]
    }
}])
