# Docker

## initial setup

1. Go install [docker](https://docs.docker.com/install/)

2. Go to the [docker compose](https://docs.docker.com/compose/install/)

3. Make sure Docker is running and installed properly

> A quick `docker ps` should show you that it is running

## Running the backend

1. Run `docker-compose up ` to start the backend.

> you may need to add the `--build` flag to build the backend if the dockerfile has been updated.

2. docker is now running and you should see a link to go to (http://localhost:8000)[http://localhost:8000]

3. run `docker-compose down -v` to stop the backend.