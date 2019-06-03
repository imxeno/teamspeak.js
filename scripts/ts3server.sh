#!/bin/bash
# This script can download, start, stop, restart and print status of TeamSpeak 3 server.
# This script works only with Linux and Mac OS because Windows doesn't have bash.

# Init option variables
DOWNLOAD=false
SERVER_PATH=/tmp/ts3
VERSION=

# Check for option existence and update its variable
while getopts "dv:p:" arg; do
	case "${arg}" in
		d)
			DOWNLOAD=true
			;;
		v)
			VERSION=${OPTARG}
			;;
		p)
		    SERVER_PATH=${OPTARG}
		    ;;
	esac
done
shift $((OPTIND-1))

# Fixing ending of SERVER_PATH to exclude '/' from the end.
[[ ${SERVER_PATH} = */ ]] && SERVER_PATH=${SERVER_PATH%?}

# Init rest of the variables
FILE_NAME="teamspeak3-server.temp"
PID_FILE=${SERVER_PATH}/ts3server.pid
BINARY=${SERVER_PATH}/ts3server

# Init platform specifc variables
if [[ $OSTYPE == "linux-gnu" ]]; then
    if [[ $(uname -m) == "x86_64" ]]; then ARCH="x86_64"; ARCH_STR="_amd64";
    else ARCH="x86"; ARCH_STR="_x86"; fi

    PLATFORM="linux"
    PLATFORM_STR="linux"

    EXT=".tar.bz2"
elif [[ $OSTYPE == "darwin" ]]; then
    ARCH="x86_64"

    PLATFORM="mac"
    PLATFORM_STR="macos"

    EXT=".zip"
fi

# Init useful functions
usage() {
    echo "Usage: ./ts3server.sh [SCRIPT_OPTIONS]... {start|stop|restart|status} [START_OPTIONS]..."
    echo "  script_options:"
    echo "    -d                  Automatically download server if doesn't exist"
    echo "    -v X.X.X            Sets version of the server to download"
    echo "    -p /path/to/folder  Sets the location of the server"
    exit 1
}

check_package() {
    dpkg -s $1 &> /dev/null
    [[ $? -eq 0 ]]
}

