from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import AttendanceRecord
from .serializers import AttendanceRecordSerializer
from django.db import IntegrityError
from hrms_backend.auth_decorators import jwt_required

# @method_decorator(csrf_exempt, name='dispatch')  # for testing through postman
class AttendanceRecordListCreateView(APIView):
# to get list of all attendance records

    @jwt_required   
    def get(self, request):
        attendance_records = AttendanceRecord.objects.all()
        serializer = AttendanceRecordSerializer(attendance_records, many=True)
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)

# to create a new attendance record
    @jwt_required
    def post(self, request):
        serializer = AttendanceRecordSerializer(data=request.data)

        if serializer.is_valid():
            try:
                serializer.save()
                return Response({
                    "success": True,
                    "message": "Attendance record added successfully",
                    "data": serializer.data
                }, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response({
                    "success": False,
                    "message": "Duplicate attendance entry for this employee/date"
                }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "success": False,
            "message": "Validation error",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)



class AttendanceByEmployeeView(APIView):
    @jwt_required
    def get(self, request, employee_id):
        records = AttendanceRecord.objects.filter(employee__employee_id=employee_id)
        serializer = AttendanceRecordSerializer(records, many=True)

        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)
