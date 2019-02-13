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
	@echo 'make component <name>     name为组件名称，必须小写（多个单词可使用连字符）,必填'

