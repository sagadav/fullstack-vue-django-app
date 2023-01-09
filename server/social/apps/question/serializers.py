from rest_framework import (serializers)
from social.apps.user.serializers import (UserSerializer)
from social.apps.user.models import (User)
from social.apps.answer.serializers import (AnswerSerializer)
from .models import Question


class QuestionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    views_count = serializers.ReadOnlyField()
    likes = serializers.ReadOnlyField()
    dislikes = serializers.ReadOnlyField()
    answers_count = serializers.ReadOnlyField()

    class Meta:
        model = Question
        fields = [
            "id",
            "user",
            "views_count",
            "likes",
            "dislikes",
            "title",
            "pub_date",
            "content",
            "answers_count"
        ]


class QuestionCreateSerializer(QuestionSerializer):

    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True)


class QuestionDetailSerializer(QuestionSerializer):
    answers = AnswerSerializer(read_only=True, many=True)

    class Meta(QuestionSerializer.Meta):
        fields = QuestionSerializer.Meta.fields + ["answers"]
