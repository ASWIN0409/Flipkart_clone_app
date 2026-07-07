from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated 
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Cart, CartItem, Order, OrderItem
from .serializers import ProductSerializer, CartSerializer, UserSerializer, RegisterSerializer


# get complete products data view
@api_view(['GET'])
def get_product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# get product individual data view
@api_view(['GET'])
def get_product_details(request, pk):
    product = get_object_or_404(Product, pk=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data, status=status.HTTP_200_OK)

# get cart items view
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data, status=status.HTTP_200_OK)

# add items to cart view
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    product = Product.objects.get(id=product_id)

    cart, created = Cart.objects.get_or_create(user=request.user)
    item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        item.quantity += 1
        item.save()
    return Response({'message': 'Product added to cart', 'cart': CartSerializer(cart).data})

# remove items from cart view
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    item_id = request.data.get('item_id')
    item = CartItem.objects.get(id=item_id)
    
    cart = item.cart
    item.delete()
    return Response({'message': 'Item removed from cart','cart': CartSerializer(cart).data})

# Update quantity view
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cart_item(request):
    item_id = request.data.get('item_id')
    quantity = int(request.data.get('quantity'))

    item = CartItem.objects.get(id=item_id)
    cart = item.cart

    if quantity <= 0:
        item.delete()
    else:
        item.quantity = quantity
        item.save()
    return Response({"message": "Cart updated", "cart": CartSerializer(cart).data})

# Create Order view
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    try:
        name = request.data.get('name')
        phone = request.data.get('phone')
        address = request.data.get('address')
        payment_method = request.data.get('payment_method', 'COD')

        if not phone.isdigit() or len(phone) < 10:
            return Response({'message': 'Invalid phone number'}, status=status.HTTP_400_BAD_REQUEST)

        cart, created = Cart.objects.get_or_create(user=request.user)

        if not cart or not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)
        
        total = sum(float(item.product.price) * item.quantity for item in cart.items.all())

        # Create order
        order = Order.objects.create(user=request.user, name=name, phone=phone, address=address, payment_method=payment_method, total_amount=total)

        # Create order items
        for item in cart.items.all():
            OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity, price=item.product.price)

        # Clear cart
        cart.items.all().delete()

        return Response({
            'message': 'Order Placed Successfully !',
            'order_id': order.id,
        }, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


# Registration View - 
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user_serializer = UserSerializer(user)
        return Response(user_serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

