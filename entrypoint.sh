#!/bin/bash -l

set -e

echo "${CONFIG}" | \
	yq  -o json -M -e | \
	jq -c -e -M -r "${QUERY} | to_entries | map(\"\(.key)=\(.value|tostring)\")|.[]" | \
	xargs -I {} echo "{}" >> $GITHUB_OUTPUT