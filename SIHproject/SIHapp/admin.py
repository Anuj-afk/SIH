from django.contrib import admin
from .models import Busstop, Route, Bus
# Register your models here.

class BusstopInline(admin.StackedInline):
    model = Busstop
    extra = 5



class BusstopAdmin(admin.ModelAdmin):
    fields = ["name", "longitude", "latitude"]



class BusAdmin(admin.ModelAdmin):
    list_display = ['id', 'plate', 'ac', 'route']

class RouteAdmin(admin.ModelAdmin):
    list_display = ['name', 'id', 'bus_quantity']
    filter_horizontal = ['bus_stop']
# Register models here

admin.site.register(Busstop, BusstopAdmin)
admin.site.register(Bus, BusAdmin)
admin.site.register(Route, RouteAdmin)

