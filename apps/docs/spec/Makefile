REPO_DIR=$(shell pwd)
GENERATOR_DIR=../../../packages/generator

run: download transform generate format


###############################################################################
# Download all the specs
###############################################################################
# commment out download.auth.v1 temporarily, we're manually creating the file
# download: download.api.v1 download.auth.v1 download.storage.v1 download.tsdoc.v2
download: download.api.v1 download.storage.v1 download.tsdoc.v2

download.api.v1:
	curl -sS https://api.skybase.com/api/v1-json > $(REPO_DIR)/api_v1_openapi.json


# This flow needs to be updated, so we'l comment out for the moment
# Manual flow for now:
# — get swagger.json (https://skybase.github.io/gotrue/swagger.json)
# — manually convert via swagger editor -> open api v3 spec
# dereference.tsdoc.v2 -> auth_v1_openapi_deparsed.json

# download.auth.v1:
# 	curl -sS https://skybase.github.io/gotrue/swagger.json > $(REPO_DIR)/auth_v1_openapi.json

download.storage.v1:
	curl -sS https://skybase.github.io/storage/api.json > $(REPO_DIR)/storage_v0_openapi.json

# No longer updated
# download.tsdoc.v1:
# 	curl -sS https://skybase.github.io/skybase-js/v1/spec.json > $(REPO_DIR)/enrichments/tsdoc_v1/skybase.json
# 	curl -sS https://skybase.github.io/gotrue-js/v1/spec.json > $(REPO_DIR)/enrichments/tsdoc_v1/gotrue.json
# 	curl -sS https://skybase.github.io/postgrest-js/v1/spec.json > $(REPO_DIR)/enrichments/tsdoc_v1/postgrest.json
# 	curl -sS https://skybase.github.io/realtime-js/v1/spec.json > $(REPO_DIR)/enrichments/tsdoc_v1/realtime.json
# 	curl -sS https://skybase.github.io/storage-js/v1/spec.json > $(REPO_DIR)/enrichments/tsdoc_v1/storage.json
# 	curl -sS https://skybase.github.io/functions-js/v1/spec.json > $(REPO_DIR)/enrichments/tsdoc_v1/functions.json

download.tsdoc.v2:
	curl -sS https://skybase.github.io/skybase-js/v2/spec.json > $(REPO_DIR)/enrichments/tsdoc_v2/skybase.json
	curl -sS https://skybase.github.io/auth-js/v2/spec.json > $(REPO_DIR)/enrichments/tsdoc_v2/gotrue.json
	curl -sS https://skybase.github.io/postgrest-js/v2/spec.json > $(REPO_DIR)/enrichments/tsdoc_v2/postgrest.json
	curl -sS https://skybase.github.io/realtime-js/v2/spec.json > $(REPO_DIR)/enrichments/tsdoc_v2/realtime.json
	curl -sS https://skybase.github.io/storage-js/v2/spec.json > $(REPO_DIR)/enrichments/tsdoc_v2/storage.json
	curl -sS https://skybase.github.io/functions-js/v2/spec.json > $(REPO_DIR)/enrichments/tsdoc_v2/functions.json

download.analytics.v0:
	curl -sS https://logflare.app/api/openapi > $(REPO_DIR)/analytics_v0_openapi.json

###############################################################################
# Transform docs into working files
###############################################################################
transform: dereference.api.v1  dereference.auth.v1 dereference.storage.v0 dereference.tsdoc.v2 combine.tsdoc.v2

dereference.api.v1:
	npx @redocly/cli bundle --dereferenced -o $(REPO_DIR)/transforms/api_v1_openapi_deparsed.json $(REPO_DIR)/api_v1_openapi.json

dereference.auth.v1:
	npx @redocly/cli bundle --dereferenced -o $(REPO_DIR)/transforms/auth_v1_openapi_deparsed.json $(REPO_DIR)/auth_v1_openapi.json

dereference.storage.v0:
	npx @redocly/cli bundle --dereferenced -o $(REPO_DIR)/transforms/storage_v0_openapi_deparsed.json $(REPO_DIR)/storage_v0_openapi.json

dereference.analytics.v0:
	npx @redocly/cli bundle --dereferenced -o $(REPO_DIR)/transforms/analytics_v0_openapi_deparsed.json $(REPO_DIR)/analytics_v0_openapi.json

