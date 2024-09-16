from django.shortcuts import render
from .models import Busstop, Route
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError


# Create your views here.
@csrf_exempt
def add_stop(request):
    try:
        body = json.loads(request.body)
        Busstop.objects.create(name = body['name'], longitude= body['long'], latitude = body['lat'])
        data = {"added": True}
        return JsonResponse(data)
    except Exception as e:
        if "UNIQUE constraint failed" in str(e):
            data = {"added": False, "error": "Unique"}
        else:
            data = {"added": False, "error": str(e)}
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
        data = {"added": False, "error": str(e)}
        return JsonResponse(data)

@csrf_exempt
def get_stop(request):
    try: 
        stops = Busstop.objects.all().values('name')
        stops1 = Busstop.objects.all().values('longitude')
        stops2 = Busstop.objects.all().values('latitude')
        data = {"stops": list(stops),"lat": list(stops2), "lng": list(stops1), "obtained": True}
        print(list(stops1))
        print(list(stops2))
        return JsonResponse(data)
    except Exception as e:
        data = {"obtained": False, "error": str(e)}
        return JsonResponse(data)
