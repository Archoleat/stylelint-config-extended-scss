import { beforeEach, describe, it } from 'bun:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import stylelint from 'stylelint';

import config from '../../src/index.js';

const validScss = readFileSync('./specs/styles/valid.scss', 'utf-8');
const invalidScss = readFileSync('./specs/styles/invalid.scss', 'utf-8');

describe('flags no warnings with valid scss', () => {
  let result;

  beforeEach(async () => {
    result = await stylelint.lint({
      code: validScss,
      config,
    });
  });

  it('did not error', () => {
    assert.equal(result.errored, false);
  });

  it('flags no warnings', () => {
    assert.equal(result.results[0].warnings.length, 0);
  });
});

describe('flags warnings with invalid scss', () => {
  let result;

  beforeEach(async () => {
    result = await stylelint.lint({
      code: invalidScss,
      config,
    });
  });

  it('did error', () => {
    assert.equal(result.errored, true);
  });

  it('flags one warning', () => {
    assert.equal(result.results[0].warnings.length, 1);
  });

  it('correct warning text', () => {
    assert.equal(
      result.results[0].warnings[0].text,
      'Expected variable to be kebab-case',
    );
  });

  it('correct rule flagged', () => {
    assert.equal(result.results[0].warnings[0].rule, 'scss/dollar-variable-pattern');
  });

  it('correct severity flagged', () => {
    assert.equal(result.results[0].warnings[0].severity, 'error');
  });

  it('correct line number', () => {
    assert.equal(result.results[0].warnings[0].line, 1);
  });

  it('correct column number', () => {
    assert.equal(result.results[0].warnings[0].column, 1);
  });
});
