#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

docker build \
	--build-arg COMMIT=$(git rev-parse --short HEAD) \
	--build-arg LASTMOD=$(date -u +%Y-%m-%dT%H:%M:%SZ) \
	--progress=plain \
	--tag view-sitemap-style \
	.

#	--no-cache \
#exit 0

docker run \
	--env PORT=4000 \
	--expose 4000 \
	--interactive \
	--publish 4000:4000 \
	--rm \
	--tty \
    view-sitemap-style
