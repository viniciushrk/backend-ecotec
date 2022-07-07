"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
(async () => {
    await (0, typeorm_1.createConnection)();
})();
