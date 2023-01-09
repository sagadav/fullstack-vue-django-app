from rest_framework import (viewsets)
from rest_framework.response import Response
from rest_framework.decorators import (action)
from social.apps.user.models import (User)
from .serializers import (UserSerializer)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # def get_permissions(self):
    #     if self.action == 'list':
    #         permission_classes = [AllowAny]
    #     else:
    #         permission_classes = [IsAdminUser]
    #     return [permission() for permission in permission_classes]

    @action(detail=True, methods=['post'])
    def follow(self, request, pk=None):
        return Response({"request": request.data})
