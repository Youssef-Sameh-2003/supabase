\set pguser `echo "$POSTGRES_USER"`

CREATE DATABASE _skybase WITH OWNER :pguser;
