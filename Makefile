.PHONY: component
default: help

folder:
	@mkdir $(filter-out $@,$(MAKECMDGOALS))

file:
	@touch $(filter-out $@,$(MAKECMDGOALS))

component:
	@node ./scripts/make/index.js $(filter-out $@,$(MAKECMDGOALS))

help:
	@echo 'make 命令使用说明'
	@echo 'make component <name>     name 组件名称，必填'

