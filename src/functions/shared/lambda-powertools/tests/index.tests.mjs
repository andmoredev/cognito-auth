import { expect } from 'chai';
import sinon from 'sinon';
import { initializePowertools } from '../index.mjs';

describe('initializePowertools', () => {
  it('should return the original handler if LAMBDA_TASK_ROOT is not defined', () => {
    const handler = sinon.stub();
    const result = initializePowertools(handler);
    expect(result).to.equal(handler);
  });

  it('should return the modified handler if LAMBDA_TASK_ROOT is defined', () => {
    process.env.LAMBDA_TASK_ROOT = '/path/to/task/root';
    const handler = () => {};
    const result = initializePowertools(handler);
    expect(result).to.not.equal(handler);
    expect(result).to.have.property('use');
    expect(result.use).to.be.a('function');
    expect(result).to.have.property('before');
    expect(result.before).to.be.a('function');
    expect(result).to.have.property('after');
    expect(result.after).to.be.a('function');
    expect(result).to.have.property('onError');
    expect(result.onError).to.be.a('function');
    delete process.env.LAMBDA_TASK_ROOT;
  });
});