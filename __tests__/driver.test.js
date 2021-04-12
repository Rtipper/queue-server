'use strict';

const driver = require('../driver.js');

describe('Vendor Testing', () => {
  let consoleSpy;
  let payload = {orderId: 123};

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    jest.useFakeTimers()
  });

  afterEach(() => {
    consoleSpy.mockRestore()
    jest.useRealTimers()
  })

  it('function "itemPickUp" correctly logs an output for reference', () => {
    driver.itemPickUp(payload)
    jest.advanceTimersByTime(1000)
    expect(consoleSpy).toHaveBeenCalled();
  })
})