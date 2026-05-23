import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
import os

# =========================
# LOAD MODEL PATHS
# =========================

BASE_DIR = os.path.dirname(

    os.path.abspath(__file__)

)

MODEL_PATH = os.path.join(

    BASE_DIR,

    "keras_model.h5"

)

LABEL_PATH = os.path.join(

    BASE_DIR,

    "labels.txt"

)

# =========================
# LOAD AI MODEL
# =========================

model = load_model(

    MODEL_PATH

)

# =========================
# LOAD LABELS
# =========================

with open(

    LABEL_PATH,

    "r"

) as f:

    labels = [

        line.strip()

        for line in f.readlines()

    ]

# =========================
# PREDICT IMAGE FUNCTION
# =========================

def predict_image(image_path):

    try:

        # OPEN IMAGE

        image = Image.open(

            image_path

        ).convert("RGB")

        # RESIZE IMAGE

        image = image.resize(

            (224, 224)

        )

        # CONVERT TO ARRAY

        image_array = np.asarray(

            image

        )

        # NORMALIZE

        normalized_image_array = (

            image_array.astype(np.float32) / 127.5

        ) - 1

        # CREATE INPUT DATA

        data = np.ndarray(

            shape=(1, 224, 224, 3),

            dtype=np.float32

        )

        data[0] = normalized_image_array

        # PREDICT

        prediction = model.predict(

            data,

            verbose=0

        )

        # GET BEST RESULT

        index = np.argmax(

            prediction

        )

        class_name = labels[index]

        confidence_score = float(

            prediction[0][index]

        )

        print(

            "AI Prediction:",

            class_name,

            confidence_score

        )

        return (

            class_name,

            confidence_score

        )

    except Exception as e:

        print(

            "AI ERROR:",

            str(e)

        )

        return (

            "Clean",

            0.0

        )