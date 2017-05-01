CREATE TABLE tasks (
id SERIAL PRIMARY KEY NOT NULL,
info VARCHAR,
complete VARCHAR(1),
);

INSERT INTO tasks (info, complete) VALUES ('task1: clean under porch', 'N');
INSERT INTO tasks (info, complete) VALUES ('do laundry', 'N');
INSERT INTO tasks (info, complete) VALUES ('do Prime weekend Challenge 3', 'N');
