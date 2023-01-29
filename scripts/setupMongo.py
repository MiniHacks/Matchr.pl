from pymongo import MongoClient
import os



if __name__ == '__main__':
    client = MongoClient("mongodb://root:rootpassword@localhost:27017")
    print("post client")

    db = client["rustdb"]
    db["candidates"].drop()
    db["elections"].drop()
    db["quizzes"].drop()
    print("post candidates")
    for filename in os.listdir("./candidates"):
        fPath = os.path.join("./candidates", filename)
        iPath = os.path.join("./images", filename + ".png")
        idata = None
        if os.path.isfile(iPath):
            with open(iPath, "rb") as f:
                idata = f.read()
        if os.path.isfile(fPath):
            with open(fPath) as f:
                lines = f.readlines()
                quotes = []
                for i in range(0, len(lines), 3):
                    short = lines[i]
                    long = lines[i + 1]
                    link = lines[i + 2]
                    quotes = []
                    quotes.append({"quote": short, "long": long, "agreement": 3, "link": link})
                print("pre insert")
                db["candidates"].insert_one({"cid": filename, "quotes": quotes, "image": idata})
                print("post insert")

    for filename in os.listdir("./elections"):
        fPath = os.path.join("./elections", filename)
        if os.path.isfile(fPath):
            with open(fPath) as f:
                cids = f.readlines()
                db["elections"].insert_one({"eid": filename, "candidates": cids})
    

    client.close()