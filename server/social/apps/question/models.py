from django.db import models
from social.apps.user.models import User


# from social.apps.answer.models import Answer

class Question(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    viewed_by = models.ManyToManyField(
        User,
        related_name="+",
        blank=True
    )
    liked_by = models.ManyToManyField(
        User,
        related_name="+",
        blank=True
    )
    disliked_by = models.ManyToManyField(
        User,
        related_name="+",
        blank=True
    )
    user = models.ForeignKey(
        User,
        related_name="questions",
        on_delete=models.CASCADE
    )

    @property
    def views_count(self):
        return self.viewed_by.count()

    @property
    def likes(self):
        return self.liked_by.count()

    @property
    def dislikes(self):
        return self.disliked_by.count()

    @property
    def answers_count(self):
        return self.answers.count()

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-pub_date"]
