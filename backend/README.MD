[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

![Python checks](https://github.com/C2H2-UF/ScheduGator/actions/workflows/greetings.yml/badge.svg)


# Backend

Welcome to the backend! we are using the Fastapi library and the Python language.

## Running locally for the first time

1. See the [README.md](docker/README.MD) file for instructions on how to download Docker and Docker Compose.

2. Make sure you have Docker AND Docker compose installed and running.

3. Run `docker-compose up` to start the backend.

4. navigate to [http://localhost:80](http://localhost:80) in your browser.

> Docs are available at [http://localhost:80/docs](http://localhost:80/docs)

5. You should see the backend running.

6. hit Crtl + C to stop the backend.

7. You can run `docker-compose down -v` to stop the backend.
## Contributing

## Prerequisites

Python 3.8+ installed

1. See [virtual environments](https://docs.python.org/3/library/venv.html) for creating a virtual environment

2. Create a virtual environment and activate the virtual environment.

> DO NOT COMMIT THE VIRTUAL ENVIRONMENT TO GITHUB.

3. Install the dependencies using `pip install -r requirements.txt`

4. Run `uvicorn main:app --reload` to start the backend.

5. Have fun writing code :)

<!-- WIP -->
6. Test your code. 

### Before pushing

> Please, please, please do not ignore this section before pushing. You will fail checks on github actions if you ignore this section.

1. Make sure you have the latest version of the code.

2. Make sure you are not committing any secrets or sensitive data.

3. DO NOT COMMIT THE PYTHON VIRTUAL ENVIRONMENT.

3. format everything using `python3 -m black ./dir/to/backend`

4. check flake8 compliance with `python3 -m flake8`

> Tip: make sure you are using a venv with requirements.txt installed in the previous topic.

### Updating the backend dependencies

1. Run `pip freeze > requirements.txt`

2. run `pipenv install`

3. Navigate to the Docker [readme file](docker/README.md) and make sure you didn't break anything.

## tutorials used 
<!-- 1 is no longer used for django -->
1. [setting up django](https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react)