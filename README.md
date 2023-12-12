# Server Template

Starter code for an API backend with a working MySQL DB connection.

`main.ts` is the entry point for a koa.js API server.
`worker.ts` is a standalone function that tests writing into the database.

You can use `ctx.log.info` (or warn/error) where the Koa.Context object is available for JSON logs in HTTP requests.

Write tests with [Vitest](https://vitest.dev/).

## Getting Started

### Tooling

1. Homebrew package manager: https://brew.sh/.
1. Volta node.js environment version manager: https://formulae.brew.sh/formula/volta & https://volta.sh/.
1. Install the current node.js engine with `volta install node@lts`
1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
1. Install docker compose: `brew install docker-compose`.

### Initialize

1. Run `volta pin node@20 npm@10` to set the node and npm versions.
1. Install dependencies with `npm install` (or `npm i`).
1. Set up a MySQL docker container with `docker-compose up -d`.
1. Create a database migration with `npx knex migrate:make migration_name` (edit migration_name).
1. Run the database migrations to create the tables `DATABASE_URL=xxxx npm run db:migrate` (i.e. DATABASE_URL=mysql://root:password@127.0.0.1:3306/template).
1. You can use the rollback command as a way to clear loaded data: `DATABASE_URL=xxxx npm run db:rollback`.

### Run

1. Use `npm run dev` and check health by opening the browser at http://localhost:8080.

**Bugs:**

- If you see an error with docker compose such as 'error getting credentials - err: exec: "docker-credential-desktop": executable file not found in $PATH', then check if `cat ~/.docker/config.json` has the key `credsStore`. It should be renamed to `credStore` ([stackoverflow](https://stackoverflow.com/questions/67642620/docker-credential-desktop-not-installed-or-not-available-in-path)).
