const { Publisher } = require("@pact-foundation/pact");
const dotenv= require('dotenv');
dotenv.config();

const opst={
    pactBroker: process.env.PACT_BROKER_BASE_URL,
    pactBrokerToken: process.env.PACT_BROKER_BASE_TOKEN,
    consumerVersion: process.env.PACT_CONSUMER_VERSION,
    pactFilesOrDirs: ["./test/contract/pacts/animalshelterfront-animalshelterback.json"]

};

new Publisher(opst).publishPacts();

