from django.urls import path
from . import views

urlpatterns = [
    path('product/', views.get_product_list),
    path('product/<int:pk>/', views.get_product_details),
    path('cart/', views.get_cart),
    path('cart/add/', views.add_to_cart),
    path('cart/remove/', views.remove_from_cart),
]