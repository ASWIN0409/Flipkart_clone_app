from django.contrib import admin
from .models import Category, Product, Brand, SubCategory, Order, OrderItem

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Brand)
admin.site.register(Order)
admin.site.register(OrderItem)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id','name')
    ordering = ('id',)