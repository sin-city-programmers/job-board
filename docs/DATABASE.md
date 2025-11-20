# Database Setup Guide

This guide provides comprehensive information about setting up and managing the MySQL database for the Job Board application.

## Table of Contents

- [Overview](#overview)
- [Local Development Setup](#local-development-setup)
- [Configuration](#configuration)
- [Volume Management and Data Persistence](#volume-management-and-data-persistence)
- [Backup and Restore](#backup-and-restore)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)

## Overview

The Job Board application uses **MySQL 8.0** as its primary database. For local development, we use Docker and Docker Compose to provide a consistent, isolated database environment.

### Key Features

- **MySQL 8.0 LTS**: Long-term support version with modern features
- **Docker Compose**: Easy container orchestration
- **Named Volumes**: Persistent data storage across container restarts
- **Health Checks**: Automatic monitoring of database availability
- **Environment-based Configuration**: Easy transition from dev to production

## Local Development Setup

### Prerequisites

Before setting up the database, ensure you have:

- Docker Desktop or Docker Engine installed (version 20.10+)
- Docker Compose (version 1.29+ or Docker Compose V2)
- At least 1GB of free disk space for the MySQL container and data

### Initial Setup

1. **Copy the environment configuration:**
   ```bash
   cp docker/.env.example docker/.env
   ```

2. **Review and customize the `docker/.env` file** (optional):
   ```bash
   # Edit with your preferred editor
   nano docker/.env
   # or
   vim docker/.env
   ```

3. **Start the MySQL container:**
   ```bash
   docker-compose -f docker/docker-compose.yml up -d mysql
   ```

4. **Wait for the container to be healthy:**
   ```bash
   # Check status
   docker-compose -f docker/docker-compose.yml ps
   
   # Watch logs
   docker-compose -f docker/docker-compose.yml logs -f mysql
   ```

   You should see output indicating the database is ready:
   ```
   [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.x'
   ```

## Configuration

### Environment Variables

The database is configured using the following environment variables in `docker/.env`:

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MYSQL_ROOT_PASSWORD` | Root user password | - | Yes |
| `MYSQL_DATABASE` | Database name to create | `job_board` | Yes |
| `MYSQL_USER` | Application user name | `job_board_user` | Yes |
| `MYSQL_PASSWORD` | Application user password | - | Yes |
| `MYSQL_PORT` | Host port mapping | `3306` | No |

### Connection Configuration

#### From NestJS API

Configure your TypeORM or database module:

```typescript
// Example TypeORM configuration
TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [/* your entities */],
  synchronize: false, // Use migrations in production
  logging: process.env.NODE_ENV === 'development',
})
```

#### Connection String Format

```
mysql://[username]:[password]@[host]:[port]/[database]
```

Example:
```
mysql://job_board_user:devpassword123@localhost:3306/job_board
```

### Port Conflicts

If port 3306 is already in use on your machine:

1. Change `MYSQL_PORT` in `docker/.env`:
   ```
   MYSQL_PORT=3307
   ```

2. Restart the container:
   ```bash
   docker-compose -f docker/docker-compose.yml down
   docker-compose -f docker/docker-compose.yml up -d mysql
   ```

## Volume Management and Data Persistence

### Understanding Docker Volumes

The MySQL container uses a **named volume** (`mysql_data`) to persist data. This ensures your database survives container restarts and rebuilds.

### Volume Operations

**List volumes:**
```bash
docker volume ls | grep mysql_data
```

**Inspect volume:**
```bash
docker volume inspect job-board_mysql_data
```

**Backup volume location:**
The volume is typically stored at:
- **macOS/Linux**: `/var/lib/docker/volumes/job-board_mysql_data/_data`
- **Windows**: `\\wsl$\docker-desktop-data\data\docker\volumes\job-board_mysql_data\_data`

### Fresh Start (Delete All Data)

⚠️ **Warning**: This will permanently delete all database data.

```bash
# Stop and remove containers, and remove volumes
docker-compose down -v

# Restart with fresh database
docker-compose up -d mysql
```

## Backup and Restore

### Create a Backup

**Method 1: Using mysqldump from host**
```bash
docker-compose -f docker/docker-compose.yml exec mysql mysqldump \
  -u root \
  -p${MYSQL_ROOT_PASSWORD} \
  ${MYSQL_DATABASE} \
  > backup_$(date +%Y%m%d_%H%M%S).sql
```

**Method 2: Using mysqldump inside container**
```bash
docker-compose -f docker/docker-compose.yml exec mysql sh -c 'mysqldump \
  -u root \
  -p"$MYSQL_ROOT_PASSWORD" \
  "$MYSQL_DATABASE"' \
  > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore from Backup

```bash
# Restore a specific backup file
docker-compose -f docker/docker-compose.yml exec -T mysql mysql \
  -u root \
  -p${MYSQL_ROOT_PASSWORD} \
  ${MYSQL_DATABASE} \
  < backup_20231120_153045.sql
```

### Automated Backups

For production environments, consider setting up automated backups using:
- Cron jobs with mysqldump
- AWS RDS automated backups
- Third-party backup solutions

## Production Deployment

### Transition from Docker to Managed Database

For production, we recommend using a managed database service:

1. **AWS RDS for MySQL**
   - Automated backups and point-in-time recovery
   - Automatic failover and high availability
   - Automatic software patching

2. **Google Cloud SQL**
   - Integrated with Google Cloud Platform
   - Automatic replication and backups
   - Easy scaling

3. **Azure Database for MySQL**
   - Built-in high availability
   - Automatic backups
   - Advanced security features

### Using Docker Compose in Production

If you must use Docker in production:

1. **Create a production docker-compose file:**
   ```bash
   cp docker/docker-compose.yml docker/docker-compose.prod.yml
   ```

2. **Modify for production:**
   ```yaml
   services:
     mysql:
       image: mysql:8.0
       restart: always  # Change from unless-stopped
       environment:
         # Use Docker secrets or environment variables from CI/CD
       volumes:
         - /opt/mysql_data:/var/lib/mysql  # Use absolute path
       networks:
         - internal  # Internal network only
   ```

3. **Security considerations:**
   - Never expose MySQL port directly to the internet
   - Use strong passwords (20+ characters)
   - Enable MySQL SSL/TLS
   - Regularly update the MySQL image
   - Implement network isolation

### Environment Variables in Production

Use secure secret management:
- **AWS**: AWS Secrets Manager or Parameter Store
- **Google Cloud**: Secret Manager
- **Azure**: Key Vault
- **Kubernetes**: Kubernetes Secrets
- **Docker**: Docker Secrets (Swarm mode)

## Troubleshooting

### Container Won't Start

**Check logs:**
```bash
docker-compose -f docker/docker-compose.yml logs mysql
```

**Common issues:**
- Port already in use: Change `MYSQL_PORT` in `docker/.env`
- Permission issues: Ensure Docker has proper permissions
- Corrupted volume: Remove volume with `docker-compose -f docker/docker-compose.yml down -v`

### Cannot Connect to Database

**Verify container is running:**
```bash
docker-compose -f docker/docker-compose.yml ps
```

**Check container health:**
```bash
docker-compose -f docker/docker-compose.yml exec mysql mysqladmin ping -h localhost -u root -p
```

**Test connection from container:**
```bash
docker-compose -f docker/docker-compose.yml exec mysql mysql -u root -p
```

**Test connection from host:**
```bash
mysql -h 127.0.0.1 -P 3306 -u job_board_user -p
```

### Slow Performance

**Check container resources:**
```bash
docker stats job-board-mysql
```

**Increase Docker resources:**
- macOS/Windows: Docker Desktop → Settings → Resources
- Recommended: 2+ CPUs, 2+ GB RAM

**Optimize MySQL configuration:**
Add to `docker/docker-compose.yml` under the mysql service:
```yaml
command:
  - --default-authentication-plugin=mysql_native_password
  - --max_connections=200
  - --innodb_buffer_pool_size=256M
```

### Data Loss After Restart

If data is lost after container restart:

1. **Check if volume still exists:**
   ```bash
   docker volume ls | grep mysql_data
   ```

2. **Verify volume mount:**
   ```bash
   docker inspect job-board-mysql | grep -A 5 "Mounts"
   ```

3. **Ensure you're not using `-v` flag:**
   ```bash
   # Wrong (deletes volumes):
   docker-compose -f docker/docker-compose.yml down -v
   
   # Correct (preserves volumes):
   docker-compose -f docker/docker-compose.yml down
   ```

### Authentication Issues

If you get "Access denied" errors:

1. **Verify credentials in `docker/.env`**

2. **Reset user password:**
   ```bash
   docker-compose -f docker/docker-compose.yml exec mysql mysql -u root -p
   ```
   ```sql
   ALTER USER 'job_board_user'@'%' IDENTIFIED BY 'new_password';
   FLUSH PRIVILEGES;
   ```

3. **Check user permissions:**
   ```sql
   SHOW GRANTS FOR 'job_board_user'@'%';
   ```

### Connection Timeout

**Check health status:**
```bash
docker-compose -f docker/docker-compose.yml exec mysql mysqladmin ping
```

**Increase healthcheck timeout in `docker/docker-compose.yml`:**
```yaml
healthcheck:
  interval: 10s
  timeout: 10s  # Increase from 5s
  retries: 5
  start_period: 60s  # Increase from 30s
```

## Additional Resources

- [MySQL 8.0 Documentation](https://dev.mysql.com/doc/refman/8.0/en/)
- [Docker MySQL Official Image](https://hub.docker.com/_/mysql)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

## Support

For project-specific database issues, please:
1. Check this documentation first
2. Review existing GitHub issues
3. Create a new issue with:
   - Error messages
   - Docker and Docker Compose versions
   - Steps to reproduce
   - Relevant logs (`docker-compose -f docker/docker-compose.yml logs mysql`)

