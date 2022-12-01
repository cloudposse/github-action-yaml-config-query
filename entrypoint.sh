#!/bin/bash -l

set -e
set -o pipefail
set -x

OUTPUTS=(
	$(
		echo "${CONFIG}" | \
		yq  -o json -M -e | \
		jq -c -e -M  "${QUERY} | to_entries | map(\"\(.key)=\(.value|tostring)\")|.[]" | \
		sed -e 's/^"//' -e 's/"$//'
	)
)

## There is a bug with multiline output
## Read this thread https://github.com/orgs/community/discussions/26288
## Read this workaround https://trstringer.com/github-actions-multiline-strings/

for item in "${OUTPUTS[@]}"
do
	NAME=$(echo ${item}  | sed -e 's/^\([^=]*\)=\(.*\)$/\1/g')
	VALUE=$(echo ${item} | sed -e 's/^\([^=]*\)=\(.*\)$/\2/g')
	echo "${NAME}<<EOF" >> $GITHUB_OUTPUT
	echo -e "${VALUE//\\\"/\"}" >> $GITHUB_OUTPUT
	echo "EOF" >> $GITHUB_OUTPUT
done
