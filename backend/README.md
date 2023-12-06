# XKCD Server

This is a [Django REST Framework](https://www.django-rest-framework.org/) project to scrape and serve XKCD image metadata.

To run the development server:
```bash
# create the virtual environment and install dependencies
python -m venv xkcd_env
source xkcd_env/bin/activate
pip install -r requirements.txt

# start the server
python manage.py runserver
```