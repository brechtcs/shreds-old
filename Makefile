MAKEFLAGS += "-j $(shell nproc)"

.PHONY: all

pamphlets := web/index.html $(patsubst src/%.txt, web/%.html, $(wildcard src/*.txt))
trash := $(filter-out $(pamphlets), $(wildcard web/*.html))
vendor := .vendor

all: $(pamphlets)
ifneq ($(trash),)
	@rm -i $(trash)
endif

web/index.html: README.md bin/press.js
	@echo 'make: $@'
	@mkdir -p $(dir $@)
	@NODE_PATH=$(vendor) node --no-deprecation ./bin/press.js -s $< -t $@ && echo 'done: $@'

web/%.html: src/%.txt bin/press.js
	@echo 'make: $@'
	@mkdir -p $(dir $@)
	@NODE_PATH=$(vendor) node --no-deprecation ./bin/press.js -s $< -t $@ && echo 'done: $@'

bin/press.js: $(wildcard lib/*.js) $(vendor)
	@touch $@

$(vendor): package.json
	@mkdir -p $@
	@mv $@ node_modules
	npm install
	@mv node_modules $@
	@touch $@
