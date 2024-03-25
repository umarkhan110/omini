# admin_console

[![pipeline status](https://git.omniindex.io/omniindex/core/postgresql/badges/main/pipeline.svg)](https://git.omniindex.io/omniindex/core/postgresql/-/commits/main)
[![Latest Release](https://git.omniindex.io/omniindex/core/postgresql/-/badges/release.svg)](https://git.omniindex.io/omniindex/core/postgresql/-/releases)

This is the OmniIndex PostgreSQL Blockchain admininstration console. It is a web-based application that allows you to manage your PostgreSQL Blockchain instance.

![OmniIndex Console](images/image.png)

## Getting started

Please use node ^21.1 as a good base (although this still has plenty of package issues)

Project includes dockerfile and docker-compose file for easy deployment and testing.
Runs an nginx reverse proxy responding only on :443 and forwarding to the web server on :3000

Am building two container images, 1 with the console-app and 1 with console-nginx
Both these are hosted on [Google Artifact register](https://console.cloud.google.com/artifacts/browse/oidx-logs?project=oidx-logs)

```bash
docker network create net
docker-compose up --build
```

Ignore the server locations as we have changed the default :3000 to a reverse proxy. Therefore [https://localhost] (https://localhost) will work.
User docker exec commands to get `pm2 monit` and `pm2 logs` for the console-app container


You will need to create a directory called `certs` in the root of the project and place your SSL certificate and key in this directory. The certificate should be called `nginx-selfsigned.crt` and the key should be called `nginx-selfsigned.key`.

### Documentation

Automatically generated documentation can be found [here](https://git.omniindex.io/omniindex/blockchain/admin_console/-/wikis/home) and uses [JSDoc](https://jsdoc.app/)

```bash

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```bash
cd existing_repo
git remote add origin https://git.omniindex.io/omniindex/blockchain/admin_console.git
git branch -M main
git push -uf origin main
```

# Documentation

## Commands

```sql
 SELECT pgbc.oidx_initialize(false, '', 'logs@omniindex.io', 'o1DXL0g54U5&D3m05tuff');
 SELECT pgbc.update_child_nodes('logs@omniindex.io', 'o1DXL0g54U5&D3m05tuff', '10.0.0.1',5434, true); 
```

### USER Commands

```sql
SELECT pgbc.add_user('logs@omniindex.io', 'o1DXL0g54U5&D3m05tuff', 'user_1', 'user_1_password', '');
SELECT pgbc.add_user('logs@omniindex.io', 'o1DXL0g54U5&D3m05tuff', 'user_2', 'user_2_password', '');
SELECT pgbc.modify_user('logs@omniindex.io', 'o1DXL0g54U5&D3m05tuff', 'user_1', 'user_1_password', 'user_1_password_again', false);
SELECT pgbc.suspend_user('logs@omniindex.io', 'o1DXL0g54U5&D3m05tuff', 'user_1');
SELECT pgbc.enable_user('logs@omniindex.io', 'o1DXL0g54U5&D3m05tuff', 'user_1');
SELECT pgbc.delete_user('logs@omniindex.io', 'o1DXL0g54U5&D3m05tuff', 'user_1'); 
SELECT pgbc.add_user_to_unit('logs@omniindex.io', 'o1DXL0g54U5&D3m05tuff', 'user_1', 'user_1_password', 'user_2', 'user_2_password', 'user_data', 'table_2', true);
```

### Block Commands

```sql
 SELECT pgbc.create_udt_type ('user_1', 'user_1_password', 'logs@omniindex.io', 'CREATE TYPE .attendance AS (id int, data TEXT);');
 SELECT pgbc.create_block_schema ('user_1', 'user_1_password', 'user_1', 'CREATE TABLE .table_1(id int, dataencrypt TEXT, PRIMARY KEY (id));');
 SELECT pgbc.add_json_data('sibain@omniindex.io', '12343456@12345', 'sibain@omniindex.io', '{"_id":{"$oid":"6423003f584f99dce3a3e774"},"attendanceRecords":[{"attendance":[],"time":"03:57 PM","_id":{"$oid":"6423003f584f99dce3a3e775"},"createdAt":{"$date":"2023-03-28T14:57:03.349Z"},"updatedAt":{"$date":"2023-03-28T14:57:03.349Z"}},{"attendance":[{"isPresent":true,"student":{"$oid":"6422ffe0584f99dce3a3e707"},"_id":{"$oid":"6423006c584f99dce3a3e7c6"},"createdAt":{"$date":"2023-03-28T14:57:48.418Z"},"updatedAt":{"$date":"2023-03-28T14:57:48.418Z"}}],"time":"03:57 PM","_id":{"$oid":"6423006c584f99dce3a3e7c5"},"createdAt":{"$date":"2023-03-28T14:57:48.418Z"},"updatedAt":{"$date":"2023-03-28T14:57:48.418Z"}}],"expiryDate":1.680019068399E+12,"date":"28/03/2023","schoolHeadquarter":{"$oid":"6422f5d2584f99dce3a3e3b4"},"school":{"$oid":"6422f5d2584f99dce3a3e3b4"},"classArm":{"$oid":"6422fc29584f99dce3a3e5ec"},"averageAttendance":50,"term":{"$oid":"6422f7bf584f99dce3a3e481"},"createdAt":{"$date":"2023-03-28T14:57:03.349Z"},"updatedAt":{"$date":"2023-03-28T14:57:48.418Z"}}', 'INSERT INTO .test(id, data) VALUES (1, ''</doc>'')');
 SELECT pgbc.add_block_data('user_1', 'user_1_password', 'user_1', 'INSERT INTO .table_1(id, dataencrypt) VALUES (1, ''simon'');');
 SELECT pgbc.search_block_data('user_1', 'user_1_password', false, 'uiser_1','SELECT id, dataencrypt FROM .table_1 WHERE {dataencrypt LIKE ''%simon%''};');
 SELECT pgbc.get_block_schematic('user_1', 'user_1_password', 'user_1','table_1');
 SELECT pgbc.get_block_list('user_1', 'user_1_password', 'user_1');
```

### Bodica

```sql
SELECT pgbc.omni_add_command('user_1', 'user_1_password', 'user_1', 'what time is it', 'SELECT CURRENT_TIME', 'Command to get the current system time'); 
SELECT pgbc.omni_command('user_1', 'user_1_password', 'user_1', 'whats the current time please');  
SELECT pgbc.hello_boudica('user_1', 'user_1_password', 'user_1', 'whats the current time please'); 
```

## Reference calls

```javascript

CREATE SCHEMA pgbc;
CREATE SCHEMA omniindex;
CREATE TABLE IF NOT EXISTS omniindex.system(uuid uuid DEFAULT uuid_generate_v4 (), is_saas bool NOT NULL, uid VARCHAR(128) NOT NULL, pwd VARCHAR(64) NOT NULL, is_setup bool NOT NULL);

-- Create the SQL functions
-- Test functions

-- Management functions
CREATE OR REPLACE FUNCTION pgbc.oidx_initialize(bool, text,text, text)
RETURNS text AS 'pgbc', 'oidx_initialize'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.oidx_initialize(bool, text, text, text) TO PUBLIC;

CREATE OR REPLACE FUNCTION pgbc.update_child_nodes(text, text, text, int, bool)
RETURNS bool AS 'pgbc', 'update_child_nodes'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.update_child_nodes(text, text, text, int, bool) TO PUBLIC;

CREATE OR REPLACE FUNCTION pgbc.change_system_password(text, text, text)
RETURNS bool AS 'pgbc', 'change_system_password'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.change_system_password(text, text, text) TO PUBLIC;

-- User functions
--add_user
CREATE OR REPLACE FUNCTION pgbc.add_user(text, text, text, text, text)
RETURNS bool AS 'pgbc', 'add_user'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.add_user(text, text, text, text, text) TO PUBLIC;

--modify_user
CREATE OR REPLACE FUNCTION pgbc.modify_user(text, text, text, text, text, bool)
RETURNS bool AS 'pgbc', 'modify_user'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.modify_user(text, text, text, text, text, bool) TO PUBLIC;

--suspend_user
CREATE OR REPLACE FUNCTION pgbc.suspend_user(text, text, text)
RETURNS bool AS 'pgbc', 'suspend_user'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.suspend_user(text, text, text) TO PUBLIC;

--enable user
CREATE OR REPLACE FUNCTION pgbc.enable_user(text, text, text)
RETURNS bool AS 'pgbc', 'enable_user'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.enable_user(text, text, text) TO PUBLIC;

--delete_user
CREATE OR REPLACE FUNCTION pgbc.delete_user(text, text, text)
RETURNS bool AS 'pgbc', 'delete_user'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.delete_user(text, text, text) TO PUBLIC;

--add_user_to_unit
CREATE OR REPLACE FUNCTION pgbc.add_user_to_unit(text, text, text, text, text, text, text, text, bool)
RETURNS bool AS 'pgbc', 'add_user_to_unit'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.add_user_to_unit(text, text, text, text, text, text, text, text, bool) TO PUBLIC;

--get_user_count
CREATE OR REPLACE FUNCTION pgbc.get_user_count(text, text, text)
RETURNS text AS 'pgbc', 'get_user_count'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.get_user_count(text, text, text) TO PUBLIC;

-- DATA FUNCTIONS 

--create_udt_type
CREATE OR REPLACE FUNCTION pgbc.create_udt_type(text, text, text, text)
RETURNS text AS 'pgbc', 'create_udt_type'  --change to bool after debug
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.create_udt_type(text, text, text, text) TO PUBLIC;

--create_block_schema
CREATE OR REPLACE FUNCTION pgbc.create_block_schema(text, text, text, text)
RETURNS text AS 'pgbc', 'create_block_schema'  --change to bool after debug
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.create_block_schema(text, text, text, text) TO PUBLIC;

--CREATE OR REPLACE FUNCTION pgbc.add_json_data(text, text, text, text, text)
--RETURNS text AS 'pgbc', 'add_json_data' --change to bool after debug
--LANGUAGE C STRICT;
--GRANT EXECUTE ON FUNCTION pgbc.add_json_data(text, text, text, text, text) TO PUBLIC;

--add_block_data
CREATE OR REPLACE FUNCTION pgbc.add_block_data(text, text, text, text)
RETURNS text AS 'pgbc', 'add_block_data' --change to bool after debug
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.add_block_data(text, text, text, text) TO PUBLIC;

--search_block_data
CREATE OR REPLACE FUNCTION pgbc.search_block_data(text, text, bool, text, text)
RETURNS text AS 'pgbc', 'search_block_data'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.search_block_data(text, text, bool, text, text) TO PUBLIC;

--get_block_schematic
CREATE OR REPLACE FUNCTION pgbc.get_block_schematic(text, text, text, text)
RETURNS text AS 'pgbc', 'get_block_schematic'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.get_block_schematic(text, text, text, text) TO PUBLIC;

--get_block_list
CREATE OR REPLACE FUNCTION pgbc.get_block_list(text, text, text)
RETURNS text AS 'pgbc', 'get_block_list'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.get_block_list(text, text, text) TO PUBLIC;

--get_block_size
CREATE OR REPLACE FUNCTION pgbc.get_block_size(text, text, text)
RETURNS text AS 'pgbc', 'get_block_size'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.get_block_size(text, text, text) TO PUBLIC;

-- Boudica functions

CREATE OR REPLACE FUNCTION pgbc.omni_add_command(text, text, text, text, text, text)
RETURNS bool AS 'pgbc', 'omni_add_command'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.omni_add_command(text, text, text, text, text, text) TO PUBLIC;

CREATE OR REPLACE FUNCTION pgbc.omni_command(text, text, text, text)
RETURNS text AS 'pgbc', 'omni_command'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.omni_command(text, text, text, text) TO PUBLIC;

CREATE OR REPLACE FUNCTION pgbc.hello_boudica(text, text, text, text)
RETURNS text AS 'pgbc', 'hello_boudica'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.hello_boudica(text, text, text, text) TO PUBLIC;

-- PostgresML functions (Postgresml.org)
CREATE OR REPLACE FUNCTION pgbc.train(text, text, text, text)
RETURNS text AS 'pgbc', 'train'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.train(text, text, text, text) TO PUBLIC;

CREATE OR REPLACE FUNCTION pgbc.embed(text, text, text, text)
RETURNS text AS 'pgbc', 'embed'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.embed(text, text, text, text) TO PUBLIC;

CREATE OR REPLACE FUNCTION pgbc.transform(text, text, text, text)
RETURNS text AS 'pgbc', 'transform'
LANGUAGE C STRICT;
GRANT EXECUTE ON FUNCTION pgbc.transform(text, text, text, text) TO PUBLIC;

```
