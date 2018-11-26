.PHONY: template
default: help

folder:
	@mkdir $(filter-out $@,$(MAKECMDGOALS))

file:
	@touch $(filter-out $@,$(MAKECMDGOALS))

temp:
	@node ./scripts/make/index.js $(filter-out $@,$(MAKECMDGOALS))

help:
	@echo 'make 命令使用说明'
	@echo 'make temp <name> <path>  --- name 文件模型的名称，不能忽略'
	@echo '                         --- path 文件模型路径，忽略则认为是/src/components/'	

