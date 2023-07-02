import functions_framework
import json
from google.cloud import datastore

# Register an HTTP function with the Functions Framework
@functions_framework.http
def add_vote(request):
    data = request.args
    client = datastore.Client()
    
    if request.method == 'POST' and data:
        #Traitement des données
        task1 = datastore.Entity(client.key("candidat"))
        task1.update({"nom": "Jeannot", "vote": 5})

        task2 = datastore.Entity(client.key("candidat"))
        task2.update({"nom": "Polo", "vote": 5})

        client.put_multi([task1, task2])

        return json.dumps(data), 200, {'Content-Type': 'application/json'}
    else:
        return json.dumps([{'error' : 'unauthorized'}]), 401, {'Content-Type': 'application/json'}
  
@functions_framework.http
def list_candidat(request):
    client = datastore.Client()
    query = client.query(kind="candidat")
    results = list(query.fetch())
    
    return json.dumps(results), 200, {'Content-Type': 'application/json'}


