from django.shortcuts import render
import os
from face_recognition.face_recognition_cli import image_files_in_folder
import face_recognition
from sklearn.preprocessing import LabelEncoder
from sklearn.svm import SVC
import cv2
import numpy as np
import pickle
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt
from matplotlib import rcParams

# Create your views here.


def train(request):
    # if request.user.username != 'admin':
    #     return redirect('not-authorised')

    training_dir = 'take_photo/static/take_photo/training_dataset'

    count = 0
    for person_name in os.listdir(training_dir):
        curr_directory = os.path.join(training_dir, person_name)
        if not os.path.isdir(curr_directory):
            continue
        for _ in image_files_in_folder(curr_directory):
            count += 1

    X = []
    y = []
    i = 0

    for person_name in os.listdir(training_dir):
        print(str(person_name))
        curr_directory = os.path.join(training_dir, person_name)
        if not os.path.isdir(curr_directory):
            continue
        for imageFiles in image_files_in_folder(curr_directory):
            print(str(imageFiles))
            image = cv2.imread(imageFiles)
            try:
                X.append((face_recognition.face_encodings(image)[0]).tolist())

                y.append(person_name)
                i += 1
            except:
                print("removed")
                os.remove(imageFiles)

    targets = np.array(y)
    encoder = LabelEncoder()
    encoder.fit(y)
    y = encoder.transform(y)
    X1 = np.array(X)
    print("shape: " + str(X1.shape))
    np.save('face_recognition_data/classes.npy', encoder.classes_)
    svc = SVC(kernel='linear', probability=True)
    svc.fit(X1, y)
    svc_save_path = "face_recognition_data/svc.sav"
    with open(svc_save_path, 'wb') as f:
        pickle.dump(svc, f)

    vizualize_Data(X1, targets)

    return render(request, "machine_learning/index.html")


def vizualize_Data(embedded, targets, ):
    X_embedded = TSNE(n_components=2).fit_transform(embedded)

    for i, t in enumerate(set(targets)):
        idx = targets == t
        plt.scatter(X_embedded[idx, 0], X_embedded[idx, 1], label=t)

    plt.legend(bbox_to_anchor=(1, 1))
    rcParams.update({'figure.autolayout': True})
    plt.tight_layout()
    plt.savefig('take_photo/static/take_photo/img/training_visualisation.png')
    plt.close()
    