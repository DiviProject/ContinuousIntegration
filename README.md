# Continuous Integration

Procedural Continuous Integration testing suite for Divi full nodes.

### How it works

The Continuous Integration testing suite works by SSHing into your full nodes. Taking a specific commit from the Divi repository. And then, runs tests accordingly for that commit. The standard procedure when testing a specific commit on Divi is as follows.

1. Compile and run `make` and `make install`.

2. `make check` is fully operational.

3. (Optional with `yarn test`) Can run a set of transactions to make sure consensus works correctly amongst full nodes.

### Requirements

1. RSA Key access to atleast 4 Divi full nodes

2. Node.js LTS

3. Properly configured full nodes

### Configuring full nodes

1. Divi is cloned in `/root/Divi`

```bash
cd ~
git clone https://github.com/DiviProject/Divi
```

2. Divi is compilable on the machine. We suggest using Ubuntu.

```bash
# The following should make sure you can compile Divi on your machine
sudo add-apt-repository ppa:bitcoin/bitcoin
sudo apt-get update
sudo apt-get install make gcc g++ pkg-config autoconf libtool libboost-all-dev libssl-dev libssl1.0-dev libevent-dev libdb4.8-dev libdb4.8++-dev -y
```

3. The machine has Intranet access and can update the repository via `git`.

### Usage

1. make sure to configure your `node.ci.config.json` node. The configuration file uses the following format:

```json
[
    {
        "host": "127.0.0.1",
        "port": 22,
        "username": "root",
        "privateKey": "/path/to/id_rsa"
    }
]

```

The private key would be your `id_rsa` in your `.ssh` or any other RSA key that you have provided to existing nodes. You can specify a custom path for a configuration file by using the `CONFIG` environment variable.

```bash
# UNIX
export CONFIG='path/to/config/file.json'
```

```dos
# Windows / DOS
SET CONFIG=path\to\config\file.json
```

2. After setting up the configuration file. You can now run CI testing

```bash
yarn start
```

3. You can run custom testing configuration by running

```bash
yarn test
```
