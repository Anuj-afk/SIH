from django.db import models

# Create your models here.




class Busstop(models.Model):
    name = models.CharField(max_length=100)
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
    
