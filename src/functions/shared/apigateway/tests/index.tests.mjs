import * as apigateway from '../index.mjs';
import { expect } from 'chai';

describe('apigateway', () => {
  it('Success - with response', async () => {
    const response = apigateway.getResponse(200, { message: 'hello world' });
    expect(response).to.have.property('statusCode', 200);
    expect(response).to.have.property('body');
    const body = JSON.parse(response.body);
    expect(body).to.have.property('message', 'hello world');
    expect(response).to.have.property('headers');
    expect(response.headers).to.have.property('Access-Control-Allow-Origin', '*');
    expect(response.headers).to.have.property('Access-Control-Allow-Headers', '*');
  });

  it('Success - without response', async () => {
    const response = apigateway.getResponse(204);
    expect(response).to.have.property('statusCode', 204);
    expect(response).to.not.have.property('body');
    expect(response).to.have.property('headers');
    expect(response.headers).to.have.property('Access-Control-Allow-Origin', '*');
    expect(response.headers).to.have.property('Access-Control-Allow-Headers', '*');
  });
});