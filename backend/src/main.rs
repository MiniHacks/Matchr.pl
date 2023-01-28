#[macro_use]
extern crate rocket;
use rocket::{get, http::Status, serde::json::Json};
use rocket_db_pools::{mongodb, Database, Connection};
use mongodb::bson::doc;

mod cors;

#[derive(Database)]
#[database("mongo")]
struct Mongo(mongodb::Client);

// Try visiting:
//   http://127.0.0.1:8000/hello/world
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
    rocket::build().attach(Mongo::init()).attach(cors::Cors).mount("/", routes![value, hello])
}
