import App from "./src/app.js";
import config from "./src/config/config.js";

const server = new App();
server.listen(config.port)