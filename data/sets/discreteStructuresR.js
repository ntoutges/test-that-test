// (R)esources

export const translation = {
  "prompts": [
    "Assume <i>p = <u>It is %<op:0></u></i> and <i>q = <u>It is %<oq:1></u></i>.<br>What is the statement for \"%<ocomb:2> <i>%<op:0></i>%<ocomb:3> <i>%<oq:1></i>%<ocomb:4>\"?",
    "Assume <i>p = <u>It is %<op:0></u></i> and <i>q = <u>It is %<oq:1></u></i>.<br>What is the statement for \"%<ocomb:2> <i>%<oq:1></i>%<ocomb:3> <i>%<op:0></i>%<ocomb:4>\"?",
  ],
  "operativeTerm": [
    "\"%<ocomb:2> <i><u>%<op:0></u></i> %<ocomb:3> <i><u>%<oq:1></u></i>%<ocomb:4>\"",
    "\"%<ocomb:2> <i><u>%<oq:1></u></i> %<ocomb:3> <i><u>%<op:0></u></i>%<ocomb:4>\""
  ],
  "promptOptions": [
    [ // p: <it is>
      "Sunny",
      "Cloudy",
      "Cold",
      "Hot",
    ],
    [ // q: It is <>
      "Raining",
      "Snowing",
      "Hailing",
      "Humid"
    ],
    [ // combo #1
      "It is both",
      "It is either",
      "It is both ( not",
      "It is ( not",
      "It is both",
      "It is",
      "If it is"
    ],
    [ // combo #2
      " and",
      " or",
      " ) and ",
      " ) or",
      " and ( not",
      " or ( not",
      ", then it is "
    ],
    [ // combo #3 (clarificatino)
      "",
      " (or both)",
      ")",
      ")",
      ")",
      ")",
      ""
    ],
    [ // combo simplified
      "and",
      "or",
      "and",
      "or",
      "and",
      "or",
      "implies"
    ],
  ],
  "promptAnswers": [
    [
      "p ^ q",
      "~p ^ q",
      "p ^ ~q",
      "\n", // signal new "group"
      "p v q",
      "~p v q",
      "p v ~q",
      "\n",
      "p -> q",
      "q -> p"
    ],
    [
      "p ^ q",
      "~p ^ q",
      "p ^ ~q",
      "\n", // signal new "group"
      "p v q",
      "~p v q",
      "p v ~q",
      "\n",
      "p -> q",
      "q -> p"
    ],
  ],
  "promptAnswer": [
    {
      "comb": [
        0,3,1,4,2,5, 6,7
      ]
    },
    {
      "comb": [
        0,3,2,5,1,4, 7,6
      ]
    }
  ]
}