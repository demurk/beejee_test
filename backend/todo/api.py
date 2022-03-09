from rest_framework.generics import ListAPIView, GenericAPIView, RetrieveAPIView
from rest_framework import permissions, status
from rest_framework.response import Response
from knox.models import AuthToken

from .serializers import TasksSerializer, LoginSerializer, UserSerializer
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

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def patch(self, request, *args, **kwargs):
        if request.user.is_superuser:
            updated_object = self.model.objects.get(id=request.data.get('id'))
            serializer = self.serializer_class(
                updated_object, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


class LoginAPI(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        return Response({
            "is_authenticated": user.is_authenticated,
            "is_superuser": user.is_superuser,
            "token": AuthToken.objects.create(user)[1],
        })


class UserAPI(GenericAPIView):
    serializer_class = UserSerializer

    def get(self, *args):
        user = self.request.user
        # return user

        return Response({
            "is_authenticated": user.is_authenticated,
            "is_superuser": user.is_superuser,
            #"token": (lambda x: self.request.auth.pk if x else None)(self.request.auth),
        })
