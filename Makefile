MAKEFLAGS += "-j $(shell nproc)"

.PHONY: all

all: $(patsubst src/%.txt, web/%.html, $(wildcard src/*.txt))
	@rm -f $(filter-out $^, $(wildcard web/*.html))

web/%.html: src/%.txt .vendor $(wildcard lib/*.js)
	@echo 'make: $@'
	@mkdir -p $(dir $@)
	@NODE_PATH=$(word 2, $^) node --no-deprecation ./bin/press.js -s $< -t $@ && echo 'done: $@'

.vendor: package.json
	@mkdir -p $@
	@mv $@ node_modules
	npm install
	@mv node_modules $@
	@touch $@
