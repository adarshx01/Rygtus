from flask import Flask, request, jsonify
import cv2
import os
import base64
import io
from PIL import Image
import tempfile
from ultralytics import YOLO

app = Flask(__name__)

# Load the model once
model_path = "tongue-model/content/runs/detect/train/weights/best.pt"
model = YOLO(model_path)

def crop(image, box):
    cropped_image = image[int(box[1]):int(box[3]), int(box[0]):int(box[2])]
    return cropped_image

def crop_tongue(image):
    results = model(image, conf=0.75)
    if results and results[0].boxes.xyxy.shape[0] > 0:
        return crop(image, results[0].boxes.xyxy[0])
    return None

def encode_image(image):
    _, buffer = cv2.imencode(".jpg", image)
    return base64.b64encode(buffer).decode("utf-8")

@app.route('/process_image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    
    image_file = request.files['image']
    temp_image_path = os.path.join(tempfile.gettempdir(), image_file.filename)
    image_file.save(temp_image_path)
    
    image = cv2.imread(temp_image_path)
    cropped_image = crop_tongue(image)
    os.remove(temp_image_path)
    
    if cropped_image is None:
        return jsonify({'message': 'failure','image':None}), 400
    encoded_image = encode_image(cropped_image)
    return jsonify({'message': 'success', 'image': encoded_image}), 200
## Only for testing purpose##############################################################################

# def test():
#     img = cv2.imread("tongue.png")
#     cropped_image = crop_tongue(img)
#     cv2.imwrite("cropped_tongue.jpg", cropped_image)
#     print("Image processed successfully")
# test()    

############################################################################################################


if __name__ == '__main__':
    app.run(host= "0.0.0.0",port=10000,debug=True)
