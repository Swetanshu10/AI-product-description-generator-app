from flask import Flask, request
from flask_cors import CORS, cross_origin
import magic
import google.generativeai as genai
import PIL.Image

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:1234"}})
genai.configure(api_key="API_KEY")
model = genai.GenerativeModel("gemini-1.5-flash")


def createPartialPromt(contentArray):
    info1 = contentArray[0]

    if len(contentArray) == 2:
        info1 = info1 + " , " + contentArray[1]

    if len(contentArray) == 3:
        info1 = info1 + " , " + contentArray[2]

    if len(contentArray) == 4:
        info1 = info1 + " , " + contentArray[3]

    return info1


def createImagePromt(imageArray):
    outputArray = []
    outputArray.append(PIL.Image.open(imageArray[0]))

    if len(imageArray) == 2:
        outputArray.append(PIL.Image.open(imageArray[1]))

    if len(imageArray) == 3:
        outputArray.append(PIL.Image.open(imageArray[2]))

    if len(imageArray) == 4:
        outputArray.append(PIL.Image.open(imageArray[3]))

    return outputArray


def AIGenerate(painPoints, features, languages, imageArray):
    content1 = createPartialPromt(painPoints)
    content2 = createPartialPromt(features)
    imageInput = createImagePromt(imageArray)
    finalPromt = ""

    if len(imageInput) == 1:
        finalPromt = imageInput + [
            "The product shown in the image has following features: "
            + content2
            + "and it provides following benefits to anyone using it. "
            + content1
            + ". Please generate an accurate , SEO optimized product description for this product explaining each of its features and how it provides benefits to users in each of these languages:"
            + languages[0]
            + " , "
            + languages[1]
            + " , "
            + languages[2]
            + " , "
            + languages[3]
            + " . Also give \n character at the end of each line."
            + " Feel free to decline to generate the description if the product is looking dangerous or harmful, explaining your reasons for declining"
        ]

    elif len(imageInput) > 1:
        finalPromt = [
            "There is a product which has the following features: "
            + content2
            + " and it provides following benefits to anyone using it. "
            + content1
            + " . Please generate an accurate , SEO optimized product description for this product explaining what features it has and how it provides benefits to users in each of these languages:"
            + languages[0]
            + " , "
            + languages[1]
            + " , "
            + languages[2]
            + " , "
            + languages[3]
            + " . Only generate the product description if the product is not dangerous and not harmful , else decline with reasons for declining"
            + " . Also give \n character at the end of each line."
            + " You can refer to the given product images: "
        ] + imageInput

    response = model.generate_content(finalPromt)
    return response.text


def textValidation(textArray):
    if len(textArray) == 0:
        return False

    for text in textArray:
        if type(text) != str:
            return False
    return True


def languageValidation(languageOptions):
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


def imageValidation(imageArray):
    if len(imageArray) == 0:
        return False

    for image in imageArray:
        if magic.from_buffer(image.read(), mime=True) not in (
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/webp",
        ):
            return False
    return True


@app.route("/", methods=["POST"])
@cross_origin(origins=["http://localhost:1234"])
def hello():

    if request.method == "POST":
        data = request.form.getlist("PainPoints")
        if textValidation(data) == False:
            return {"message": "Invalid input for benefits"}

        data2 = request.form.getlist("Features")
        if textValidation(data2) == False:
            return {"message": "Invalid input for features"}

        data3 = request.form.getlist("Languages")
        if languageValidation(data3) == False:
            return {"message": "Invalid input for languages"}

        data4 = request.files.getlist("Images")
        if imageValidation(data4) == False:
            return {"message": "Invalid input for images"}

        response = AIGenerate(data, data2, data3, data4)
        return {"message": response}
    else:
        return {"message": "Invalid request method"}


if __name__ == "__main__":
    app.run()
