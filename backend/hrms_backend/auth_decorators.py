from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed

def jwt_required(view_func):
    def wrapper(self, request, *args, **kwargs):
        jwt_auth = JWTAuthentication()

        try:
            user, token = jwt_auth.authenticate(request)
            request.user = user
        except Exception:
            raise AuthenticationFailed('Authentication credentials were not provided / invalid')

        return view_func(self, request, *args, **kwargs)

    return wrapper
