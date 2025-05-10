FROM python:3.10

WORKDIR /app
COPY . .


RUN python -m venv /opt/venv


RUN . /opt/venv/bin/activate && pip install --no-cache-dir -r requirements.txt


ENV PATH="/opt/venv/bin:$PATH"

EXPOSE 5004
CMD ["python", "app.py"]
