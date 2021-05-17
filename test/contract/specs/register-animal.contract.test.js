import { provider } from "./init-pact";
import { AnimalController } from "../../../controllers";
import { Matchers } from "@pact-foundation/pact";

const animal = {
    name: "Copito",
    breed: "french",
    gender: "Female",
    vaccinated: false
}

describe('Given An Animal service', () => {
    describe('When a request to add a new animal is made', () => {
        beforeAll(async () => {
            await provider.setup();
            await provider.addInteraction({
                state: 'Adding animal',
                uponReceiving: 'a request to add a new animal',
                withRequest: {
                    method: 'POST',
                    path: '/animals',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    body: Matchers.like(animal),
                },
                willRespondWith: {
                    status: 201,
                    body: {
                        name: Matchers.string("Copito"),
                        breed: Matchers.string("french"),
                        gender: Matchers.string("Female"),
                        vaccinated: Matchers.boolean(false),
                        },
                    headers: {
                        'Content-Type': 'application/json',
                      },
                }
            });
        });

        it("Then it should return the right data", async() =>{

            const response = await AnimalController.register(animal);
            expect(response.data).toMatchSnapshot();

            await provider.verify();
        });

        afterAll(async () => {
            await provider.finalize();
        });
    });
}); 