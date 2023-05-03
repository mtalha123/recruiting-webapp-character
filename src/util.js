import { DEFAULT_ATTR_VALUE } from './consts.js';

export function calculateModifier(attrValue) {
  return Math.floor((attrValue - DEFAULT_ATTR_VALUE) / 2);
}

export function calcTotalSkill(charData, skillName) {
  return charData.skills[skillName].points + calculateModifier(charData.attributes[charData.skills[skillName].attributeModifier])
}