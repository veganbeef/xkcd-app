from random import sample
from rest_framework import viewsets, generics
from rest_framework.pagination import PageNumberPagination
from django_filters import rest_framework as filters
from .models import Comic
from .serializers import ComicSerializer


# this also defaults to descending by id
class StandardPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 100


class ComicFilter(filters.FilterSet):
    class Meta:
        model = Comic
        fields = {
            'title': ['exact', 'icontains'],
            'alt_text': ['exact', 'icontains'],
            'upload_date': ['exact', 'contains'],
        }


class ComicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Comic.objects.all()
    serializer_class = ComicSerializer
    pagination_class = StandardPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ComicFilter


class RandomComicList(generics.ListAPIView):
    serializer_class = ComicSerializer

    def get_queryset(self):
        # fetch 9 random comics
        comics = Comic.objects.all()
        return sample(list(comics), 9)
