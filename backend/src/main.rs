#[macro_use]
extern crate rocket;
use rocket::{get, http::Status, serde::json::Json};
use rocket_db_pools::{mongodb, Database, Connection};
use mongodb::{bson::doc, Collection, bson};
use serde::{Serialize, Deserialize};
use rand::seq::SliceRandom;

mod cors;

#[derive(Serialize, Deserialize)]
pub struct NQRequest {
    pub eid: String,
    pub uid: String
}

#[derive(Serialize, Deserialize)]
pub struct SNRequest {
    pub eid: String,
    pub uid: String,
    pub question: String,
    pub agreement: i32,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Quote {
    pub quote: String,
    pub long: String,
    pub link: String,
    pub agreement: i32,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct QuestionResponse {
    pub question: String,
    pub response: i32,
}

#[derive(Serialize, Deserialize)]
pub struct Quiz {
    pub uid: String,
    pub eid: String,
    pub questions: Vec<QuestionResponse>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Candidate {
    pub cid: String,
    pub quotes: Vec<Quote>,
}

#[derive(Serialize, Deserialize)]
pub struct Election {
    pub eid: String,
    pub candidates: Vec<String>,
}

#[derive(Serialize, Deserialize)]
pub struct DoneRequest {
    pub eid: String,
    pub uid: String,
}

#[derive(Serialize, Deserialize)]
pub struct DoneResponse {
    pub image: String,
    pub name: String,
    pub desc: String,
    pub agreed: Vec<Quote>,
    pub disagreed: Vec<Quote>,
}

#[derive(Database)]
#[database("mongo")]
struct Mongo(mongodb::Client);

// Try visiting:
//   http://127.0.0.1:8000/hello/world

#[get("/nq", data = "<j>")]
async fn new_question(j: Json<NQRequest>, con: Connection<Mongo>) -> Result<Json<Quote>, Status> {
    let request = j.into_inner();

    let filter = doc! {
        "eid": request.eid.clone(),
        "uid": request.uid.clone(),
    };

    let quizzes: Collection<Quiz> = con.database("rustdb").collection("quizzes");
    let mongo_quiz = quizzes.find_one(filter, None).await.unwrap();
    match mongo_quiz {
        Some(quiz) => {
            for qr in quiz.questions.iter() {
                println!("{}", qr.question);
            }
        },
        None => {
            let questions: Vec<QuestionResponse> = Vec::new();
            let quiz = Quiz {
                eid: request.eid.clone(),
                uid: request.uid.clone(),
                questions: questions,
            };

            let result = quizzes.insert_one(quiz, None).await;
        },
    }

    let elections: Collection<Election> = con.database("rustdb").collection("elections");
    let eid_filter = doc! {
        "eid": request.eid.clone(),
    };
    let election = elections.find_one(eid_filter, None).await.unwrap().unwrap();
    let candidates = election.candidates;

    let cid = candidates.choose(&mut rand::thread_rng()).unwrap().clone();
    let candidates: Collection<Candidate> = con.database("rustdb").collection("candidates");
    let cid_filter = doc! {
        "cid": cid.clone()
    };
    println!("{}", cid);
    let candidate = candidates.find_one(cid_filter, None).await.unwrap().unwrap();

    let quote = candidate.quotes.choose(&mut rand::thread_rng()).unwrap();

    return Ok(Json(quote.clone()))
}

#[get("/send", data = "<j>")]
async fn send(con: Connection<Mongo>, j: Json<SNRequest>) -> Result<Json<String>, Status> {
    let request = j.into_inner();

    let filter = doc! {
        "eid": request.eid.clone(),
        "uid": request.uid.clone(),
    };

    let quizzes: Collection<Quiz> = con.database("rustdb").collection("quizzes");
    let mongo_quiz = quizzes.find_one(filter.clone(), None).await.unwrap();
    match mongo_quiz {
        Some(quiz) => {
            let mut v = quiz.questions.clone();

            v.push(
                QuestionResponse {
                    question: request.question.clone(),
                    response: request.agreement.clone(),
                }
            );

            let update = doc!{
                "$set": {
                    "questions": bson::to_bson(&v.clone()).unwrap(),
                }
            };

            quizzes.update_one(filter, update, None).await;
        },
        None => {
            println!("No quiz found");
        },
    }

    Ok(Json(String::from("Based")))
}

#[get("/value")]
fn value() -> Result<Json<i32>, Status> {
    Ok(Json(45))
}

#[get("/")]
async fn hello(con: Connection<Mongo>) -> Result<Json<String>, Status> {
    let new_doc = doc! {
        "title": "Parasite",
        "year": 2020,
        "plot": "A poor family, the Kims, con their way into becoming the servants of a rich family, the Parks. But their easy life gets complicated when their deception is threatened with exposure.",
    };

    let main = con.database("rustdb").collection("main");
    let results = main.insert_one(new_doc.clone(), None).await;
    match results {
        Ok(res) => println!("New document ID: {}", res.inserted_id),
        Err(err) => println!("{}", err)
    };
    Ok(Json(String::from("Hello from rust and mongoDB")))
}

#[get("/done", data = "<j>")]
async fn done(j: Json<DoneRequest>, con: Connection<Mongo>) -> Result<Json<DoneResponse>, Status> {
    let request = j.into_inner();
    let filter = doc! {
        "eid": request.eid.clone(),
        "uid": request.uid.clone(),
    };

    let quizzes: Collection<Quiz> = con.database("rustdb").collection("quizzes");
    let quiz = quizzes.find_one(filter, None).await.unwrap().unwrap();

    let eid_filter = doc! {
        "eid": request.eid.clone(),
    };

    let elections: Collection<Election> = con.database("rustdb").collection("elections");
    let election = elections.find_one(eid_filter, None).await.unwrap().unwrap();

    let candidates: Collection<Candidate> = con.database("rustdb").collection("candidates");
    let mut max_can: Option<Candidate> = None;
    let mut max_tot: i32 = 0;
    let mut max_agreed: Option<Vec<Quote>> = None;
    let mut max_disagreed: Option<Vec<Quote>> = None;

    for cid in election.candidates.iter() {
        let mut total = 0;
        let cid_filter = doc! {
            "cid": cid.clone()
        };
        println!("{}", cid);
        let candidate = candidates.find_one(cid_filter, None).await.unwrap().unwrap();
        let mut agreed: Vec<Quote> = Vec::new();
        let mut disagreed: Vec<Quote> = Vec::new();

        for quote in candidate.quotes.iter() {
            for qr in quiz.questions.iter() {
                if quote.quote == qr.question {
                    total += qr.response;
                    if quote.agreement == qr.response {
                        agreed.push(quote.clone());
                    } else {
                        disagreed.push(quote.clone());
                    }
                }
            }
        }

        if total > max_tot {
            max_tot = total;
            max_can = Option::from(candidate.clone());
            max_agreed = Option::from(agreed.clone());
            max_disagreed = Option::from(disagreed.clone());
        }
    }

    let can = max_can.unwrap();
    let agreed = max_agreed.unwrap();
    let disagreed = max_disagreed.unwrap();

    let response = DoneResponse {
        image: String::from("image"),
        name: String::from("name"),
        desc: String::from("desc"),
        agreed: agreed,
        disagreed: disagreed,
    };
    return Ok(Json(response))
}

#[launch]
fn rocket() -> _ {
    rocket::build().attach(Mongo::init()).attach(cors::Cors).mount("/", routes![value, hello, new_question, send, done])
}
