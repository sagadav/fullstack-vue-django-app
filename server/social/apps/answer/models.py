from django.db import models
from social.apps.user.models import User
from social.apps.question.models import Question


class Answer(models.Model):
    content = models.TextField()
    user = models.ForeignKey(
        User,
        related_name="+",
        on_delete=models.CASCADE
    )
    question = models.ForeignKey(
        Question,
        related_name="answers",
        on_delete=models.CASCADE
    )
