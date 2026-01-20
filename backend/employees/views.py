from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Employee
from .serializers import EmployeeSerializer
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.db import IntegrityError
# from django.views.decorators.csrf import csrf_exempt

# @method_decorator(csrf_exempt, name='dispatch') for testing through postman
@method_decorator(login_required, name='dispatch')
class EmployeeListCreateView(APIView):
    # to get the List of all employees
    def get(self, request):
        employees = Employee.objects.all()
        print("Retrieved employees:", employees)
        serializer = EmployeeSerializer(employees, many=True)
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    # to create a new employee
    def post(self, request):
       serializer = EmployeeSerializer(data=request.data)
       if serializer.is_valid():
           try:
               serializer.save()
               return Response({
                   "success": True,
                   "message": "Employee added successfully",
                   "data": serializer.data
               }, status=status.HTTP_201_CREATED)
           except IntegrityError:
               return Response({
                   "success": False,
                   "message": "Employee ID or Email already exists"
               }, status=status.HTTP_400_BAD_REQUEST)
       return Response({
           "success": False,
           "message": "Validation error",
           "errors": serializer.errors
       }, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(login_required, name='dispatch')
class EmployeeDeleteView(APIView):
    # to delete an employee
    def delete(self, request, employee_id):
        try:
            employee = Employee.objects.get(employee_id=employee_id)
            employee.delete()
            return Response({
                "success": True,
                "message": "Employee deleted successfully"
            }, status=status.HTTP_204_NO_CONTENT)
        except Employee.DoesNotExist:
            return Response({
                "success": False,
                "message": "Employee not found"
            }, status=status.HTTP_404_NOT_FOUND)

