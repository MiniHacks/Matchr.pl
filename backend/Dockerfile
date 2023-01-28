FROM rust:latest

WORKDIR /usr/src/backend
COPY . .

RUN rustup default nightly
RUN cargo fetch
CMD cargo run