# Pull a base image
FROM python:3.8-slim-buster

# Set environment variables

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1 
# Create a working directory for the django project
WORKDIR /code
# Copy requirements to the container
COPY /backend/requirements.txt /code/requirements.txt
# Install the requirements to the container
RUN pip install -r requirements.txt
# Install virtualenv
RUN pip install virtualenv
# create a virtual environment
RUN python3 -m venv /code/venv
# Activate the virtual environment
RUN . venv/bin/activate
# Open a port on the container
EXPOSE 8000