import * as resources from "./discreteStructuresR.js";

const typesKey = [
  "translation"
];

export function generate(types) {
  const typeIndex = types[Math.floor(Math.random() * types.length)];
  const type = typesKey[typeIndex];

  return generateArbitrary(typeIndex);

  // switch (type) {
  //   case "translation": {
  //     return generateTranslation();
  //   }
  // }
}

export function hint(answer, test, data) {
  switch (typesKey[data.type]) {
    case "translation":
      return generateTranslationHint(answer,test,data);
    default:
      return "No hints available... sorry!"
  }
}


function generateArbitrary(index) {
  const type = typesKey[index];

  const promptIndex = chooseIndex(resources[type].prompts);
  const { replaced, values } = smartReplace(
    resources[type].prompts[promptIndex],
    resources[type].promptOptions
  );
  const answerI = getAnswerFrom(
    resources[type].promptAnswer[promptIndex],
    values
  );
  // const answer = resources[type].promptAnswers[answerI];

  return [
    replaced,
    resources[type].promptAnswers[promptIndex],
    answerI,
    {
      type: index,
      varient: promptIndex,
      values
    }
  ];
}

function generateTranslationHint(answer,test,data) {
  const sentence = smartReplace(resources.translation.operativeTerm[data.varient], resources.translation.promptOptions, data.values);
  const pVal = resources.translation.promptOptions[0][data.values.p];
  const qVal = resources.translation.promptOptions[1][data.values.q];

  let answerIndex = -1;
  for (let i = 0; i <= answer; i++) {
    answerIndex++;
    if (resources.translation.promptAnswers[data.varient][answerIndex] == "\n") i--; // skip past "\n" chars
  }
  console.log(data.varient, answerIndex, resources.translation.promptAnswers[data.varient], answer)
  return {
    "1.": `p = ${pVal}, q = ${qVal}`,
    "2.": `${sentence.replaced}`,
    "3.": `${sentence.replaced.replace(pVal, "p").replace(qVal, "q")} (p, q; combined with the [<i>${resources.translation.promptOptions[5][data.values.comb]}</i>] operator)`,
    "4.": `${resources.translation.promptAnswers[data.varient][answerIndex]}`
  };
}


// replaces any %<o[group]:[index]> (option) with an argument
function smartReplace(pattern, options, presetVals=null) {
  const toReplaces = pattern.match(/%<o[^:]+:\d+>/g);
  const hasReplaced = new Map(); // Map<group: string, choseSubIndex: number>
  const replacements = [];

  const groupPattern = /%<o([^:]+):\d+>/
  const indexPattern = /%<o[^:]+:(\d+)>/

  // get replacement values
  for (const toReplace of toReplaces) {
    const index = +toReplace.match(indexPattern)[1];
    const group = toReplace.match(groupPattern)[1];
    if (hasReplaced.has(group)) {
      const subIndex = hasReplaced.get(group);
      replacements.push(options[index][subIndex]);
    }
    else {
      const subIndex = (presetVals && group in presetVals) ? presetVals[group] : chooseIndex(options[index]);
      hasReplaced.set(group, subIndex);
      replacements.push(options[index][subIndex]);
    }
  }

  // slot replacements into their locations
  for (const replacement of replacements) { pattern = pattern.replace(/%<o[^:]+:\d+>/, replacement); }

  const values = {};
  hasReplaced.forEach((key,value) => { values[value] = key; }); // translate map to object

  return {
    replaced: pattern,
    values
  };
}

// options is an array
function chooseIndex(options) {
  return Math.floor(Math.random() * options.length);
}

// options is an array
function chooseFrom(options) {
  return options[chooseIndex(options)];
}

// looks through nested object:
// ex: {comb: [ { a: [0,1] }, { b: [2,3] } ]}
// exp: when [comb]=0: (when [a]=0, the answer is 0, when [a]=1, the answer is 1)
// exp: when [comb]=1: (when [a]=0, the answer is 2, when [a]=1, the answer is 3)
function getAnswerFrom(answers, values) { // depth first search
  if (typeof answers == "number") return answers;

  for (const key in answers) {
    const current = answers[key];
    if (key in values && values[key] < current.length && current[values[key]] != null) { // index within list, and value is not null
      return getAnswerFrom(current[values[key]], values);
    }
  }

  return -1; // signify that something has gone wrong
}
