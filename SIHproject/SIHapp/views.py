from django.shortcuts import render
from .models import Busstop, Route, Bus
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
        route = Route.objects.create(name = body['name'], id = body['id'], bus_quantity = body['quantity'])
        for stop in body["stops"]:
            bs = Busstop.objects.filter(name = stop)
            route.bus_stop.add(*bs)

        assbus(body['quantity'], body['id'])
        data = {"added": True}
        return JsonResponse(data)
    except Exception as e:
        print(f"Error: {e}")
        data = {"added": False, "error": str(e)}
        return JsonResponse(data)


@csrf_exempt
def assbus(quantity, rid):
    try:
        q = int(quantity)
        buses = Bus.objects.filter(route = None)
        rou = Route.objects.get(id = rid)
        if len(buses) >= q:
            for bus in buses[:q]:
                bus.route = rou
                bus.save()
        else:
            print("not enough buses")
    except Exception as e:
        print(e)

@csrf_exempt
def addbus(request):
    try:

        body = json.loads(request.body)
        if body['ac'] == "on":
            Bus.objects.create(id = body['id'], plate= body['plate'], ac = True)
        else:
            Bus.objects.create(id = body['id'], plate= body['plate'], ac = False)
        data = {"added": True}
        return JsonResponse(data)
    except Exception as e:
        print(e)
        if "UNIQUE constraint failed" in str(e):
            data = {"added": False, "error": "Unique"}
        else:
            data = {"added": False, "error": str(e)}
        return JsonResponse(data)

@csrf_exempt
def get_stop(request):
    try: 
        stops = Busstop.objects.all().values('name')
        stops1 = Busstop.objects.all().values('longitude')
        stops2 = Busstop.objects.all().values('latitude')
        data = {"stops": list(stops),"lat": list(stops2), "lng": list(stops1), "obtained": True}
        return JsonResponse(data)
    except Exception as e:
        data = {"obtained": False, "error": str(e)}
        return JsonResponse(data)

def get_route_id(request):
    try:
        route = Route.objects.all().values('id')
        data = {"route": list(route), 'obtained': True}
        print(route)
        return JsonResponse(data)
    except:
        data = {'obtained': False}
        return JsonResponse(data)

def get_route(request):
    try:
        body = json.loads(request.body)
        route = Route.objects.filter(id = body['id']).values('id', 'name', 'bus_stop')

        data = {"route": list(route), 'obtained': True}
        return JsonResponse(data)
    except:
        data = {'obtained': False}
        return JsonResponse(data)
