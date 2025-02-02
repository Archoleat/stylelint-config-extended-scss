import type { Parameters } from './parameters.ts';

const createRule = async (parameters: Parameters) => {
  const { selector } = parameters;

  const normalizedSelector =
    selector instanceof RegExp ? selector : `&${selector.replace(/^&+/g, '')}`;

  return {
    type: 'rule',
    selector: normalizedSelector,
  };
};

export { createRule };
