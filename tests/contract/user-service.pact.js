// tests/contract/user-service.pact.js
const { Pact } = require('@pact-foundation/pact');

describe('User Service Contract', () => {
    const provider = new Pact({
        consumer: 'WebApp',
        provider: 'UserService'
    });

    beforeAll(() => provider.setup());
    afterAll(() => provider.finalize());

    test('GET /users/{id}', async () => {
        await provider.addInteraction({
            state: 'user exists',
            uponReceiving: 'a request for user data',
            willRespondWith: {
                status: 200,
                body: {
                    id: Matchers.uuid(),
                    name: Matchers.string()
                }
            }
        });
    });
});