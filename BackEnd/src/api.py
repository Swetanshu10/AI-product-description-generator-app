from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_cors import cross_origin
from moviepy import VideoFileClip
import os
from pytubefix import YouTube
from google import genai
from google.genai import types
import time

app = Flask(__name__)
api = Api(app)
arguments = reqparse.RequestParser()
client = genai.Client(api_key="")  # Gemini API key

arguments.add_argument(
    "Benefits",
    type=str,
    required=True,
    location="form",
    help="Please explain the benefits of using your product",
)

arguments.add_argument(
    "SampleText",
    type=str,
    required=True,
    location="form",
    help="Sample Text argument is missing",
)

arguments.add_argument(
    "Tone",
    type=str,
    required=True,
    location="form",
    help="Tone argument is missing",
)

arguments.add_argument(
    "Style",
    type=str,
    required=True,
    location="form",
    help="Style argument is missing",
)

arguments.add_argument(
    "Languages",
    type=str,
    required=True,
    location="form",
    help="Select the languages for description",
    action="append",
)


def checkFile(videoPath):
    clip = VideoFileClip(videoPath)
    duration = clip.duration
    format = videoPath.split(".")[-1]

    if duration > 120 or format.lower() != "mp4":
        return False
    return True


def checkURL(url):
    ytVideo = YouTube(url)
    duration = ytVideo.length
    if duration > 120:
        return False
    return True


def checkTone(requestedTone):
    toneList = ["Formal", "Informal", "Persuasive"]

    if requestedTone != "" and requestedTone not in toneList:
        return False
    return True


def checkStyle(requestedStyle):
    styleList = ["Creative", "Technical", "Problem/Solution oriented"]

    if requestedStyle != "" and requestedStyle not in styleList:
        return False
    return True


def checkLanguages(languageOptions):
    langList = [
        "English",
        "Arabic",
        "Afrikaans",
        "Assamese",
        "Bengali",
        "Croatian",
        "Danish",
        "Dutch",
        "French",
        "German",
        "Greek",
        "Gujarati",
        "Hindi",
        "Indonesian",
        "Italian",
        "Japanese",
        "Korean",
        "Kannada",
        "Malayalam",
        "Marathi",
        "Odia",
        "Punjabi",
        "Polish",
        "Portuguese",
        "Russian",
        "Spanish",
        "Swedish",
        "Thai",
        "Tamil",
        "Telugu",
    ]

    for lang in languageOptions:
        if lang not in langList:
            return False
    return True


def responseGenerator(video, benefits, sampleText, tone, style, languages):
    videoFile = client.files.upload(file=video)
    while not videoFile.state or videoFile.state.name != "ACTIVE":
        time.sleep(5)
        videoFile = client.files.get(name=videoFile.name)

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[
            videoFile,
            "Summarize the product shown in the video such that the summary can be used for generating its description",
        ],
    )
    summary = response.text

    if sampleText != "":
        response21 = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f"Generate a product description for a product that has details like summary: {summary},benefits of product: {benefits},Copy the tone and style of the sample text in the generated description, sample text: {sampleText},target languages: {languages}. Keep the response well formatted and easy to read",
        )
        return response21.text
    else:
        response22 = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f"Generate a product description for a product that has details like summary: {summary},benefits of product: {benefits},keep tone as: {tone} and style as: {style} in the description,target languages: {languages}. Keep the response well formatted and easy to read",
        )
        return response22.text


def responseGenerator2(videoURL, benefits, sampleText, tone, style, languages):
    response = client.models.generate_content(
        model="models/gemini-2.0-flash",
        contents=types.Content(
            parts=[
                types.Part(file_data=types.FileData(file_uri=videoURL)),
                types.Part(
                    text="Summarize the product shown in the video such that the summary can be used for generating its description"
                ),
            ]
        ),
    )
    summary = response.text

    if sampleText != "":
        response21 = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f"Generate a product description for a product that has details like summary: {summary},benefits of product: {benefits},Copy the tone and style of the sample text in the generated description, sample text: {sampleText}, target languages: {languages}. Keep the response well formatted and easy to read",
        )
        return response21.text
    else:
        response22 = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f"Generate a product description for a product that has details like summary: {summary},benefits of product: {benefits},keep tone as: {tone} and style as: {style} in the description, target languages: {languages}. Keep the response well formatted and easy to read",
        )
        return response22.text


class ResponseClass(Resource):
    @cross_origin(origins="http://localhost:1234")
    def post(self):
        args = arguments.parse_args()
        videoFile = request.files.get("Video")

        if not videoFile:
            videoLink = request.form.get("Video")

            if not videoLink:
                return {"message": "Please provide a video file or youtube link"}, 400
            else:
                if checkURL(videoLink) == False:
                    return {
                        "message": "Please provide a public youtube video url of max 2 minutes duration"
                    }, 400
                if checkTone(args["Tone"]) == False:
                    return {
                        "message": "Please select a tone fron the available options"
                    }, 400
                if checkStyle(args["Style"]) == False:
                    return {
                        "message": "Please select a style from the available options"
                    }, 400
                if checkLanguages(args["Languages"]) == False:
                    return {
                        "message": "Please select languages from the available options"
                    }, 400

                generatedDescription = responseGenerator2(
                    videoLink,
                    args["Benefits"],
                    args["SampleText"],
                    args["Tone"],
                    args["Style"],
                    args["Languages"],
                )
                return {"message": generatedDescription}, 201

        else:
            os.makedirs("uploads", exist_ok=True)
            path = os.path.join("uploads", videoFile.filename)
            videoFile.save(path)

            if checkFile(path) == False:
                return {
                    "message": "Upload video in MP4 format with maximum 2 minutes duration"
                }, 400
            if checkTone(args["Tone"]) == False:
                return {
                    "message": "Please select a tone fron the available options"
                }, 400
            if checkStyle(args["Style"]) == False:
                return {
                    "message": "Please select a style from the available options"
                }, 400
            if checkLanguages(args["Languages"]) == False:
                return {
                    "message": "Please select languages from the available options"
                }, 400

            generatedDescription = responseGenerator(
                path,
                args["Benefits"],
                args["SampleText"],
                args["Tone"],
                args["Style"],
                args["Languages"],
            )
            return {"message": generatedDescription}, 201


api.add_resource(ResponseClass, "/generateDescription")

if __name__ == "__main__":
    app.run()
