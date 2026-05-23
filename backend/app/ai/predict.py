import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image

# LOAD MODEL

model = load_model("app/ai/keras_model.h5")

# LOAD LABELS

with open("app/ai/labels.txt", "r") as f:

    labels = [line.strip() for line in f.readlines()]

# =========================
# PREDICT IMAGE
# =========================

def predict_image(image_path):

    image = Image.open(image_path).convert("RGB")

    image = image.resize((224, 224))

    image_array = np.asarray(image)

    normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1

    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

    data[0] = normalized_image_array

    prediction = model.predict(data)

    index = np.argmax(prediction)

    class_name = labels[index]

    confidence_score = prediction[0][index]

    return class_name, float(confidence_score)