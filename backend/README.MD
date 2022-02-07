[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

![Python checks](https://github.com/C2H2-UF/ScheduGator/actions/workflows/greetings.yml/badge.svg)


# Backend

Welcome to the backend! we are using the django framework and the python language.

## Running locally for the first time

Make sure you have python 3 installed, for this specific installation, we are using
`python 3.8`

**Please note these instructions were written for a unix based system windows may differ.**

1. create a python environment with the command `python3 -m venv ./venv`
> **You may need to replace python3 with the keyword you use to run python and may need to set the vers**

2. activate the virtual environment with the command `source ./location/to/venv/bin/activate`

3. install all the required libraries using `pip install -r requirements.txt`

4. start up the backend server with `python manage.py runserver`

> YAY, you did it! Everything should be running at `localhost:8000`

## Before you push

> Please, please, please do not ignore this section before pushing. You will fail some checks on github actions if you ignore this section.

1. format everything using `black ./dir/to/backend`

## tutorials used 
1. [setting up django](https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react)