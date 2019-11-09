MAKEFLAGS += "-j $(shell nproc)"

.PHONY: all

all: $(patsubst src/%.txt, www/%.html, $(wildcard src/*.txt))
	@rm -f $(filter-out $^, $(wildcard www/*.html))

www/%.html: src/%.txt .vendor $(wildcard lib/*.js)
	@echo 'make: $@'
	@mkdir -p $(dir $@)
	@NODE_PATH=$(word 2, $^) node --no-deprecation ./bin/press.js --src $< --target $@ && echo 'done: $@'

.vendor: package.json
	@mkdir -p $@
	@mv $@ node_modules
	npm install
	@mv node_modules $@
	@touch $@
