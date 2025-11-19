# NxWorkspace

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/node?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Development Setup

```bash
npm install
npx husky
```

## Database Setup

This project uses MySQL 8.0 running in a Docker container for local development.

### Prerequisites

- Docker and Docker Compose installed on your machine
- Port 3306 available (or configure a different port in `.env`)

### Quick Start

1. Copy the environment template file:
```bash
cp docker/.env.example docker/.env
```

2. (Optional) Update the `docker/.env` file with your preferred credentials

3. Start the MySQL container:
```bash
docker-compose -f docker/docker-compose.yml up -d mysql
```

4. Verify the container is running and find the assigned port:
```bash
docker-compose -f docker/docker-compose.yml ps
# or to see just the port mapping:
docker-compose -f docker/docker-compose.yml port mysql 3306
```

**Note**: If port 3306 is in use, Docker will automatically try ports 3307-3310

### Database Connection

Once the container is running, you can connect to MySQL using:

**Connection String:**
```
mysql://job_board_user:devpassword123@localhost:3306/job_board
```

**Direct MySQL Client:**
```bash
mysql -h 127.0.0.1 -P 3306 -u job_board_user -p
# Enter password: devpassword123
```

**From the API Application:**
```typescript
// Connection configuration
{
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
}
```

### Container Management

**Stop the container:**
```bash
docker-compose -f docker/docker-compose.yml stop mysql
```

**Start the container:**
```bash
docker-compose -f docker/docker-compose.yml start mysql
```

**Stop and remove the container (preserves data):**
```bash
docker-compose -f docker/docker-compose.yml down
```

**Remove container and data volume (⚠️ destroys all data):**
```bash
docker-compose -f docker/docker-compose.yml down -v
```

### Troubleshooting

If you encounter connection issues:
1. Check if the container is healthy: `docker-compose -f docker/docker-compose.yml ps`
2. View container logs: `docker-compose -f docker/docker-compose.yml logs mysql`
3. Ensure port 3306 is not already in use: `lsof -i :3306`

For more detailed information, see [docs/DATABASE.md](docs/DATABASE.md).

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/f6LACPkg5C)

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve api
```

To create a production bundle:

```sh
npx nx build api
```

To see all available targets to run for a project, run:

```sh
npx nx show project api
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/node:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/node:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/node?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
