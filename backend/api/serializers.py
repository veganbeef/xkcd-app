from rest_framework import serializers
from .models import Comic


class ComicSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comic
        fields = ['id', 'upload_date', 'title', 'alt_text', 'url']
