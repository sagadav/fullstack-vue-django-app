from rest_framework import viewsets
from rest_framework.permissions import (IsAuthenticated, IsAdminUser, AllowAny)
from .models import (Question)
from .serializers import (
    QuestionSerializer,
    QuestionDetailSerializer,
    QuestionCreateSerializer)


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    permission_classes = (AllowAny,)

    def get_serializer_class(self):
        if self.action == 'create':
            return QuestionCreateSerializer
        if self.action == 'retrieve':
            return QuestionDetailSerializer
        return QuestionSerializer
