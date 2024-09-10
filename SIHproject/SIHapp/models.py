from django.db import models

# Create your models here.


class Route(models.Model):
    name = models.CharField(max_length=100)
    id = models.IntegerField(primary_key=True, unique=True)

class Busstop(models.Model):
    name = models.CharField(max_length=100)
    longitude = models.DecimalField(decimal_places=10, max_digits=10)
    latitude = models.DecimalField(decimal_places=10, max_digits=10)
    bus = models.ForeignKey(Route, on_delete=models.CASCADE)

    