-- NOTE: change to your own passwords for production environments
\set pgpass `echo "$POSTGRES_PASSWORD"`

ALTER USER authenticator WITH PASSWORD :'pgpass';
ALTER USER pgbouncer WITH PASSWORD :'pgpass';
ALTER USER skybase_auth_admin WITH PASSWORD :'pgpass';
ALTER USER skybase_functions_admin WITH PASSWORD :'pgpass';
ALTER USER skybase_storage_admin WITH PASSWORD :'pgpass';
