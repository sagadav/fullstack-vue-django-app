from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)
from .views import (CustomTokenObtainPairView, RegisterView)

urlpatterns = [
    path(
        'token/verify/',
        TokenVerifyView.as_view(),
        name='token_verify'),
    path(
        'token/refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh'),
    path(
        'login/',
        CustomTokenObtainPairView.as_view(),
        name='token_obtain_pair'),
    path(
        'register/',
        RegisterView.as_view()),
]
