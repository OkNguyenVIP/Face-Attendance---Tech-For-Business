from django.shortcuts import render
from django.http import HttpResponse
from enter_staff.models import Present, ControlCountdown
from django.views.decorators.csrf import csrf_exempt
from urllib import request as request_urllib
from PIL import Image
import dlib
import pickle
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import numpy as np
import cv2
from imutils import face_utils
import datetime

from PIL import Image
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from imutils import face_utils
import time
import os
import face_recognition
from face_recognition.face_recognition_cli import image_files_in_folder
import pickle
from sklearn.preprocessing import LabelEncoder
from sklearn.svm import SVC
import numpy as np
import matplotlib as mpl
from sklearn.manifold import TSNE
# import datetime
import pandas as pd
import matplotlib.pyplot as plt
from pandas.plotting import register_matplotlib_converters
from matplotlib import rcParams
import math

from urllib import request as request_urllib
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def faceAttendence(request):
    controlCountdown = ControlCountdown.objects.all()
    return render(request, 'face_attendance/index.html',
                  {"photoCountdown": controlCountdown[0].photoCountdown,
                   "informationCountdown": 0})


@csrf_exempt
def getPictures(request):
    data_uri = request.POST['data_uri']

    isMobile = request.POST['is_mobile']

    controlCountdown = ControlCountdown.objects.all()

    nameImage = 'face_attendance/static/face_attendance/img/image_in.png'
    convertDataURItoImage(data_uri, nameImage, 260, 260, isMobile)
    detector = dlib.get_frontal_face_detector()
    dlib.shape_predictor(
        'face_recognition_data/shape_predictor_68_face_landmarks.dat')
    svc_save_path = "face_recognition_data/svc.sav"

    with open(svc_save_path, 'rb') as f:
        svc = pickle.load(f)
    encoder = LabelEncoder()
    encoder.classes_ = np.load('face_recognition_data/classes.npy')

    faces_encodings = np.zeros((1, 128))
    no_of_faces = len(svc.predict_proba(faces_encodings)[0])
    count = dict()
    present = dict()
    log_time = dict()
    start = dict()
    for i in range(no_of_faces):
        count[encoder.inverse_transform([i])[0]] = 0
        present[encoder.inverse_transform([i])[0]] = False

    frame = cv2.imread(
        'face_attendance/static/face_attendance/img/image_in.png')
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = detector(gray_frame, 0)
    user_accuracy = ""
    user_complete = ""
    id = ""
    for face in faces:
        print("INFO : inside for loop")
        (x, y, w, h) = face_utils.rect_to_bb(face)

        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 1)

        (pred, prob) = predict(frame, svc)

        if pred != [-1]:
            person_name = encoder.inverse_transform(np.ravel([pred]))[0]
            pred = person_name
            if count[pred] == 0:
                start[pred] = time.time()
                count[pred] = count.get(pred, 0) + 1

            if count[pred] == 4 and (time.time() - start[pred]) > 1.2:
                count[pred] = 0
            else:
                present[pred] = True
                log_time[pred] = datetime.datetime.now()
                count[pred] = count.get(pred, 0) + 1
                print(pred, present[pred], count[pred])
                user_accuracy = "Nhân viên " + str(pred) + " vào ca làm."
                user_complete = str(pred)

                # id = str(int(pred[0]))

            cv2.putText(frame, str(person_name) + str(prob), (x + 6, y + h - 6),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5,
                        (0, 255, 0), 1)
        else:
            print("Không hợp khuôn mặt")
            user_accuracy = "Không hợp khuôn mặt"

    # update_attendance_in_db_in(present)

    print("user_accuracy: " + user_accuracy)

    utc7 = datetime.timezone(datetime.timedelta(hours=7))
    now = datetime.datetime.now(utc7)
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")

    list = Present.objects.all()

    for x in list:
        if user_complete == str(x.user) and str(x.user).__len__() > 0:
            return render(request, 'face_attendance/index.html',
                          {'fullname': x.fullname,
                           'number': x.number,
                           'times': dt_string,
                           "photoCountdown": controlCountdown[0].photoCountdown,
                           "informationCountdown": controlCountdown[0].informationCountdown})
    else:
        if user_accuracy == "":
            return render(request, 'face_attendance/index.html',
                        {'fullname': user_accuracy,
                        "photoCountdown": controlCountdown[0].photoCountdown,
                        "informationCountdown": 0})

        return render(request, 'face_attendance/index.html',
                      {'fullname': user_accuracy,
                       "photoCountdown": controlCountdown[0].photoCountdown,
                       "informationCountdown": controlCountdown[0].informationCountdown})


# Chuyển dữ liệu từ Data Uri thành Image và tiến hành cắt
def convertDataURItoImage(dataUri, nameImage, xCropping, yCropping, isMobile):
    # Đọc data uri
    with request_urllib.urlopen(dataUri) as response:
        data = response.read()

    # Mở tệp tin ảnh và tiến hành ghi đè dữ liệu
    with open(nameImage, "wb") as f:
        f.write(data)

    if isMobile:
        # Mở file đã được ghi đè
        imgOld = cv2.imread(nameImage)

        # Đổi kích thước ngang thành dọc
        imgOld = cv2.resize(imgOld, (480, 640))

        # Lưu ảnh đã thay đổi kích thước
        cv2.imwrite(nameImage, imgOld)

    # Mở file đã được resize
    imgOld = Image.open(nameImage, "r")

    # Lấy trung tâm ảnh
    xCenter = imgOld.width / 2
    yCenter = imgOld.height / 2

    # Từ trung tâm ảnh cộng trừ để tạo hình chứng giữa
    x1 = xCenter - xCropping / 2
    y1 = yCenter - yCropping / 2
    x2 = xCenter + xCropping / 2
    y2 = yCenter + yCropping / 2

    # Cắt ảnh theo tỉ lệ
    imageCropped = imgOld.crop((x1, y1, x2, y2))

    # Lưu ảnh đã cắt
    imageCropped.save(nameImage, 'PNG')


def predict(face_aligned, svc, threshold=0.7):
    np.zeros((1, 128))
    try:
        x_face_locations = face_recognition.face_locations(face_aligned)
        faces_encodings = face_recognition.face_encodings(
            face_aligned, known_face_locations=x_face_locations)
        if len(faces_encodings) == 0:
            return [-1], [0]
    except:
        return [-1], [0]

    prob = svc.predict_proba(faces_encodings)
    result = np.where(prob[0] == np.amax(prob[0]))
    if prob[0][result[0]] <= threshold:
        return [-1], prob[0][result[0]]

    return result[0], prob[0][result[0]]
