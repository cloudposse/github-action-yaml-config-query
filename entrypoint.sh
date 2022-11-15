#!/bin/bash -l

set -e
set -o pipefail

## There is a bug with multiline output
## Read this thread https://github.com/orgs/community/discussions/26288

OUTPUTS=($(echo "${CONFIG}" | \
	yq  -o json -M -e | \
	jq -c -e -M  "${QUERY} | to_entries | map(\"\(.key)=\(.value|tostring)\")|.[]" | \
	sed -e 's/^"//' -e 's/"$//')
)

for item in "${OUTPUTS[@]}"
do
	OUTPUT="${item}"
	OUTPUT="${OUTPUT//'%'/'%25'}"
	OUTPUT="${OUTPUT//$'\n'/'%0A'}"
	OUTPUT="${OUTPUT//$'\r'/'%0D'}"
	OUTPUT="${OUTPUT//\\n/'%0A'}"
	OUTPUT="${OUTPUT//\\r/'%0D'}"
	echo "${OUTPUT}" >> $GITHUB_OUTPUT
done
