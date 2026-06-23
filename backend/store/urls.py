from django.urls import path
from . import views

urlpatterns = [
    path('product/', views.get_product_list),
    path('product/<int:pk>/', views.get_product_details),
]