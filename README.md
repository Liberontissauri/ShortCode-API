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
> DB_HOST = "database hostname"
> DB_PORT = "database port"
> DB_USER = "database user"
> DB_PASSWORD = "user's password"
> DB_NAME = "the name of the database"
5. Configure the database tables by running the following command:
>CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
>CREATE TABLE "api_keys" (
>   email VARCHAR(50) NOT NULL,
>    PRIMARY KEY(key_id)
>);
>
>CREATE TABLE "codes" (
>    code_id UUID NOT NULL DEFAULT uuid_generate_v4(),
>    key_id UUID NOT NULL,
>    title VARCHAR(80) NOT NULL,
>    code Text NOT NULL,
>    lang VARCHAR(50),
>    PRIMARY KEY(code_id),
>    FOREIGN KEY(key_id)
>        REFERENCES api_keys(key_id)
>            ON DELETE CASCADE
>                ON UPDATE CASCADE
>);