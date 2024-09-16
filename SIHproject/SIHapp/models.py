from django.db import models

# Create your models here.




class Busstop(models.Model):
    name = models.CharField(max_length=100, unique=True)
    longitude = models.FloatField()
    latitude = models.FloatField()

    def __str__(self):
        return self.name
class Route(models.Model):
    name = models.CharField(max_length=100)
    id = models.IntegerField(primary_key=True, unique=True)
    bus_quantity = models.IntegerField(default=100)
    bus_stop = models.ManyToManyField(Busstop, blank=True)
    
    def __str__(self):
        return self.name

class Bus(models.Model):
    id = models.IntegerField(primary_key=True)
    plate = models.CharField(max_length=100)
    ac = models.BooleanField(default=False)
    route = models.ForeignKey(Route, on_delete = models.CASCADE, blank=True, null=True)

    def __str__(self):
        return str(self.id)
