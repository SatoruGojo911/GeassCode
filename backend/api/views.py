from django.shortcuts import render
from django.http import JsonResponse
from api.models import User
from rest_framework import status

from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404






class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        user_profile = request.user.username
        userId = request.user.id
        name = user_profile if user_profile else 'Anonymous'  # Assuming 'full_name' is the username
        return Response({'name': name,'userId': userId}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        full_name = request.data.get('full_name')
        bio = request.data.get('bio')
        image = request.data.get('image')

        user_profile = request.user.profile
        if full_name:
            user_profile.full_name = full_name
        if bio:
            user_profile.bio = bio
        if image:
            user_profile.image = image

        user_profile.save()

        data = f'Profile Saved'
        return Response({'response': data}, status=status.HTTP_200_OK)
    
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Assuming you want only authenticated users to access this endpoint
def userProfile(request):
    if request.method == 'GET':
        user_profile = request.user.profile
        fullname = user_profile.full_name if user_profile else 'Anonymous'
        bio = user_profile.bio
        return Response({'fullname': fullname,'bio' : bio }, status=status.HTTP_200_OK)
    


## gemeni ##
from django.conf import settings
import google.generativeai as genai
import json

genai.configure(api_key=settings.GEMINI_API_KEY)


@api_view(['POST'])
def generate_response(request):
    try:
        data = json.loads(request.body)
        prompt = data.get("prompt", "")
        code_snippet = data.get("code", "")
        
        if not prompt:
            return JsonResponse({"error": "No prompt provided"}, status=400)
        
        full_prompt = f"{prompt}\n\nHere is the code snippet:\n\n{code_snippet}" if code_snippet else prompt
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(full_prompt)
        
        return JsonResponse({"response": response.text})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request"}, status=400)