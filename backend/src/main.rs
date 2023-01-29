#[macro_use]
extern crate rocket;
use rocket::{get, http::Status, serde::json::Json};
use rocket_db_pools::{mongodb, Database, Connection};
use mongodb::{bson::doc, Collection};
use serde::{Serialize, Deserialize};
use rand::seq::SliceRandom;

mod cors;

#[derive(Serialize, Deserialize)]
pub struct NQRequest {
    pub eid: String,
    pub uid: String
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Quote {
    pub quote: String,
    pub long: String,
    pub link: String,
    pub agreement: i32,
}

#[derive(Serialize, Deserialize)]
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

#[derive(Serialize, Deserialize)]
pub struct Candidate {
    pub cid: String,
    pub quotes: Vec<Quote>,
}

#[derive(Serialize, Deserialize)]
pub struct Election {
    pub eid: String,
    pub candidates: Vec<String>,
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

#[launch]
fn rocket() -> _ {
    rocket::build().attach(Mongo::init()).attach(cors::Cors).mount("/", routes![value, hello, new_question])
}
