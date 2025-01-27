import { beforeEach, describe, expect, test as spec } from 'bun:test';

import { createRule } from '#utils/create-rule/create-rule.ts';
import type { Parameters } from '#create-rule-parameters';

describe('Create Rule', () => {
  let rule: (parameters: Parameters) => Promise<Parameters>;

  beforeEach(() => {
    rule = async (parameters) => {
      return createRule(parameters);
    };
  });

  spec('should create an object with selector', async () => {
    const selector = ':any-nested-css-selector';
    const result = await rule({ selector });

    expect(result).toEqual({
      type: 'rule',
      selector: `&${selector}`,
    });
  });

  const testCases = [
    {
      description: 'should handle selector starting with &',
      input: { selector: '&:hover' },
      expected: {
        type: 'rule',
        selector: '&:hover',
      },
    },
    {
      description: 'should handle selector with multiple &',
      input: { selector: '&&&:focus' },
      expected: {
        type: 'rule',
        selector: '&:focus',
      },
    },
    {
      description: 'should handle RegExp selector',
      input: { selector: /\.class-name/ },
      expected: {
        type: 'rule',
        selector: /\.class-name/,
      },
    },
  ];

  testCases.forEach(({ description, input, expected }) => {
    spec(description, async () => {
      const result = await rule(input);

      expect(result).toEqual(expected);
    });
  });
});
