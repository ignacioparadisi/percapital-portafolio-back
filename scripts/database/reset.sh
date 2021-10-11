psql -U percapital -tc "SELECT 1 FROM pg_database WHERE datname = 'percapital';" | grep -q 1 | psql -U percapital -c "CREATE DATABASE percapital;"
psql percapital -U percapital -f drop.sql
psql percapital -U percapital -f create.sql
psql percapital -U percapital -f insert.sql
psql percapital -U percapital -f functions.sql
psql percapital -U percapital -f operation_functions.sql
psql percapital -U percapital -f price_rv_functions.sql