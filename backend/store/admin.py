from django.contrib import admin
from .models import Category, Product, Brand, SubCategory

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Brand)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id','name')
    ordering = ('id',)