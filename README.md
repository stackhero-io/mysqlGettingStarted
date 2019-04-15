# Getting started with MySQL

Note: this example uses the new xdevapi library which uses the X protocol.

It can work only with the official MySQL and not with MariaDB.


## How to use

Copy the file `.env-example` to `.env` and fill it with your credentials.

Then just run `npm run start`.

It will connect to your MySQL server, create the database `stackherotest` and the table `users` and fill it with 1000 fake users datas.