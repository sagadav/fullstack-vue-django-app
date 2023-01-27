from .default import *
DEBUG = True
ALLOWED_HOSTS = [
    "127.0.0.1"
]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'OPTIONS': {
            'read_default_file': str(BASE_DIR / '../my.cnf')
        }
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / '../db.sqlite3',
#     }
# }