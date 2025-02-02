import { beforeEach, describe, expect, test as spec } from 'bun:test';

import { createAtRule } from '#utils/create-at-rule/create-at-rule.ts';
import type { Parameters } from '#create-at-rule-parameters';

describe('Create At Rule', () => {
  let atRule: (parameters: Parameters) => Promise<Parameters>;

  beforeEach(() => {
    atRule = async ({ name, hasBlock }) => {
      return createAtRule({ name, hasBlock });
    };
  });

  spec('should create an object with a block', async () => {
    const result = await atRule({ name: 'test-rule-1', hasBlock: true });

    expect(result).toEqual({
      name: 'test-rule-1',
      hasBlock: true,
      type: 'at-rule',
    });
  });

  spec('should create an object without a block', async () => {
    const result = await atRule({ name: 'test-rule-2', hasBlock: false });

    expect(result).toEqual({
      name: 'test-rule-2',
      hasBlock: false,
      type: 'at-rule',
    });
  });

  const testCases = [
    {
      description: 'should handle empty name',
      input: { name: '', hasBlock: true },
      expected: { name: '', hasBlock: true, type: 'at-rule' },
    },
    {
      description: 'should handle default hasBlock (false)',
      input: { name: 'test-rule-3' },
      expected: { name: 'test-rule-3', hasBlock: false, type: 'at-rule' },
    },
  ];

  testCases.forEach(({ description, input, expected }) => {
    spec(description, async () => {
      const result = await atRule(input);

      expect(result).toEqual(expected);
    });
  });
});
