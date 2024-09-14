from django.shortcuts import render
from .models import Busstop, Route
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
@csrf_exempt
def add_stop(request):
    try:
        body = json.loads(request.body)
        Busstop.objects.create(name = body['name'], longitude= body['long'], latitude = body['lat'])
        data = {"added": True}
        return JsonResponse(data)
    except:
        data = {"added": False}
        return JsonResponse(data)

@csrf_exempt
def add_route(request):
    try:
        body = json.loads(request.body)
        print(body['id'])
        route = Route.objects.create(name = body['name'], id = body['id'], bus_quantity = body['quantity'])
        for stop in body["stops"]:
            bs = Busstop.objects.filter(name = stop)
            route.bus_stop.add(*bs)
        
        data = {"added": True}
        return JsonResponse(data)
    except Exception as e:
        print(f"Error: {e}")
        data = {"added": False}
        return JsonResponse(data)

@csrf_exempt
def get_stop(request):
    try: 
        stops = Busstop.objects.all().values('name')
        data = {"stops": list(stops), "obtained": True}
        return JsonResponse(data)
    except:
        data = {"obtained": False}

        return JsonResponse(data)
