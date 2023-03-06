from .views import getProducts,getProduct
from django.urls import path
from . import views
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
    
# )
from .views import MyTokenObtainPairView

urlpatterns = [
    path('api/users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/users/login/', views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/register/', views.registerUser, name='register'),
    path('api/users/profile/', views.getUserProfile,name="user-profile"),
    path('api/users/profile/update/', views.updateUserProfile,name="user-profile-update"),
    path('api/users', views.getUsers, name="users"),
    path('api/products', views.getProducts,name="products"),
    path('api/products/<int:pk>', views.getProduct,name="product"),
    
    
]