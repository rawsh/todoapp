#!/usr/bin/bash

COMPRESSOR=$(whence -p yui-compressor)
[ -z $COMPRESSOR ] && exit 0;

function _compress {
        local fname=$1:t
        local dest_path=$1:h
        local min_fname="$dest_path/${fname:r}.min.${fname:e}"
        $COMPRESSOR $1 > $min_fname
        git add $min_fname
}

for file in $(find . -regextype posix-extended -iregex '.+\.(css|js)$' -and -not -iregex '.+\.min\.(css|js)$'); _compress $file
