import { describe, expect, test as spec } from 'bun:test';

import { createPropertiesGroup } from '#utils/create-properties-group/create-properties-group.ts';

describe('Create Properties Group', () => {
  spec(
    'should create an object with (groupName: String, properties: [])',
    async () => {
      const properties = ['display', 'z-index'];
      const groupName = 'Test Group Name';

      const result = await createPropertiesGroup({ groupName, properties });

      expect(result).toEqual({
        groupName,
        properties,
        emptyLineBefore: 'threshold',
        noEmptyLineBetween: true,
        order: 'flexible',
      });
    },
  );

  const testCases = [
    {
      description: 'should handle empty properties array',
      input: { groupName: 'Empty Properties Group', properties: [] },
      expected: {
        groupName: 'Empty Properties Group',
        properties: [],
        emptyLineBefore: 'threshold',
        noEmptyLineBetween: true,
        order: 'flexible',
      },
    },
    {
      description: 'should handle single property',
      input: { groupName: 'Single Property Group', properties: ['display'] },
      expected: {
        groupName: 'Single Property Group',
        properties: ['display'],
        emptyLineBefore: 'threshold',
        noEmptyLineBetween: true,
        order: 'flexible',
      },
    },
  ];

  testCases.forEach(({ description, input, expected }) => {
    spec(description, async () => {
      const result = await createPropertiesGroup(input);

      expect(result).toEqual(expected);
    });
  });
});
