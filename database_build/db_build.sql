BEGIN;

DROP TABLE IF EXISTS memories, users, media CASCADE;

CREATE TABLE memories (
  id          SERIAL          PRIMARY KEY,
  user_id     SERIAL          NOT NULL,
  heading     VARCHAR(50)     NOT NULL,
  likes       INTEGER,
  avgRating   DECIMAL,
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
  text_only   TEXT[],
  audio       TEXT[],
  video       TEXT[],
  image       TEXT[]
);

INSERT INTO users (username, password, email)
VALUES ('test', 'will be hashed', 'test@test.com');

INSERT INTO memories (id, user_id, heading, likes, avgRating, visits, tag, memory)
VALUES
(2951, 1, 'testHeading', 10, 4.7, 1, 'family', 'testmemory'),
(654654, 1, 'testHeading', 7, 8.9, 1, 'family', 'testmemory'),
(6546544, 1, 'testHeading', 35, 7.2, 1, 'family', 'testmemory'),
(653654, 1, 'testHeading', 7, 3.7, 1, 'family', 'testmemory'),
(65465432, 1, 'testHeading', 19, 9.2, 1, 'family', 'testmemory'),
(549, 1, 'testHeading', 10, 1.3, 1, 'pets', 'testmemory'),
(8645, 1, 'testHeading', 7, 3.9, 1, 'pets', 'testmemory'),
(8750, 1, 'testHeading', 35, 4.6, 1, 'pets', 'testmemory'),
(897, 1, 'testHeading', 7, 3.5, 1, 'pets', 'testmemory'),
(2938746, 1, 'testHeading', 19, 2.8, 1, 'pets', 'testmemory'),
(24, 1, 'testHeading', 10, 7.6, 1, 'friends', 'testmemory'),
(23698, 1, 'testHeading', 7, 2.6, 1, 'friends', 'testmemory'),
(12309, 1, 'testHeading', 35, 8.9, 1, 'friends', 'testmemory'),
(34, 1, 'testHeading', 6, 3.6, 1, 'friends', 'testmemory'),
(837, 1, 'testHeading', 19, 6.5, 1, 'friends', 'testmemory');

COMMIT;
