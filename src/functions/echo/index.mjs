import { initializePowertools, logger } from '../shared/lambda-powertools/index.mjs';
import { getResponse } from '../shared/apigateway/index.mjs';

export const handler = initializePowertools(async (event, context) => {
  try {
    const input = JSON.parse(event.body);

    return getResponse(200, input);
  } catch (err) {
    logger.error(err, err.stack);
    return getResponse(500, { message: 'Something went wrong!' });
  }
});
