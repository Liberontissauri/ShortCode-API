# ShortCode Server
This is the server which runs the API for ShortCode (temporary name) a website to quickly share snippets of your code with others.
> Check it out at google.com !

For Documentation on the endpoints of this API, check the Docs.md (still non existant :0) file :).

## Setup Process
Before starting, make sure you have the following tools available for use:
- Node JS
- A PostgreSQL Database

1. Clone this git repo:
> git clone https://github.com/Liberontissauri/ShortCode-API.git
2. Go into the cloned repo:
> cd ShortCode-API
3. Install the necessary dependencies:
> npm i
4. Create a file called .env and add the database credentials:
> DB_HOST = "database hostname"<br>
> DB_PORT = "database port"<br>
> DB_USER = "database user"<br>
> DB_PASSWORD = "user's password"<br>
> DB_NAME = "the name of the database"
5. Configure the database tables by running the following command:
>CREATE EXTENSION IF NOT EXISTS "uuid-ossp";<br>
>CREATE TABLE "api_keys" (<br>
>   email VARCHAR(50) NOT NULL,<br>
>    PRIMARY KEY(key_id)<br>
>);<br>
><br>
>CREATE TABLE "codes" (<br>
>    code_id UUID NOT NULL DEFAULT uuid_generate_v4(),<br>
>    key_id UUID NOT NULL,<br>
>    title VARCHAR(80) NOT NULL,<br>
>    code Text NOT NULL,<br>
>    lang VARCHAR(50),<br>
>    PRIMARY KEY(code_id),<br>
>    FOREIGN KEY(key_id)<br>
>        REFERENCES api_keys(key_id)<br>
>            ON DELETE CASCADE<br>
>                ON UPDATE CASCADE<br>
>);<br>