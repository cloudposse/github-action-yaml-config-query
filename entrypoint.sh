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
	NAME=$(echo ${item} | sed -e 's/^\(.*\)=\(.*\)$/\1/g')
	VALUE=$(echo ${item} | sed -e 's/^\(.*\)=\(.*\)$/\2/g')
	# OUTPUT="${item}"
	# OUTPUT="${OUTPUT//'%'/'%25'}"
	# OUTPUT="${OUTPUT//$'\n'/'%0A'}"
	# OUTPUT="${OUTPUT//$'\r'/'%0D'}"
	# OUTPUT="${OUTPUT//\\n/'%0A'}"
	# OUTPUT="${OUTPUT//\\r/'%0D'}"
	# OUTPUT="${OUTPUT//=/::}"
	# echo "::set-output name=${OUTPUT}"

	echo "${NAME}<<EOF" >> $GITHUB_OUTPUT
	echo -e "${VALUE}" >> $GITHUB_OUTPUT
	echo "EOF" >> $GITHUB_OUTPUT

	# echo "${OUTPUT}" >> $GITHUB_OUTPUT
done
