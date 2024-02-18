# Write your code here :-)
'''
author: Shrey
date: 15th August 2023
'''

import urllib.request

import os
import ffmpeg

from google.cloud import speech_v1 as stt
from google.cloud.speech_v1 import types

#For recording audio
import sounddevice as sd

#For writing to wav file (recorded audio)
from scipy.io.wavfile import write

#For converting recorded file to FLAC
import soundfile as sf

import io

#Google Authentication
auth = r"src/app/papi/speech_creds.json"
client = stt.SpeechClient.from_service_account_json(auth)


'''
For text synthesis/response from google we need the following:
1) audio (recorded OR audio file BUT in FLAC format)
2) config (encoding method, sample hertz/sample rate, language code)
'''

'''
Getting the audio
'''
#To record the audio we will need the following:
sampleRate = 44100
recordingDuration = 3
frames = int(sampleRate*recordingDuration) #totalSamples

'''
print("Recording")
recordedAudio = sd.rec(frames, sampleRate, 1)
sd.wait()
print("Done")



#Writing to WAV file
write("recordedAudio.wav", sampleRate, recordedAudio)
'''
def getSTT(fileURL):

    urllib.request.urlretrieve(fileURL, "src/app/papi/test.mp4")

    command1 = "ffmpeg -i src/app/papi/test.mp4 -ab 160k -ac 1 -ar 44100 -vn src/app/papi/temp.wav -y"
    #command2 = "ffmpeg -i src/app/papi/test.mp3 -ab 160k -ac 1 -ar 44100 -vn src/app/papi/temp.wav"
    os.system(command1)
    #os.system(command2)

    #Converting into FLAC
    data, recSampleRate = sf.read("src/app/papi/temp.wav")
    sf.write("src/app/papi/recordedAudio.FLAC", data, sampleRate)

    '''
    Making the config file
    '''
    encoding = stt.RecognitionConfig.AudioEncoding.FLAC
    lang = "en-US"
    config = {"encoding":encoding,
            "sample_rate_hertz":sampleRate,
            "language_code":lang}

    '''
    EXTRA:
    An enumeration: is a set of symbolic names (members)
    bound to unique values. can be iterated over to return
    its canonical (i.e. non-alias) members in definition order.
    Uses call syntax to return members by value.
    '''

    #Finally we get the response
    path = r"src/app/papi/recordedAudio.FLAC"
    sttresponse = "+++"
    with io.open(path, "rb") as audio_file:
        data = audio_file.read()
        audio = types.RecognitionAudio(content=data)
        operation = client.long_running_recognize(
            request={"config": config, "audio": audio}
        )
        response = operation.result(timeout=10000)
        for result in response.results:
            # First alternative is the most probable result
            alternative = result.alternatives[0]
            sttresponse += alternative.transcript
            #print(f"Transcript: {alternative.transcript}")
        #response = client.recognize(config, audio)
    print(sttresponse)
    return sttresponse

if __name__ == "__main__":
    getSTT("https://res.cloudinary.com/dyhkvcl9v/raw/upload/v1708235515/voice-recordings/orhancangurel%40gmail.com-Title.wav")
