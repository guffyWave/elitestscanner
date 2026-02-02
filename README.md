### Submission of Eli Health Technical Test: Test Strip Scanner

### Screenshots App

### Scan Test Strip

<img src="/screenshots/app_one.png" alt="Scan Test Strip" width="300" height="500">

### Strips History Page

<img src="/screenshots/app_three.png" alt="Strips History Page" width="300" height="500">

### Captured Test Strip

<img src="/screenshots/app_two.png" alt="Captured Test Strip" width="300" height="500">

### prerequisites -

Node v20.19.4

npm v10.8.2

Yarn: 1.22.22

Docker v29.1.5

Java v17.0.18

### About -

The project stack Node+Express+

### Steps -

Download the monrepo to find backend and mobile sub directory. Preferably open with VS Code

Backend run -

- cd backend
- npm install
- docker-compose up --build

This will setup the backend which can be accessed over local host by curl , browser , or postman http cleint

http://localhost:3000/ will return return json object of simple message with author name and contact

Upload image with postman or curl
curl -X POST http://localhost:3000/api/test-strips/upload \
 -F "image=@/path/to/sample.jpg"

Get All Uploaded Test Strips
http://localhost:3000/api/test-strips

### Running Tests

Hello App Test Suit : App is runnig and accessible can be tested by running -

npm test hello.test.ts

QR Scan Test Suit : Test suit containts different variants of QR codes to be executed by

npm test qrService.test.ts

### API Documentation

- http://localhost:3000/ Welcome

Response :  
{
"message": "Hello from eli-test-scanner backend!",
"version": "#1 SMP Thu Jan 15 14:58:53 UTC 2026",
"developer": "Gufran Khurshid",
"phone": "+1 437-322-8442",
"emailId": "khurshid.gufran@gmail.com"
}

- Get Test Strip Submissions

      /api/test-strips

Response :

    {
        "data": [
            {
                "id": "d513f8b7-51b3-48db-8818-f2957fd92b28",
                "qr_code": "",
                "status": "INVALID",
                "thumbnail_path": "uploads/thumbnails/1770007288150_thumb.jpg",
                "created_at": "2026-02-02T04:41:28.215Z",
                "original_image_path": "/app/uploads/1770007287159-934771364.jpg",
                "image_size": 2523398,
                "image_dimensions": "1129x1500",
                "error_message": "No QR code was found in the image"
            }
        ],
        "page": 1,
        "limit": 10,
        "total": 89,
        "totalPages": 9
    }

- Get One Test Strip

      /api/test-strips/d513f8b7-51b3-48db-8818-f2957fd92b28

Response

    {
        "id": "d513f8b7-51b3-48db-8818-f2957fd92b28",
        "qr_code": "",
        "original_image_path": "/app/uploads/1770007287159-934771364.jpg",
        "thumbnail_path": "uploads/thumbnails/1770007288150_thumb.jpg",
        "image_size": 2523398,
        "image_dimensions": "1129x1500",
        "status": "INVALID",
        "error_message": "No QR code was found in the image",
        "created_at": "2026-02-02T04:41:28.215Z"
    }

- Upload Test Strips

      /api/test-strips/upload

Response :

    {
        "id": "254a0c97-2eb9-4d6d-9607-6ce58ae23be0",
        "status": "EXPIRED",
        "qrCode": "ELI-2021-10",
        "qrCodeValid": "EXPIRED",
        "quality": "NA",
        "processedAt": "2026-02-02T06:29:35.004Z",
        "message": "The QR code has expired"
    }

The uploaded image will be uploaded to /uploads folder and processed will be in /uploads/thumbnails folder

### Building Mobile App

Navigate to /mobile folder in VS Code the execute

    npm install

    cd ios

    pod install

    cd ..

### Runing Android App

Make sure to enable Android USB debugging in Physical real android device . And backend is up and responding

**Your device must be able to connect with local server**

Apps can't connect with localhost, so IP address has to be be set in the mobile app client code .

Execute 'ipconfig getifaddr en0' to get local machine IP addess where the backend server is running. Many times firewall or the Wifi router doesn't let Phone connect with local server. So , in order to by pass this , disconnect from Wifi and create a Hotspot on Mobile and connect Machine with Hotspot.

Then search in project 'API_BASE_URL' and change the IP adrress to the obtained

adb reverse tcp:8081 tcp:8081

Now execute

    npx react-native run-android

App will be running . Make sure to increase the screen brightess if thw QR is located on digital screen .

### Screenshots Backend API

![UploadAPI](/screenshots/uploadapi.png 'Upload API')
![UploadAPI](/screenshots/getallteststrips.png 'Get All Test Strips')
![UploadAPI](/screenshots/getoneteststrip.png 'Get One Test Strip')
