BEGIN;

DROP TABLE IF EXISTS memories, users, media CASCADE;

CREATE TABLE memories (
  id          SERIAL        PRIMARY KEY,
  heading     VARCHAR(50)     NOT NULL,
  likes       INTEGER,
  rating      INTEGER,
  visits      INTEGER,
  memory      VARCHAR(500)    NOT NULL,
);

CREATE TABLE users (
  id          SERIAL        PRIMARY KEY,
  username    VARCHAR(64)   UNIQUE NOT NULL,
  password    VARCHAR(64)  NOT NULL,
  email    VARCHAR(64)  NOT NULL
);

CREATE TABLE media (
  text_only    TEXT[],
  audio    TEXT[],
  video    TEXT[],
  image    TEXT[]
);

INSERT INTO users (username, password, email)
VALUES ('test', 'will be hashed', 'test@test.com');

COMMIT;
