#!/bin/bash

# Update package list and install necessary packages
apt-get update
apt-get install -y cmake g++ libpng-dev git

# Clone the rhubarb-lip-sync repository
git clone https://github.com/DanielSWolf/rhubarb-lip-sync.git
cd rhubarb-lip-sync

# Build rhubarb
mkdir build
cd build
cmake ..
make

# Move the rhubarb executable to /usr/local/bin
mv rhubarb /usr/local/bin/
