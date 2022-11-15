#!/bin/bash -l

set -e
set -o pipefail

echo "${CONFIG}" | \
	yq  -o json -M -e | \
	jq -c -e -M  "${QUERY} | to_entries | map(\"\(.key)=\(.value|tostring)\")|.[]" | \
	sed -e 's/^"//' -e 's/"$//' -e 's/%/$25/g' -e 's/\\n/%0A/g' -e 's/\\r/%0D/g' | \
	xargs -I {} echo "{}" >> $GITHUB_OUTPUT