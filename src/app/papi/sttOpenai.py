from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()
client = OpenAI()

#text = "Computer Applications are traditionally Kylie likes to the server and operating system that executes their code for those companies increasingly want to expand computer capabilities while spending less time money and effort and painting and computer infrastructure vendors are offering simplified appointments virtual machines and containers are two approaches that Lucinda standard dependence on physical server first approach has its own set of benefits and uses a virtual machine or VM is a software-based environment running on top of a physical server that mimics the user experience of dedicated Hardware"
#text = "How are you doing?"
def buildPrompt(text):
    prompt =f"""
I was asked to speak about the a topic/question
and in response I said the following (transcript):
{text}

I need 5 multiple-choice questions including answers. But give me the questions and choices first,
and put the answers at the end.

I'm a university student, take this into account when deciding the diffictulty of your questions.
Make half of the questions from the academic concepts and facts I talked about earlier, and the other half
can be something related but a little harder. But remember, always double check and be as factually correct
as possible.

Expect minor typos in the transcript above and try to infer the general idea.
"""
    return prompt

def getQuestions(text):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role":"system","content":"You are a university-level educational assistant, helping students study topics"},
            {"role":"user","content":buildPrompt(text)}
        ]
    )
    return completion.choices[0].message.content


#print(completion.choices[0].message.content)


