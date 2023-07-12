\echo 'Delete and recreate codequest database?'
\prompt 'Return for yes and contrl-C to cancel' answer

DROP DATABASE codequest;
CREATE DATABASE codequest;
\connect codequest;

\i codequest-schema.sql