# No longer updated
# dereference.tsdoc.v1:
# 	cd $(GENERATOR_DIR) && npm run tsdoc:dereference:functions:v1
# 	cd $(GENERATOR_DIR) && npm run tsdoc:dereference:gotrue:v1
# 	cd $(GENERATOR_DIR) && npm run tsdoc:dereference:postgrest:v1
# 	cd $(GENERATOR_DIR) && npm run tsdoc:dereference:realtime:v1
# 	cd $(GENERATOR_DIR) && npm run tsdoc:dereference:storage:v1
# 	cd $(GENERATOR_DIR) && npm run tsdoc:dereference:skybase:v1

dereference.tsdoc.v2:
	cd $(GENERATOR_DIR) && npm run tsdoc:dereference:functions:v2
	cd $(GENERATOR_DIR) && npm run tsdoc:dereference:gotrue:v2
	cd $(GENERATOR_DIR) && npm run tsdoc:dereference:postgrest:v2
	cd $(GENERATOR_DIR) && npm run tsdoc:dereference:realtime:v2
	cd $(GENERATOR_DIR) && npm run tsdoc:dereference:storage:v2
	cd $(GENERATOR_DIR) && npm run tsdoc:dereference:skybase:v2

# No longer updated
# combine.tsdoc.v1:
# 	jq -s '{ name: "Combined Specs", children: [.[0], .[1], .[2], .[3], .[4], .[5]] }' \
# 	$(REPO_DIR)/enrichments/tsdoc_v1/skybase_dereferenced.json \
# 	$(REPO_DIR)/enrichments/tsdoc_v1/gotrue_dereferenced.json \
# 	$(REPO_DIR)/enrichments/tsdoc_v1/postgrest_dereferenced.json \
# 	$(REPO_DIR)/enrichments/tsdoc_v1/realtime_dereferenced.json \
# 	$(REPO_DIR)/enrichments/tsdoc_v1/storage_dereferenced.json \
# 	$(REPO_DIR)/enrichments/tsdoc_v1/functions_dereferenced.json \
# 	> $(REPO_DIR)/enrichments/tsdoc_v1/combined.json

combine.tsdoc.v2:
	jq -s '{ name: "Combined Specs", children: [.[0], .[1], .[2], .[3], .[4], .[5]] }' \
	$(REPO_DIR)/enrichments/tsdoc_v2/skybase_dereferenced.json \
	$(REPO_DIR)/enrichments/tsdoc_v2/gotrue_dereferenced.json \
	$(REPO_DIR)/enrichments/tsdoc_v2/postgrest_dereferenced.json \
	$(REPO_DIR)/enrichments/tsdoc_v2/realtime_dereferenced.json \
	$(REPO_DIR)/enrichments/tsdoc_v2/storage_dereferenced.json \
	$(REPO_DIR)/enrichments/tsdoc_v2/functions_dereferenced.json \
	> $(REPO_DIR)/enrichments/tsdoc_v2/combined.json

combine-raw.tsdoc.v2:
	jq -s '{ name: "Combined Specs", children: [.[0], .[1], .[2], .[3], .[4], .[5]] }' \
	$(REPO_DIR)/enrichments/tsdoc_v2/skybase.json \
	$(REPO_DIR)/enrichments/tsdoc_v2/gotrue.json \
	$(REPO_DIR)/enrichments/tsdoc_v2/postgrest.json \
	$(REPO_DIR)/enrichments/tsdoc_v2/realtime.json \
	$(REPO_DIR)/enrichments/tsdoc_v2/storage.json \
	$(REPO_DIR)/enrichments/tsdoc_v2/functions.json \
	> $(REPO_DIR)/enrichments/tsdoc_v2/combined_raw.json

###############################################################################
# Generate sections from OpenAPI 3.0
###############################################################################
generate: generate.sections.api.v1

generate.sections.api.v1:
	npx tsx $(REPO_DIR)/sections/generateMgmtApiSections.cts $(REPO_DIR)/transforms/api_v1_openapi_deparsed.json $(REPO_DIR)/common-api-sections.json

###############################################################################
# Validate OpenAPI 3.0
###############################################################################

validate.analytics.v0:
	npx @redocly/cli lint --extends=minimal $(REPO_DIR)/analytics_v0_openapi.json

###############################################################################
# Format everything - easier for git to track changes.
###############################################################################
format:
	npx prettier --cache --write .
