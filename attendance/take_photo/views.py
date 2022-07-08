from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from urllib import request as request_urllib
from PIL import Image
from django.http import HttpResponse
from django.shortcuts import redirect
import os
import cv2


# Create your views here.


def takePhoto(request):
    return render(request, 'take_photo/index.html')


@csrf_exempt
def savePhoto(request):
    username = request.POST['username']

    isMobile = request.POST['is_mobile']

    # username = "oknguyen"

    if not os.path.exists('take_photo/static/take_photo/training_dataset/{}/'.format(username)):
        os.makedirs(
            'take_photo/static/take_photo/training_dataset/{}/'.format(username))

    html = '<center><p>Đã nhập ảnh cho nhân viên <h1>' + \
        username + '</h1> thành công!</p></center>'

    for x in range(20):
        data_uri = request.POST['data_uri_' + str(x)]

        nameImage = 'take_photo/static/take_photo/training_dataset/' + \
            username + '/' + str(x) + '.png'

        convertDataURItoImage(data_uri, nameImage, 260, 260, isMobile)

    # return HttpResponse(html)
    return render(request, 'take_photo/index.html', {"username": username})


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
