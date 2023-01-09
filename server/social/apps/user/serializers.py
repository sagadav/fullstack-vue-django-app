from rest_framework import (serializers)
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "follows", "followed_by", "username", "bio"]
