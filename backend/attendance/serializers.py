from rest_framework import serializers
from .models import AttendanceRecord
from employees.models import Employee

class AttendanceRecordSerializer(serializers.ModelSerializer):
    employee_id = serializers.CharField(write_only=True)
    employee_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = AttendanceRecord
        fields = ['employee_id', 'employee', 'employee_name', 'date', 'status']
        extra_kwargs = {
            'employee': {'read_only': True}
        }

    def get_employee_name(self, obj):
        return str(obj.employee)

    def create(self, validated_data):
        emp_id = validated_data.pop('employee_id')

        try:
            employee = Employee.objects.get(employee_id=emp_id)
        except Employee.DoesNotExist:
            raise serializers.ValidationError({"employee_id": "Invalid employee ID"})

        return AttendanceRecord.objects.create(employee=employee, **validated_data)
