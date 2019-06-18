CREATE DATABASE tranquil_db;

USE DATABASE tranquil_db;

CREATE TABLE user_input
(
    id INT
    AUTO_INCREMENT NOT NULL,
    username VARCHAR
    (30) NOT NULL,
    password VARCHAR
    (45) NOT NULL,
    name VARCHAR
    (40) NOT NULL,
    PRIMARY KEY
    (id),
);

    CREATE TABLE user_assessment
    (
        -- The user ID is linked to the id in the user_input
        -- Thats how we can join the two together (assessment and user)
        user_id INT (10) NOT NULL,
        answer1 VARCHAR
        (30),
        answer2 VARCHAR
        (30),
        answer3 VARCHAR
        (30),
        answer4 VARCHAR
        (30),
        answer5 VARCHAR
        (30)
    );

    CREATE TABLE data_output
    (
        id INT
        AUTO_INCREMENT NOT NULL,
        url VARCHAR
        (30) NOT NULL, -- The link to the video
        category VARCHAR
        (30) NOT NULL, -- The category it belongs to (meditation, yoga, exercise)
        score INT
        (10) NOT NULL, -- The video's will hold a score that correspond with the user_assesment outcome
)