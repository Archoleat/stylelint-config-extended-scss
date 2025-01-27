import { BLOCK_REGEX, ELEMENT_REGEX, MODIFIER_REGEX } from '@archoleat/reglib';
import { describe, expect, test as spec } from 'bun:test';

describe('BEM Class Regex', () => {
  const BEMClassRegex = new RegExp(
    `^(?:${BLOCK_REGEX})(?:${ELEMENT_REGEX})?(?:${MODIFIER_REGEX})?$`,
  );

  const validTestCases = [
    'block',
    'block-name',
    'block-name-123',
    'block--modifier',
    'block-name--modifier-name',
    'block-name--modifier',
    'block--modifier-name',
    'block__element',
    'block-name__element-name',
    'block-name__element',
    'block__element-name',
    'block__element--modifier',
    'block-name__element-name--modifier-name',
    'block-name__element-name--modifier',
    'block-name__element--modifier-name',
    'block__element-name--modifier-name',
  ];

  const invalidTestCases = [
    'block__element_modifier',
    'Block',
    'BlockElement',
    '123',
  ];

  describe('should match valid BEM classes', () => {
    validTestCases.forEach((testCase) => {
      spec(`should match ${testCase}`, () => {
        expect(testCase).toMatch(BEMClassRegex);
      });
    });
  });

  describe('should not match invalid BEM classes', () => {
    invalidTestCases.forEach((testCase) => {
      spec(`should not match ${testCase}`, () => {
        expect(testCase).not.toMatch(BEMClassRegex);
      });
    });
  });
});
