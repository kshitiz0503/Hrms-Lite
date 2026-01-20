from django.middleware.csrf import get_token
from django.http import JsonResponse

def get_csrf(request):
    return JsonResponse({"csrfToken": get_token(request)})
