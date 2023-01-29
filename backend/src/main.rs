#[macro_use]
extern crate rocket;
use rocket::{get, http::Status, serde::json::Json};
use rocket_db_pools::{mongodb, Database, Connection};
use mongodb::bson::doc;
use serde::{Serialize, Deserialize};

mod cors;

#[derive(Serialize, Deserialize)]
pub struct NQRequest {
    pub eid: String,
    pub uid: String
}

#[derive(Serialize, Deserialize)]
pub struct NQResponse {
    pub qid: String,
    pub question: String,
    pub long: String,
    pub link: String
}

#[derive(Database)]
#[database("mongo")]
struct Mongo(mongodb::Client);

// Try visiting:
//   http://127.0.0.1:8000/hello/world

#[get("/nq", data = "<j>")]
async fn new_question(j: Json<NQRequest>) -> Result<Json<NQResponse>, Status> {
    let request = j.into_inner();

    let response = NQResponse {
        qid: String::from("123"),
        question: String::from("1234"),
        long: String::from("12345"),
        link: String::from("123456")
    };
    return Ok(Json(response))
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