get_latest_server_download_link() {
    local SERVER_LIST=$(curl -s https://www.teamspeak.com/versions/server.json | sed 's~\\\/~\/~g')
    local FILTER=".${PLATFORM_STR}.${ARCH}.mirrors[]"

    if check_package "jq"; then
        echo ${SERVER_LIST} | jq -r "${FILTER}"
    else
        echo ${SERVER_LIST} | grep -Po "https:\/\/files.teamspeak-services.com\/releases\/server\/(\.\d|\d)+\/teamspeak3-server_${PLATFORM}${ARCH_STR}-(\.\d|\d)+(\.\w+)+" | sed 's~\\\/~\/~g'
    fi
}

get_server_download_link() {
    echo "https://files.teamspeak-services.com/releases/server/${VERSION}/teamspeak3-server_${PLATFORM}${ARCH_STR}-${VERSION}${EXT}"
}

download_server_archive() {
    local DOWNLOAD_LINK=

    if [[ -z $VERSION ]]; then
        local DOWNLOAD_LINK=$(get_latest_server_download_link)
    else
        local DOWNLOAD_LINK=$(get_server_download_link)
    fi

    wget ${DOWNLOAD_LINK} -O "${SERVER_PATH}/${FILE_NAME}" -q
}

extract_server_files() {
    local ZIP_FOLDER="teamspeak3-server_${PLATFORM}${ARCH_STR}"

    if [[ ${EXT} == ".zip" ]]; then
        unzip -qq ${SERVER_PATH}/${FILE_NAME} -d ${SERVER_PATH}
        mv ${SERVER_PATH}/${ZIP_FOLDER}/* ${SERVER_PATH}/
        rm -rf ${SERVER_PATH}/${ZIP_FOLDER}/
    else
        tar -C ${SERVER_PATH} -xjf ${SERVER_PATH}/${FILE_NAME} ${ZIP_FOLDER}/ --strip-components=1
    fi
}

remove_server_archive() {
    rm -f ${SERVER_PATH}/${FILE_NAME}
}

check_license() {
    [[ -e ${SERVER_PATH}/.ts3server_license_accepted ]]
}

accept_license() {
    touch ${SERVER_PATH}/.ts3server_license_accepted
}

# Init TeamSpeak 3 server control functions
start_server() {
    if [[ -e ${PID_FILE} ]]; then
        local PID=$(cat ${PID_FILE})

        if ps -p ${PID} > /dev/null 2>&1; then
            echo "The server is already running, try restart it or stop."
			return 1
		else
		    echo "PID file has been found, but no server running."
		    echo "Possibly your previously started server crashed."
			echo "Please view the logfile for details."
			rm ${PID_FILE}
	    fi
    fi

    if [[ $(id -u) -eq 0 ]]; then
        echo "WARNING ! For security reasons we advise: DO NOT RUN THE SERVER AS ROOT"
        local c=1
		while [[ ${c} -le 10 ]]; do
			echo -n "!"
			sleep 1
			c=$((${c} + 1))
		done
		echo "!"
    fi

    if [[ ! -e ${BINARY} ]]; then
        echo "Error: Could not find the binary, aborting"
        return 5
    fi

    if [[ ! -x ${BINARY} ]]; then
        echo "Binary is not executable, trying to fix it."
        chmod u+x ${BINARY}
    fi

    if [[ ! -x ${BINARY} ]]; then
        echo "Binary is not executable, cannot start TeamSpeak 3 server."
        return 3
    fi

    echo "Starting the TeamSpeak 3 server..."

    ${BINARY} ${@} daemon=1 pid_file=${PID_FILE}

    if [[ $? -eq 0 ]]; then
        echo "TeamSpeak 3 server successfully started."
    else
        echo "TeamSpeak 3 server could not start"
        return 4
    fi
}

stop_server() {
    if [[ ! -e ${PID_FILE} ]]; then
        echo "No server running."
        return 0
    fi

    local PID=$(cat ${PID_FILE})
    if ! ps -p ${PID} >/dev/null 2>&1; then
        echo "No server running."
        return 0
    fi

    echo -n "Stopping TeamSpeak 3 server"
    kill -TERM ${PID} || exit $?
    rm -f ${PID_FILE}

    local c=300
    while [[ ${c} -gt 0 ]]; do
        if kill -0 ${PID} 2>/dev/null; then
            echo -n "."
            sleep 1
        else
            break
        fi
        c=$(($c - 1))
    done
    echo

    if [[ ${c} -eq 0 ]]; then
        echo "Server is not shutting down cleanly - killing"
        kill -KILL ${PID}
        return $?
    else
        echo "Done!"
    fi

    return 0
}

get_server_status() {
    if [[ ! -e ${PID_FILE} ]]; then
        echo "No server running."
        return 1
    fi

    local PID=$(cat ${PID_FILE})
    if ! ps -p ${PID} >/dev/null 2>&1; then
        echo "Server seems to have died"
        return 1
    fi

    echo "Server is running"
    return 0
}

if [[ $1 == "start" || $1 == "stop" || $1 == "restart" || $1 == "status" ]]; then
    # Download server if doesn't exist and -d flag is specified
    if [[ ! -d ${SERVER_PATH} && ${DOWNLOAD} = true ]]; then
        mkdir -p ${SERVER_PATH}

        echo "Unable to find server. Automatically downloading server archive..."
        download_server_archive

        echo "Server archive downloaded. Extracting server files..."
        extract_server_files

        echo "Server files extracted. Removing server archive..."
        remove_server_archive

        echo "Server archive removed. Starting server..."
        FIRST_RUN=true
    elif [[ ! -d ${SERVER_PATH} && ${DOWNLOAD} = false ]]; then
        echo "Unable to find server in this location: ${SERVER_PATH}"
        exit 1
    fi

    cd ${SERVER_PATH}
    case ${1} in
        start)
            shift
            if ! check_license; then accept_license; fi
            start_server ${@}
            RETURN_CODE=$?

            if [[ ${FIRST_RUN} = true ]]; then
                sleep 1
	            LOG_FILE=$(find ${SERVER_PATH}/logs -name "ts3server_*" | grep "_1.log")

        	    echo "Server is located in: $SERVER_PATH"
	            echo "Server is listening on: $(cat ${LOG_FILE} | grep listening | sed 's~.*listening on ~~g')"
	            echo "Your admin rank privilege key is: $(cat ${LOG_FILE} | grep token= | sed 's~.*token=~~g')"
            fi

            exit ${RETURN_CODE}
            ;;
        stop)
            stop_server
            exit $?
            ;;
        restart)
            shift
            stop_server && (start_server ${@})
            exit $?
            ;;
        status)
            get_server_status
            exit $?
            ;;
    esac

else
    usage
fi
