'use strict';

const vendor = require('../acme.js');

describe('VENDOR TESTING', () => {
  let consoleSpy;
  let payload = {};

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it('function "itemDelievered" properly logs some output', () => {
    vendor.itemDelievered(payload)
    expect(consoleSpy).toHaveBeenCalled();
  })
})