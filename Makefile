#!/bin/bash

.PHONY: launch build_image build_app clean_containers clean_image

PORT=8080
IMAGE_NAME=sharkquila_ui
CONTAINER_NAME=sharkquila_ui_runtime
PUBLISH_IMAGE_NAME=wulionel/sharkquila_ui

setup: build launch
build: build_image
rebuild: clean_containers build_image
clean: clean_containers clean_image
clean_alter: clean_image
relaunch: clean_containers launch

launch:
	docker run \
		-d \
		-p 8080:${PORT} \
		--name ${CONTAINER_NAME} \
		${IMAGE_NAME}

build_image: build_app
	docker build -t ${IMAGE_NAME} .

publish_image: build_app
	docker build -t ${PUBLISH_IMAGE_NAME} .
	docker push ${PUBLISH_IMAGE_NAME}

build_app:
	npm run build

clean_containers:
	docker rm -f `docker container ls -a | grep ${IMAGE_NAME} | sed | awk '{print $$1}'`

clean_image:
	docker image rm -f `docker images -a | grep ${IMAGE_NAME} | sed | awk '{print $$3}'`
