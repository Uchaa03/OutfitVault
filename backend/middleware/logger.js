/**
 * Middleware to log each action.
 * Logs the HTTP request details (timestamp, route, and method) to the console.
 *
 * @param {Object} req - The request object representing the HTTP request.
 * @param {Object} res - The response object representing the HTTP response.
 * @param {Function} next - The next middleware function to pass control to the next handler.
 *
 * @example
 * app.use(logger); // Example of global usage in Express
 *
 * @description
 * This middleware logs the timestamp, requested route, and the HTTP method for each incoming request.
 * The log message follows the format:
 * "[YYYY-MM-DD HH:MM:SS] Ruta: {requestedRoute}, Método: {HTTPMethod}"
 * Example: "[2025-01-28 12:30:00] Ruta: /api/users, Método: GET"
 *
 * It helps track server activity, which can be useful for debugging and monitoring.
 */
const logger = (req, res, next) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedDate = `[${year}-${month}-${day} ${hours}:${minutes}:${seconds}]`;

    const logMessage = `${formattedDate} Ruta: ${req.originalUrl}, Método: ${req.method}`;

    // Log the message to the console
    console.log(logMessage);

    next();
};

export default logger;
