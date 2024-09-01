import { setupServer } from "./server.js";
import { initMobgoDB } from "./db/initMongoDB.js";

const bootstrap = async () => {
    await initMobgoDB();
    setupServer();
}

bootstrap();
