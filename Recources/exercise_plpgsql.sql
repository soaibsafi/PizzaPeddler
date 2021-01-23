-- Task: rewrite the hello(name) function to use Anonymous in case of an empty string
CREATE
OR REPLACE FUNCTION hello(name VARCHAR) RETURNS VARCHAR AS $$
BEGIN IF name IS NULL THEN RETURN hello();
ELSEIF
name = '' THEN RETURN hello('Anonymous');
ELSE RETURN format('Hello, %s!', name);
END IF;
END;
$$
LANGUAGE plpgsql;
SELECT *
FROM hello('');
-- Task: now, also check for Bob and use Robert instead and change Bill to William, too.
CREATE
OR REPLACE FUNCTION hello(name VARCHAR) RETURNS VARCHAR AS $$
BEGIN IF name IS NULL THEN name = 'World';
ELSEIF
name = '' THEN name = 'Anonymous';
ELSEIF
name = 'Bob' THEN name = 'Robert';
ELSEIF
name = 'Bill' THEN name = 'William';
END IF;
RETURN format('Hello, %s!', name);
END;
$$
LANGUAGE plpgsql;
SELECT *
FROM hello('Bob');
-- Task: rewrite it and try to use the CASE control structure instead
CREATE
OR REPLACE FUNCTION hello(name VARCHAR) RETURNS VARCHAR AS $$
BEGIN CASE
    WHEN name IS NULL THEN name = 'World';
WHEN name = '' THEN name = 'Anonymous';
WHEN name = 'Bob' THEN name = 'Robert';
WHEN name = 'Bill' THEN name = 'William';
ELSE NULL;
END
CASE
;
RETURN format('Hello, %s!', name);
END;
$$
LANGUAGE plpgsql;
SELECT *
FROM hello('Bill');
--Task: write a new rating function that
-- • takes an integer as input parameter
-- • and returns a rating string
-- • poor for 1, 2 and 3
-- • average for 4, 5 and 6
-- • good for 7, 8 and 9
-- • excellent for 10
-- • out of range for anything else
-- • and uses the CASE construct
CREATE
OR REPLACE FUNCTION rating(score INTEGER) RETURNS VARCHAR AS $$
BEGIN CASE
    score
    WHEN 1,
    2,
    3 THEN RETURN 'poor';
WHEN 4,
5,
6 THEN RETURN 'average';
WHEN 7,
8,
9 THEN RETURN 'good';
WHEN 10 THEN RETURN 'excellent';
ELSE RETURN 'out of range';
END
CASE
;
END;
$$
LANGUAGE plpgsql;
SELECT *
FROM rating(55);
--  Task: write a function that calls this rating function with input values in range from 0 to 20 by using the FOR control construct.
CREATE
OR REPLACE FUNCTION rating_test() RETURNS SETOF VARCHAR AS $$
BEGIN FOR score IN 0..20 LOOP RETURN NEXT rating(score);
END LOOP;
RETURN;
END;
$$
LANGUAGE plpgsql;
SELECT *
FROM rating_test();
-- Task: now write another function that returns random INTEGER values in a range of 1 to 100 and exits when the number 42 is returned
-- • each number should be returned at its own row
-- • hint: the built-in function random() returns DOUBLE PRECISION values in a range of [0.0 .. 1.0)
CREATE
OR REPLACE FUNCTION random42() RETURNS SETOF INTEGER AS $$
DECLARE
rnd INTEGER;
BEGIN LOOP
rnd = ceil(random() * 100)::INTEGER;
RETURN
NEXT rnd;
EXIT
WHEN rnd = 42;
END LOOP;
END;
$$
LANGUAGE plpgsql;
SELECT *
FROM random42();
-- Task: let’s write another function, that
-- • counts the number of random numbers (number of rows) returned by our last function and
-- • if this count doesn’t equal to 42, increases another counter that indicates how many tries it took to get 42 random numbers and
-- • returns this counter
CREATE
OR REPLACE FUNCTION counter42() RETURNS INTEGER AS $$
DECLARE
c INTEGER = 1;
BEGIN WHILE
(
SELECT COUNT(*)
FROM random42() ) != 42 LOOP c = c + 1;
END LOOP;
RETURN c;
END;
$$
LANGUAGE plpgsql;
SELECT *
FROM counter42();
-- Task: remove the usage of ceil() so that it returns numbers in a range of 0 to 100
-- • further modify the function to raise the exception numeric_value_out_of_range when it dices a 0
CREATE
OR REPLACE FUNCTION random42() RETURNS SETOF INTEGER AS $$
DECLARE
rnd INTEGER;
BEGIN LOOP
rnd = (random() * 100)::INTEGER;
IF
rnd = 0 THEN RAISE numeric_value_out_of_range;
END IF;
RETURN
NEXT rnd;
EXIT
WHEN rnd = 42;
END LOOP;
END;
$$
LANGUAGE plpgsql;
SELECT *
FROM random42();
-- Task: modify it to return 0 if this exception occurs
CREATE
OR REPLACE FUNCTION counter42() RETURNS INTEGER AS $$
DECLARE
c INTEGER = 1;
BEGIN WHILE
(
SELECT COUNT(*)
FROM random42() ) != 42 LOOP c = c + 1;
END LOOP;
RETURN c;
EXCEPTION
WHEN numeric_value_out_of_range THEN RETURN 0;
END;
$$
LANGUAGE plpgsql;
SELECT *
FROM counter42();
-- • as random42() throws an exception in about every second run, you rarely see count42() returning anything but 0
-- Task: to make things more interesting again and test whether casting FLOAT to INTEGER is really rounding, modify random42() to throw another exception error_in_assignment, when it dices a 100
CREATE
OR REPLACE FUNCTION random42() RETURNS SETOF INTEGER AS $$
DECLARE
rnd INTEGER;
BEGIN LOOP
rnd = (random() * 100)::INTEGER;
IF
rnd = 0 THEN RAISE numeric_value_out_of_range;
ELSEIF
rnd = 100 THEN RAISE error_in_assignment;
END IF;
RETURN
NEXT rnd;
EXIT
WHEN rnd = 42;
END LOOP;
END;
$$
LANGUAGE plpgsql;
SELECT *
FROM random42();
CREATE
OR REPLACE FUNCTION counter42() RETURNS INTEGER AS $$
DECLARE
c INTEGER = 1;
BEGIN WHILE
(
SELECT COUNT(*)
FROM random42() ) != 42 LOOP c = c + 1;
END LOOP;
RETURN c;
EXCEPTION
WHEN numeric_value_out_of_range THEN RETURN 0;
WHEN error_in_assignment THEN RETURN -1;
END;
$$
LANGUAGE plpgsql;
SELECT *
FROM counter42();
-- Task: write some kind of wrapper function for this, that is returning a cursor to an instance without an exception
CREATE
OR REPLACE FUNCTION wrap_random42() RETURNS REFCURSOR AS $$
DECLARE
curs CURSOR FOR
SELECT *
FROM random42();
BEGIN LOOP
BEGIN OPEN curs;
MOVE
FORWARD
FROM curs;
MOVE
BACKWARD IN curs;
RETURN curs;
EXCEPTION
WHEN OTHERS THEN NULL;
END;
END LOOP;
END;
$$
LANGUAGE plpgsql;
SELECT *
FROM wrap_random42();
--- Get all baker
CREATE FUNCTION getallbaker() RETURNS setof baker AS $$
SELECT *
FROM baker;
$$
LANGUAGE SQL;
select *
from getallbaker()