#!/usr/bin/env bash

set -eu

# NOTE: Add contracts to this array to build them ⬇️
# IMPORTANT: Just use spaces (_no commas_) between multiple array items (it's a bash convention).
contracts=("usage_license_contract")

# NOTE: Modify the base output directory by setting the `DIR` environment variable.
DIR="${DIR:=./src/metadata}"

for i in "${contracts[@]}"
do
#   echo -e "\nBuilding './$i/Cargo.toml'…"
  cd ./contract
  cargo contract build --release

  cd ..
  echo "Copying build files to '$DIR/$i/'…"
  mkdir -p "$DIR/$i"
  cp "./contract/target/ink/$i.contract" "$DIR/$i/"
  cp "./contract/target/ink/$i.wasm" "$DIR/$i/"
  cp "./contract/target/ink/$i.json" "$DIR/$i/"
done
