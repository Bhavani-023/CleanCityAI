from PIL import Image
import numpy as np

def predict_image(image_path):

    try:

        image = Image.open(image_path).convert("RGB")

        image = image.resize((224, 224))

        image_array = np.array(image)

        # SIMPLE GARBAGE DETECTION LOGIC

        brightness = np.mean(image_array)

        variance = np.var(image_array)

        # DETECT POSSIBLE GARBAGE

        if variance > 1000 and brightness < 200:

            return "Garbage", 0.95

        else:

            return "Clean", 0.20

    except Exception as e:

        print("Prediction Error:", e)

        return "Clean", 0.0