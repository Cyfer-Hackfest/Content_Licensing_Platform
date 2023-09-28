#!/usr/bin/env bash

set -eu

cd ./contract

cargo test --manifest-path ./Cargo.toml
