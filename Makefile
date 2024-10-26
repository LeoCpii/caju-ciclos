RUN:=yarn

NAME:=caju

# STYLE #
ERROR=\x1b[41m
SUCCESS=\x1b[42m
RESET=\x1b[0m
WARN=\x1b[30;43m

# ------------------------------------------------------------------------------------ #

# Função para executar comandos dentro do workspace
define run_in_workspace
	@echo ------------------------------------------------------------------------------;
	@printf "${WARN} RUNNING ${RESET}: $(1) - $(2) $(3)\n";
	@echo ;
	@$(RUN) workspace @$(NAME)/$(1) $(2) $(3)

	@if [ $$? -eq 0 ]; then \
		printf "${SUCCESS} SUCCESS ${RESET}: $(1) - $(2) $(3)\n"; \
		echo ------------------------------------------------------------------------------; \
	fi
endef

# Extrair parâmetros dos argumentos posicionais
.PHONY: run
run:
	$(eval PROJECT := $(word 2, $(MAKECMDGOALS)))
	$(eval CMD := $(wordlist 3, $(words $(MAKECMDGOALS)), $(MAKECMDGOALS)))
	$(call run_in_workspace,$(PROJECT),$(CMD))

# Para evitar que make tente interpretar os argumentos como alvos
%:
	@:

# ----------------------------------------------- #

setup:
	make clean-builds
	make clean-dependencies
	yarn install
	make build-dependencies

define delete_build
	@echo delete_build $(1)
	rm -Rf ./packages/$(1)/dist
endef

clean-builds:
	$(call delete_build,shared/services)
	$(call delete_build,shared/business)
	$(call delete_build,shared/ui)
	@printf "${SUCCESS} >>>> Builds deleteds ${RESET}\n";

define delete_dependencies
	@echo delete_dependencies $(1)
	rm -Rf ./packages/$(1)/node_modules
endef

clean-dependencies:
	rm -Rf ./node_modules
	$(call delete_dependencies,ui)
	$(call delete_dependencies,services)
	$(call delete_dependencies,business)

build-dependencies:
	make run services build
	make run business build
	make run ui build