BEGIN;

DROP TABLE IF EXISTS memories, users CASCADE;
DROP TYPE IF EXISTS media_type CASCADE;

CREATE TYPE media_type AS ENUM ( 'text_only', 'audio', 'video', 'image' );

CREATE TABLE users (
  id            SERIAL          PRIMARY KEY,
  username      VARCHAR(64)     UNIQUE NOT NULL,
  password      VARCHAR(64)     NOT NULL,
  email         VARCHAR(64)     NOT NULL,
  token         VARCHAR(10),
  token_expiry  VARCHAR(150)
);

CREATE TABLE memories (
  id                SERIAL                         PRIMARY KEY,
  user_id           INTEGER REFERENCES users(id)   NOT NULL,
  heading           VARCHAR(50)                    NOT NULL,
  likes             INTEGER,
  visits            INTEGER,
  tag               VARCHAR(50)                    NOT NULL,
  memory_asset_url  VARCHAR(500),
  memory_text       VARCHAR(2000),
  media_type        media_type
);

INSERT INTO users (username, password, email)
VALUES ('test', 'will be hashed', 'test@test.com');

INSERT INTO memories (user_id, heading, likes, visits, tag, memory_asset_url, memory_text, media_type)
VALUES
(1, 'testHeading', 10, 1, 'family', '', 'Donec et orci eu felis malesuada venenatis. Aliquam erat volutpat. Morbi eget felis ut metus malesuada ullamcorper. Maecenas sem nulla, tincidunt ut aliquam vestibulum, iaculis vel diam. Morbi mattis leo.', 'text_only'),
(1, 'testHeading', 7, 1, 'family', 'testurl', 'testMemoryText', 'audio'),
(1, 'testHeading', 35, 1, 'family', 'https://levoyageverslest.files.wordpress.com/2010/01/zaoouunautre.jpg', 'testMemoryText', 'image'),
(1, 'testHeading', 7, 1, 'family', 'testurl', 'testMemoryText', 'video'),
(1, 'testHeading', 19, 1, 'family', '', 'Donec et orci eu felis malesuada venenatis. Aliquam erat volutpat. Morbi eget felis ut metus malesuada ullamcorper. Maecenas sem nulla, tincidunt ut aliquam vestibulum, iaculis vel diam. Morbi mattis leo.', 'text_only'),
(1, 'testHeading', 10, 1, 'pets', 'testurl', 'testMemoryText', 'audio'),
(1, 'testHeading', 7, 1, 'pets', 'https://levoyageverslest.files.wordpress.com/2010/01/zaoouunautre.jpg', 'testMemoryText', 'image'),
(1, 'testHeading', 35, 1, 'pets', 'testurl', 'testMemoryText', 'video'),
(1, 'testHeading', 7, 1, 'pets', '', 'Donec et orci eu felis malesuada venenatis. Aliquam erat volutpat. Morbi eget felis ut metus malesuada ullamcorper. Maecenas sem nulla, tincidunt ut aliquam vestibulum, iaculis vel diam. Morbi mattis leo.', 'text_only'),
(1, 'testHeading', 19, 1, 'pets', 'testurl', 'testMemoryText', 'audio'),
(1, 'testHeading', 10, 1, 'friends', 'https://levoyageverslest.files.wordpress.com/2010/01/zaoouunautre.jpg', 'testMemoryText', 'image'),
(1, 'testHeading', 7, 1, 'friends', 'testurl', 'testMemoryText', 'video'),
(1, 'testHeading', 35, 1, 'friends', '', 'Donec et orci eu felis malesuada venenatis. Aliquam erat volutpat. Morbi eget felis ut metus malesuada ullamcorper. Maecenas sem nulla, tincidunt ut aliquam vestibulum, iaculis vel diam. Morbi mattis leo.', 'text_only'),
(1, 'testHeading', 6, 1, 'friends', 'testurl', 'testMemoryText', 'audio'),
(1, 'testHeading', 19, 1, 'friends', 'https://levoyageverslest.files.wordpress.com/2010/01/zaoouunautre.jpg', 'testMemoryText', 'image');

COMMIT;
