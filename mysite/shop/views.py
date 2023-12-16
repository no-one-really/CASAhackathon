from django.shortcuts import render
from django.http import HttpResponse
from langchain.document_loaders import UnstructuredPDFLoader
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
import cv2
import requests
import numpy as np
#import rembg
import base64
from PIL import Image
#import replicate
import os
#from rembg import remove


os.environ["HUGGINGFACEHUB_API_TOKEN"] = "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"


# Load the document of where the data is.. In my case., Clothes Catalogue
loader = UnstructuredPDFLoader(r"C:\Users\Ravi\Desktop\hackathon\content\rag_data_samp.pdf")
document = loader.load()

# Take a document and split it into chunks of a specified size while considering overlap and using defined separators.
# Useful for processing large text documents in smaller, more manageable pieces.

from langchain.text_splitter import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(chunk_size = 500, chunk_overlap=0, separators=[" ", ",", "\n"])
docs = text_splitter.split_documents(document)

# Numerical representations of words, sentences, or documents that capture semantic information are done with HuggingFaceEmbeddings
# Creating a FAISS index from the embedded documents, which allows for efficient similarity search based on the learned embeddings.

from langchain.embeddings import HuggingFaceEmbeddings

embedding = HuggingFaceEmbeddings()
db = FAISS.from_documents(docs, embedding)

from langchain import HuggingFaceHub

llm=HuggingFaceHub(repo_id="HuggingFaceH4/zephyr-7b-alpha", model_kwargs={"temperature":0.2, "max_length":256})
chain = load_qa_chain(llm, chain_type="stuff")


shplist=["T-shirt Contrast Pocket","Basic Flowing Scarf",]
rcmdlist=["black shoe",]

itemDescription={"T-shirt Contrast Pocket":['$30','static/img/shopping-cart/cart-1.jpg'],"Basic Flowing Scarf":["$47.00","static/img/shopping-cart/cart-3.jpg"],
"black shoe":["$32.50","static/img/shopping-cart/cart-2.jpg"],"Full Sleeve cover shirt":["$40","static/img/shopping-cart/product-item1.jpg"],
"Volunteer Half blue":["$38.00","static/img/shopping-cart/product-item2.jpg"],
"Long belly grey pant":["$38.00",'static/images/product-item4.jpg'],"Full sleeve Jeans jacket":["$38.00","static/images/selling-products5.jpg"],
"Stylish Grey Pant":["$38.00","static/images/selling-products2.jpg"]
}

def forRecommend(listIn):
    to_send_list=[]
    if len(listIn)<1:
        return " "
    else:
        print("in")
        textForInput=""
        for i in listIn:
            j=i+" "
            textForInput+=j

        query_finetune = "only name, no extra question and answer"
        #query = "I have a full sleeve cover shirt, give me some recommendation to match it with"
        #query = "Give matching pair for Stylish grey coat?"
        query = "What is the best combo for {inp}?".format(inp=textForInput)
        print("Que",query)
        docs = db.similarity_search(query)
        output_rec = chain.run(input_documents=docs, question=query+query_finetune)
        for i in itemDescription:
            if i in str(output_rec):
                to_send_list.append(i)
        print(to_send_list)
        return to_send_list

fullDetail=[]
drlst=[]
reclist=[]
rcdflist=[]

# def image_to_base64(image_path):
#     try:
#         # Open and read the image
#         with open(image_path, "rb") as image_file:
#             image_data = image_file.read()
#
#             # Encode image data to base64
#             base64_encoded = base64.b64encode(image_data).decode("utf-8")
#
#             return base64_encoded
#     except Exception as e:
#         print(f"Error: {e}")
#         return None

def fullAppendCartList(listIn):
    result = []
    for it in listIn:
        if it in itemDescription:
            result.append([it] + itemDescription[it])
    return result


# def llavaSuggest(location1,location2):
#     print("it came here")
#     opout=""
#     path1=r"{}".format(location1)
#     path2=r"{}".format(location2)
#     image1 = cv2.imread(path1)
#     image2 = cv2.imread(path2)
#     outputImg = remove(image1)
#     outputImg1 = remove(image2)
#     min_height = min(image1.shape[0], image2.shape[0])
#     image1 = image1[:min_height, :]
#     image2 = image2[:min_height, :]
#
#     concatenated_image = np.hstack((outputImg, outputImg1))
#     base64_string = image_to_base64(image_path)
#     base64_string = "data:image/jpeg;base64,"+ base64_string
#     os.environ["REPLICATE_API_TOKEN"] = "r8_SyLhGy2IGCnLqypwRgQ9BR4NpABhE992QaM46"
#     api = replicate.Client(api_token=os.environ["REPLICATE_API_TOKEN"])
#     output = api.run(
#       "yorickvp/llava-13b:e272157381e2a3bf12df3a8edd1f38d1dbd736bbb7437277c8b34175f8fce358",
#       input={
#         "image": base64_string,
#         "top_p": 1,
#         "prompt": "do they suit each other",
#         "max_tokens": 1024,
#         "temperature": 0.2
#       }
#     )
#     for item in output:
#         opout+=item
#     return opout

# for it in rcmdlist:
#     currlst=[]
#     currlst.append(it)
#     for jk in itemDescription[it]:
#         currlst.append(jk)
#     rcdflist.append(currlst)

# Create your views here.
def home(request):
    return render(request,'index.html')

def dashboard(request):
    return render(request,'dash.html')

def casa(request):
    return render(request,'tgg.html')

def cart(request):
    global fullDetail,drlst,reclist,rcdflist

    if 'buttona' in request.GET:
        inputa = request.GET['buttona']
        print(inputa)
        drlst.append(inputa)
        print(drlst)

        try:
            url = "https://api.example.com/create"
            data = {"data": "mistral", "botprompt": "I am a shopping assistant I will help you get what you need","description":"What is be nice to wear with a white shirt"}
            #headers = {"Authorization": "Bearer YOUR_ACCESS_TOKEN"}

            response = requests.post(url, json=data, headers=headers)

            if response.status_code == 200:
                result = response.json()
                print(result)
            else:
                print(f"Error: {response.status_code}")
                print(response.text)
        except:
            zephyr_out=forRecommend(drlst)
            print("z:",zephyr_out)
            rcdflist=fullAppendCartList(zephyr_out)
        reclist=fullAppendCartList(drlst)

        #third_part=llavaSuggest('static/img/shopping-cart/cart-1.jpg',"static/img/shopping-cart/cart-2.jpg")
        try:
            for kjop in reclist:
                if kjop in rcdflist:
                    rcdflist.remove(kjop)
        except:
            pass


    print(reclist)
    print(rcdflist)
    return render(request,'shopping-cart.html',{"lst":reclist,"rlst":rcdflist})





# @register.filter
# def get_index(lst, i):
#     return lst[i]

def test12(request):
    return render(request,"test12.html",{"lst":shplist,"rlst":rcdflist})
