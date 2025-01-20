// Middleware to log each action
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