[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

![Python checks](https://github.com/C2H2-UF/ScheduGator/actions/workflows/greetings.yml/badge.svg)


# Backend

Welcome to the backend! we are using the Fastapi library and the Python language.

## Running locally for the first time

1. See the docker [README.md](docker/README.MD) file.
## Contributing

### Prerequisites

Python 3.10+ installed

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

5. Run unit tests with `pytest`

> Tip: make sure you are using a venv with requirements.txt installed in the previous topic.

### Updating the backend dependencies

1. Run `pip freeze > requirements.txt`

> Make sure you test this to make sure nothing breaks and there arent any unused dependencies in here.

### tutorials used 
<!-- 1 is no longer used for django -->
1. [setting up django](https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react)
