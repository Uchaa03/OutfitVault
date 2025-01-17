# Desarrollo Full-Stack con MERN
## Proyecto OutfitVault
#### Realizado Por: Adrián Ucha, Pablo Barrera, Maurice Darner
## Deployment
### Overall process using Digital Ocean

1. Set up a Digital Ocean droplet

   A droplet is a virtual private server VPS that can be used to host websites, applications, and other services."


2. SSH into the droplet

   SSH into your droplet from your local machine to set up the server.


3. Install Node.js, MongoDB, and other dependencies

   Install Node.js

   Install MongoDB

   Install Nginx


4. Upload your project to the droplet

   Clone your project from GitHub to the server

   Install dependencies for Node.js, Express, and React


5. Build and serve the React frontend

   Npm run build

   Move the production folder into the Nginx directory "sudo cp -r build/* /var/www/html"


6. Set up the Express/Node.js backend

   Start backend server "Investigate pm2 to manage processes"


7. Set up Nginx as a reverse proxy

   Edit Nginx configuration file


8. "Optional" Secure application using SSL

   Set up SSL (HTTPS) for your application "For example, using Let's Encrypt"


9. Additional options

SSH security and firewalls

- DigitalOcean offers a cloud firewall that allows you to define which ports can be accessed from the internet. Here are
  the key firewall settings. Block all ports except the ones you need (e.g., port 80 for HTTP, port 443 for HTTPS, and the
  port your application uses for backend services like 5000.


SSH Access:
- Only allow SSH access to your server from specific IP addresses (your IP address, for example. This reduces
  the risk of unauthorized access.


Maintenance and backups "Automated Backups:
- DigitalOcean provides automated backups for droplets, which you can enable
  in the DigitalOcean dashboard. These backups are taken weekly.


- MongoDB Dump: You can manually back up your MongoDB database using the mongodump command. mongodump --out /path/to/backup/.
  Consider running this command regularly, e.g., once a day or week, or use a cron job to automate it."

Monitoring and logs

- Digital Ocean has built in performance metrics, Libraries like winston can be used for logging http
  requests and errors
