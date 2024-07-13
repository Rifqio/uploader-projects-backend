import { PrismaClient } from "@prisma/client";
import { Logger } from "@utils/logger";

const prisma = new PrismaClient({
    log: [{ emit: 'event', level: 'query' }, 'info', 'warn', 'error'],
    errorFormat: 'pretty',
});

prisma.$on('query', (e) => {
    Logger.debug(`${e.query} | params: ${e.params} | duration: ${e.duration}ms`)
});

export default prisma;