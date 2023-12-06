from django.db import models


class Comic(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    upload_date = models.DateField()
    title = models.CharField(max_length=255)
    alt_text = models.CharField(max_length=255)
    url = models.URLField()
