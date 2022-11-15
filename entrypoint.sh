#!/bin/bash -l

set -e
set -o pipefail

## There is a bug with multiline output
## Read this thread https://github.com/orgs/community/discussions/26288

echo "${CONFIG}" | \
	yq  -o json -M -e | \
	jq -c -e -M  "${QUERY} | to_entries | map(\"\(.key)=\(.value|tostring)\")|.[]" | \
	sed -e 's/^"//' -e 's/"$//' -e 's/%/%25/g' -e s/\n/'%0A'/g -e s/\r/'%0D'/g | \
	xargs -I {} echo "{}" >> $GITHUB_OUTPUT