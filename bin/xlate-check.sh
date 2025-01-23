#!/usr/bin/env bash
#
# check that all the translations are complete
#

set -o errexit
set -o nounset
set -o pipefail

SCRIPT_HOME=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
REPO_HOME=$(cd "${SCRIPT_HOME}/.." && pwd)
MAIN_LANG=en

# check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "ERROR: jq is not installed. try 'apt-get install jq' or 'brew install jq'"
    exit 1
fi

echo "INFO: starting at $(date -u +%Y-%m-%dT%H:%M:%SZ)"


MESSAGE_DIR="${REPO_HOME}/messages"

MAIN_FILE="${MESSAGE_DIR}/${MAIN_LANG}.json"
if [ ! -f "${MAIN_FILE}" ]; then
    echo "ERROR: primary translations file not found: \"${MAIN_FILE}\""
    exit 2
fi
MAIN_KEYS=$( jq -r 'paths(scalars) | join(".")' "${MAIN_FILE}" | sort)
echo "INFO: keys in primary translations file: $(echo "${MAIN_KEYS}" | wc -l)"

# get the list of translation files
FILES=$(find "${MESSAGE_DIR}" -type f -name '*.json')

count=0

# check if all the translations are complete
for FILE in ${FILES}; do
    # get the language code
    LANG=$(basename "${FILE}" .json)
    if [ "${LANG}" == "${MAIN_LANG}" ]; then
        echo "INFO: skipping main language ${LANG} (${FILE})"
        continue
    fi

    echo "INFO: checking ${LANG} (${FILE})"

    KEYS=$( jq -r 'paths(scalars) | join(".")' "${FILE}" | sort)
    echo "INFO: keys in ${LANG} translations: $(echo "${KEYS}" | wc -l)"

    set +e
    DIFF=$(diff --suppress-common-lines <(echo "${MAIN_KEYS}") <(echo "${KEYS}") | grep -E '^[<>]')
    set -e
    #echo "INFO: diff is \"$DIFF\""

    if [ -z "${DIFF}" ]; then
        echo "INFO: ${LANG} translations are complete"
        continue
    fi

    DELTA=$(echo "${DIFF}" | wc -l)
    echo "INFO: ${LANG} translations have ${DELTA} missing keys"
    if [ "${DELTA}" -gt 0 ]; then
        echo "ERROR: ${LANG} translations are incomplete: ${DELTA} missing keys"
        echo "${DIFF}"
        count=$((count + 1))
    fi

done

echo "INFO: complete at $(date -u +%Y-%m-%dT%H:%M:%SZ)"

if [ "${count}" -gt 0 ]; then
    echo "ERROR: ${count} translations are incomplete"
    exit 3
fi

echo "INFO: all translations are complete"