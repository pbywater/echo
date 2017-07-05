BEGIN;

DROP TABLE IF EXISTS memories, users, media CASCADE;

CREATE TABLE memories (
  id          SERIAL          PRIMARY KEY,
  user_id     SERIAL          NOT NULL,
  heading     VARCHAR(50)     NOT NULL,
  likes       INTEGER,
  avgRating   INTEGER,
  visits      INTEGER,
  tag         VARCHAR(50)     NOT NULL,
  memory      VARCHAR(500)    NOT NULL
);

CREATE TABLE users (
  id          SERIAL          PRIMARY KEY,
  username    VARCHAR(64)     UNIQUE NOT NULL,
  password    VARCHAR(64)     NOT NULL,
  email       VARCHAR(64)     NOT NULL
);

CREATE TABLE media (
  text_only   INTEGER[],
  audio       INTEGER[],
  video       INTEGER[],
  image       INTEGER[]
);

INSERT INTO media (text_only, audio, video, image)
VALUES ('{}', '{}', '{}', '{}');

INSERT INTO users (username, password, email)
VALUES ('test', 'will be hashed', 'test@test.com');

INSERT INTO memories (user_id, heading, likes, avgRating, visits, tag, memory)
VALUES
(1, 'testHeading', 10, 4.7, 1, 'family', 'testmemory'),
(1, 'testHeading', 7, 8.9, 1, 'family', 'testmemory'),
(1, 'testHeading', 35, 7.2, 1, 'family', 'testmemory'),
(1, 'testHeading', 7, 3.7, 1, 'family', 'testmemory'),
(1, 'testHeading', 19, 9.2, 1, 'family', 'testmemory'),
(1, 'testHeading', 10, 1.3, 1, 'pets', 'testmemory'),
(1, 'testHeading', 7, 3.9, 1, 'pets', 'testmemory'),
(1, 'testHeading', 35, 4.6, 1, 'pets', 'testmemory'),
(1, 'testHeading', 7, 3.5, 1, 'pets', 'testmemory'),
(1, 'testHeading', 19, 2.8, 1, 'pets', 'testmemory'),
(1, 'testHeading', 10, 7.6, 1, 'friends', 'testmemory'),
(1, 'testHeading', 7, 2.6, 1, 'friends', 'testmemory'),
(1, 'testHeading', 35, 8.9, 1, 'friends', 'testmemory'),
(1, 'testHeading', 6, 3.6, 1, 'friends', 'testmemory'),
(1, 'testHeading', 19, 6.5, 1, 'friends', 'testmemory');

COMMIT;
