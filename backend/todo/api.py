from rest_framework.generics import ListAPIView
from rest_framework import permissions, status
from rest_framework.response import Response

from .serializers import TasksSerializer
from .paginations import CustomPagination


class GetTasksAPI(ListAPIView):
    permission_classes = {
        permissions.AllowAny,
    }

    course_converter = {
        'asc': '',
        'desc': '-',
    }

    serializer_class = TasksSerializer
    pagination_class = CustomPagination
    model = serializer_class.Meta.model

    def get_queryset(self):
        sort_by = self.request.GET.get('by', 'username')
        sort_course = self.course_converter.get(
            self.request.GET.get('order', 'asc'))

        return self.model.objects.all().order_by(f'{sort_course}{sort_by}')

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
