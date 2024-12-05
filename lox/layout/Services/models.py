from django.db import models

# ============================ SERVICES ============================


class Service(models.Model):
    class Meta:
        db_table = "components_services"

    icon = models.CharField(max_length=255, blank=True)
    heading = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="images/classes/", blank=True, null=True)

    def __str__(self):
        return self.heading
