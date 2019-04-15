# Getting started with MySQL

Note: this example uses the new xdevapi library which uses the X protocol.

It can work only with the official MySQL and not with MariaDB.


## How to use

This example will connect to your MySQL server, create the database `stackherotest` and the table `users` and fill it with 1000 fake users datas.


1. Clone this repository: `git clone https://github.com/stackhero-io/mysqlGettingStarted && cd mysqlGettingStarted`

2. Copy the file `.env-example` to `.env` and fill it with your credentials.

3. Run the script: `npm run start`.


You can see the script code in the file `app.js` and see how it works to use it as an example.