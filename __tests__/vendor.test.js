'use strcit';

const vendor = require('../vendor.js');

describe('Vendor Testing', () => {
  let consoleSpy;
  let payload = []

  beforeEach(() =>{
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it('function "itemDelievered" correctly logs an output for reference', () => {
    vendor.itemDelievered(payload)
    expect(consoleSpy).toHaveBeenCalled();
  })
})