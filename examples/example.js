const opennode = require('opennode');

/**
 * Setup your API Key and environment
 */
opennode.setCredentials('MY_API_KEY', 'dev');


/**
 *
 * Fetch charge information
 */

/**
 * Using promises
 */

opennode.chargeInfo('47bb5224-bf50-49d0-a317-4adfd345221a')
  .then(charge => {
    console.log(charge);
  })
  .catch(error => {
    console.error(`${error.status} | ${error.message}`);
  })

/**
 *
 * Using async/await
 */

;(async () => {

  try {
    const data = await opennode.chargeInfo('47bb5224-bf50-49d0-a317-4adfd345221a');
    console.log(data);
  }
  catch (error) {
    console.error(`${error.status} | ${error.message}`);
  }
})()

/**
 *
 * Creating a charge
 */

/**
 * Using promises
 */

const charge = {
  amount: 10.5,
  currency: "USD",
  callback_url: "https://example.com/webhook/opennode",
  auto_settle: false
};

/**
 * Using promises
 */

opennode.createCharge(charge)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(`${error.status} | ${error.message}`);
  });

/**
 * Using async/await
 */

;(async () => {
  try {
    const response = await opennode.createCharge(charge);
    console.log(response);
  }
  catch(error) {
    console.error(`${error.status} | ${error.message}`);
  }
})();


