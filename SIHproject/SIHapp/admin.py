from django.contrib import admin
from .models import Busstop, Route
# Register your models here.

class BusstopInline(admin.StackedInline):
    model = Busstop
    extra = 5
# CarModelAdmin class


class BusstopAdmin(admin.ModelAdmin):
    fields = ["name", "longitude", "latitude"]
# CarMakeAdmin class with CarModelInline


class RouteAdmin(admin.ModelAdmin):
    fields = ['name', 'id']
    inlines = [BusstopInline]
# Register models here


admin.site.register(Route, RouteAdmin)

admin.site.register(Busstop, BusstopAdmin)