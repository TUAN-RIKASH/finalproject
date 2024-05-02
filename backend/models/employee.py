from mongoengine import Document, StringField, DateField

class Employee(Document):
    name = StringField(required=True)
    date_of_birth = DateField(required=True)
    department = StringField(required=True) 
    address = StringField(required=True)
    contact_number = StringField(required=True)
