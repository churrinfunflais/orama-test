import random
from locust import HttpUser, between, task
auth_header = {'x-api-key': 'VG1Ga2NqQmtaWFpCY0dreU1ESXhWbWx1YmxOMVkyTmxlbm8'}

class AwesomeUser(HttpUser):
    wait_time = between(1, 5)
    
    @task
    def get_post(self):
        self.client.request(
            method='POST',
            url='/',
            headers=auth_header,
            data={"items":[{"id":"0","sku":"1","ean":"12421-mod","refId":"IdSku234","unitMultiplier":1,"measurementUnit":"un","targetPrice":50.5,"itemPrice":100,"quantity":1,"discountPrice":0,"dockId":"18128b6","freightPrice":13.33,"brandId":"2000001"}],"totals":[{"id":"Items","name":"Total de los items","value":140100},{"id":"Discounts","name":"Total de descuentos","value":0},{"id":"Shipping","name":"Costo total del envío","value":10000},{"id":"Tax","name":"Costo total del cambio","value":0}],"shippingDestination":{"country":"MEX","state":"Ciudad de México","city":"MIGUEL HIDALGO","postalCode":"11000"},"orderFormId":"8a9dab85acc54b40aed5fc6e52d604d6","salesChannel":"1"}
        )