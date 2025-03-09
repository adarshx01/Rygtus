from ultralytics import YOLO

## Loading the model Once 
model_path = "content/runs/classify/train/weights/best.pt"
model = YOLO(model_path)
## Model Loaded

## Mapping of Classes to Herb Names
mappings =  {0: 'Aloevera',
 1: 'Amla',
 2: 'Amruta_Balli',
 3: 'Arali',
 4: 'Ashoka',
 5: 'Ashwagandha',
 6: 'Avacado',
 7: 'Bamboo',
 8: 'Basale',
 9: 'Betel',
 10: 'Betel_Nut',
 11: 'Brahmi',
 12: 'Castor',
 13: 'Curry_Leaf',
 14: 'Doddapatre',
 15: 'Ekka',
 16: 'Ganike',
 17: 'Gauva',
 18: 'Geranium',
 19: 'Henna',
 20: 'Hibiscus',
 21: 'Honge',
 22: 'Insulin',
 23: 'Jasmine',
 24: 'Lemon',
 25: 'Lemon_grass',
 26: 'Mango',
 27: 'Mint',
 28: 'Nagadali',
 29: 'Neem',
 30: 'Nithyapushpa',
 31: 'Nooni',
 32: 'Pappaya',
 33: 'Pepper',
 34: 'Pomegranate',
 35: 'Raktachandini',
 36: 'Rose',
 37: 'Sapota',
 38: 'Tulasi',
 39: 'Wood_sorel'}
## Mapping Done


## Function to Classify Herb
def classify_herb(image_path):
    results = model(image_path,conf=0.75)
    cls = results[0].probs.top1
    packet = {"Herb": mappings[cls],
              "Properties" : ""}
    if cls == 28 :
        with open("Nagadali.txt") as f:
            packet["Properties"] = f.read()
    elif cls == 38 :
        with open("Tulasi.txt") as f:
            packet["Properties"] = f.read()
    else:
        with open("dummy.txt") as f:
            packet["Properties"] = f.read()        

    return packet

