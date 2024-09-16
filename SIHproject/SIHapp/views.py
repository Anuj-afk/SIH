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
        print(body['id'])
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
    buses = Bus.objects.filter(route = None)
    rou = Route.objects.filter(id = rid)
    if len(bus) >= quantity:
        for bus in buses[:quantity]:
            bus.route = rou
            bus.save()
    else:
        print("not enough buses")


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
        data = {"stops": list(stops), "obtained": True}
        return JsonResponse(data)
    except Exception as e:
        data = {"obtained": False, "error": str(e)}
        return JsonResponse(data)
