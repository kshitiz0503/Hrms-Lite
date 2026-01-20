from django.urls import path
from .views import AttendanceRecordListCreateView, AttendanceByEmployeeView
urlpatterns = [
    path('', AttendanceRecordListCreateView.as_view()),
    path('<str:employee_id>/', AttendanceByEmployeeView.as_view(), name='attendance-by-employee'),
]
