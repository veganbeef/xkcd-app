import os
import django
import requests
from requests.adapters import HTTPAdapter, Retry


def format_xkcd_url(comic_number=None):
    comic_id_string = str(comic_number) + '/' if comic_number else ''
    return f'https://xkcd.com/{comic_id_string}info.0.json'


# TODO: restructure package so api/ is root and move this script inside api/management/commands to use with manage.py
# TODO: pass retry count as optional arg using django management
def main():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")
    django.setup()
    from api.models import Comic

    session = requests.Session()
    retries = Retry(total=5, backoff_factor=1, status_forcelist=[500, 502, 503, 504])
    session.mount('https://', HTTPAdapter(max_retries=retries))

    def save_comic_metadata(comic_number=None):
        comic_url = format_xkcd_url(comic_number)
        response = session.get(comic_url)

        if response.status_code == 404 and comic_number == 404:
            return
        elif response.status_code != 200:
            raise Exception(f'failed to get data: {response.status_code}')

        data = response.json()
        new_comic = Comic(
            id=data["num"],
            upload_date=f'{data["year"]}-{data["month"]}-{data["day"]}',
            title=data["title"],
            alt_text=data["alt"],
            url=data["img"]
        )
        new_comic.save()

        return new_comic

    latest_comic = save_comic_metadata()

    for i in range(latest_comic.id - 1, 0, -1):
        save_comic_metadata(i)


if __name__ == '__main__':
    main()
