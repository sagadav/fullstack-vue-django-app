from rest_framework_simplejwt.serializers import (TokenObtainPairSerializer)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
from rest_framework import (serializers, generics, status)
from social.apps.user.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True, required=True)
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["username", "password", "confirm_password"]

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    # permission_classes = (AllowAny, )
    serializer_class = RegisterSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        token = CustomTokenObtainPairSerializer(data=request.data)
        token.is_valid()

        headers = self.get_success_headers(serializer.data)
        serializer = CustomTokenObtainPairSerializer(data=request.data)
        return Response(
            token.validated_data,
            status=status.HTTP_201_CREATED, headers=headers
        )
