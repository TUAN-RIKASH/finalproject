from mongoengine import Document, ReferenceField, DateTimeField, StringField
from models.employee import Employee

class VoiceEmotion(Document):
    employee = ReferenceField(Employee, required=True)
    date = DateTimeField(required=True)
    status = StringField(required=True)
