import * as stats from "./sets/stats.js";
import * as ds from "./sets/discreteStructures.js";

// questionType = { 0:SelectCategory, 1:free, -1: True/False, [array]: print out these answers }

export const Statistics = {
  generate: (types) => { return stats.getNewQuestion(types); }, // (any[]) => [question, questionType, answer, data]
  getHint: stats.hint
}

export const Math_369 = {
  generate: ds.generate,
  getHint: ds.hint
}