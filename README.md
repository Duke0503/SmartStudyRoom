<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).



# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/learn): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# Lateral Sitting Posture Detection using YOLOv5

<div align="center">
  <img src="https://raw.githubusercontent.com/itakurah/SittingPostureDetection/main/data/images/posture.webp" width="80%" height="80%" alt="Sitting Posture"> 

  *Source: https://www.youtube.com/watch?v=HNgTLml_Zi4*
</div>



This GitHub repository contains a posture detection program that utilizes [YOLOv5](https://github.com/ultralytics/yolov5), an advanced object detection algorithm, to detect and predict lateral sitting postures. The program is designed to analyze the user's sitting posture in real-time and provide feedback on whether the posture is good or bad based on predefined criteria. The goal of this project is to promote healthy sitting habits and prevent potential health issues associated with poor posture.

Key Features:

* YOLOv5: The program leverages the power of YOLOv5, which is an object detection algorithm, to
  accurately detect the user's sitting posture from a webcam.
* Real-time Posture Detection: The program provides real-time feedback on the user's sitting posture, making it suitable
  for use in applications such as office ergonomics, fitness, and health monitoring.
* Good vs. Bad Posture Classification: The program uses a pre-trained model to classify the detected posture as good or
  bad, enabling users to improve their posture and prevent potential health issues associated with poor sitting habits.
* Open-source: The program is released under an open-source license, allowing users to access the source code, modify
  it, and contribute to the project.

### Built With

![Python]

# Getting Started

### Prerequisites

* Python 3.9.x

### Installation  
If you have an NVIDIA graphics processor, you can activate GPU acceleration by installing the GPU requirements. Note that without GPU acceleration, the inference will run on the CPU, which can be very slow.  
#### Windows  
  
1. `git clone https://github.com/itakurah/SittingPostureDetection.git`  
2. `python -m venv venv`  
3. `.\venv\scripts\activate.bat`  
##### Default/NVIDIA GPU support:  
4.  `pip install -r ./requirements_windows.txt` **OR** `pip install -r ./requirements_windows_gpu.txt`

#### Linux  
  
1. `git clone https://github.com/itakurah/SittingPostureDetection.git`  
2. `python3 -m venv venv`  
3. `source venv/bin/activate`
##### Default/NVIDIA GPU support:  
4. `pip3 install -r requirements_linux.txt` **OR** `pip3 install -r requirements_linux_gpu.txt`


### Run the program

`python application.py <optional: model_file.pt>` **OR** `python3 application.py <optional: model_file.pt>`

The default model is loaded if no model file is specified.

# Model
The program uses a custom trained [YOLOv5s](https://github.com/ultralytics/yolov5/blob/79af1144c270ac7169553d450b9170f9c60f92e4/models/yolov5s.yaml) model that is trained on about 160 images per class for 146 epochs. The model has two classes: sitting_good and sitting_bad to give feedback about the current sitting posture.
## Architecture
The architecture that is used for the model is the standard YOLOv5 architecture:

<img src="https://raw.githubusercontent.com/itakurah/SittingPostureDetection/main/data/images/architecture.png" width=75% height=75%>



*Fig. 1: The architecture of the YOLOv5 model, which consists of three parts: (i) Backbone: CSPDarknet, (ii) Neck: PANet, and (iii) Head: YOLO Layer. The data are initially input to CSPDarknet for feature extraction and subsequently fed to PANet for feature fusion. Lastly, the YOLO Layer outputs the object detection results (i.e., class, score, location, size)*

## Model Results
The validation set contains 80 images (40 sitting_good, 40 sitting_bad). The results are as follows:
|Class|Images|Instances|Precision|Recall|mAP50|mAP50-95|
|--|--|--|--|--|--|--|
|all| 80 | 80 | 0.87 | 0.939 | 0.931 | 0.734 |
|sitting_good| 40 |  40| 0.884 | 0.954 | 0.908 |0.744  |
|sitting_bad| 80 | 40 | 0.855 | 0.925 | 0.953 | 0.724 |

Detailed graphs:

F1-Confidence Curve:

<img src="https://raw.githubusercontent.com/itakurah/SittingPostureDetection/main/data/images/F1_curve.png" width=50% height=50%>

Precision-Confidence Curve:

<img src="https://raw.githubusercontent.com/itakurah/SittingPostureDetection/main/data/images/P_curve.png" width=50% height=50%>

Recall-Confidence Curve:

<img src="https://raw.githubusercontent.com/itakurah/SittingPostureDetection/main/data/images/R_curve.png" width=50% height=50%>

Precision-Recall Curve:

<img src="https://raw.githubusercontent.com/itakurah/SittingPostureDetection/main/data/images/PR_curve.png" width=50% height=50%>

Confusion Matrix:

<img src="https://raw.githubusercontent.com/itakurah/SittingPostureDetection/main/data/images/confusion_matrix.png" width=50% height=50%>

# About

This project was developed by [Niklas Hoefflin](https://github.com/itakurah), [Tim Spulak](https://github.com/T-Lak),
Pascal Gerber & Jan Bösch and supervised by [André Jeworutzki](https://github.com/AndreJeworutzki)
and Jan Schwarzer as part of the [Train Like A Machine](https://csti.haw-hamburg.de/project/TLAM/) module.

# Sources

 - Jocher, G. (2020). YOLOv5 by Ultralytics (Version 7.0) [Computer software]. https://doi.org/10.5281/zenodo.3908559
 - Fig. 1: TraCon: A novel dataset for real-time traffic cones detection using deep learning - Scientific Figure on ResearchGate. Available from: https://www.researchgate.net/figure/The-architecture-of-the-YOLOv5-model-which-consists-of-three-parts-i-Backbone_fig1_360834230 [accessed 24 Jun, 2023]

# License

This project is licensed under the MIT License. See the LICENSE file for details.

<!-- MARKDOWN LINKS & IMAGES -->

[Python]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white

