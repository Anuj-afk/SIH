from . import views
from django.urls import path

app_name = 'SIHapp'

urlpatterns = [
    path(route='addstop', view=views.add_stop, name="addstop"),
    path(route='addroute', view=views.add_route, name="addroute"),
    path(route='getstops', view=views.get_stop, name="getstops"),
    path(route='addbus', view=views.addbus, name="addbus"),
    path(route='get_route_id', view=views.get_route_id, name="routeid"),
    path(route='get_route', view=views.get_route, name="route"),    
]