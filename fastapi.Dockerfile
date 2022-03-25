FROM python:3.10
WORKDIR /code
COPY ./backend/requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./backend/main.py /code/main.py
COPY ./backend/models.py /code/models.py
# TODO Figure out if this is needed...
# COPY ./backend/test_main.py /code/test_main.py
# CMD ["pytest"]
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]