import { createLogger, transports, format } from 'winston';

//@note Improvement - use Pino async logging. , or  winston through external transport
export const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console(), new transports.File({ filename: 'logs/server.log' })],
});
