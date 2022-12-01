#!/bin/bash -l

set -e
set -o pipefail
set -x

oIFS="$IFS"
IFS=$'\n'
OUTPUTS=(
	$(
		echo "${CONFIG}" | \
		yq -o json -M -e | \
		jq . -c -e -M | \
		jq -c -e -M -r  "${QUERY} | to_entries | map(\"\(.key)=\(.value|tostring)\")|.[]"	)
)
IFS="$oIFS"

echo "${OUTPUTS}"

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
