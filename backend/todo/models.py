from django.db import models


class Todo(models.Model):
    email = models.EmailField()
    username = models.CharField(max_length=30)
    description = models.CharField(max_length=150)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.username} [{self.email}] {self.description}'
