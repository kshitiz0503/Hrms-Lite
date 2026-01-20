from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

class LoginView(APIView):
    def post(self, request):
        user = authenticate(
            username=request.data.get("username"),
            password=request.data.get("password")
        )

        if user is None:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        response = Response({
            "access": str(refresh.access_token),
            "user": user.username
        })

        # set refresh token in cookie
        response.set_cookie(
            key="refresh",
            value=str(refresh),
            httponly=True,
            secure=False,  # True on production
            samesite='None'
        )

        return response


class RefreshTokenView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh")

        if refresh_token is None:
            return Response({"error": "Refresh token missing"}, status=400)

        try:
            refresh = RefreshToken(refresh_token)
            access = refresh.access_token
            return Response({"access": str(access)})
        except:
            return Response({"error": "Invalid refresh token"}, status=401)


class LogoutView(APIView):
    def post(self, request):
        response = Response({"message": "Logged out"})
        response.delete_cookie("refresh")
        return response