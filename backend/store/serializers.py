from rest_framework import serializers
from .models import Product, Category, SubCategory, Brand

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    SubCategory = SubCategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    class Meta:
        model = Product
        fields = '__all__'



