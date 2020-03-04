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
sudo apt-get install make gcc g++ pkg-config autoconf libtool libboost-all-dev libssl1.0-dev libevent-dev libdb4.8-dev libdb4.8++-dev -y
```

3. The machine has Intranet access and can update the repository via `git`.

### Usage

#### Node Configuration

1. make sure to configure your `node.ci.config.json` node. The configuration file uses the following format:

```json
[
    {
        "network": "mainnet",
        "snapshot": "https://divi-snapshots.nyc3.digitaloceanspaces.com/1582514766401-mainnet-snapshot.zip",
        "logfile": "node1.log",
        "ssh": {
            "host": "127.0.0.1",
            "port": 22,
            "username": "root",
            "privateKey": "/path/to/id_rsa"
        }
    }
]

```

The private key would be your `id_rsa` in your `.ssh` or any other RSA key that you have provided to existing nodes.

You can actually use `node.ci.config.example.json` as an example.


#### Configuration Path

You can specify a custom path for a configuration file by using the `CONFIG` environment variable. The default path is `~/node.ci.config.json`.

```bash
# UNIX
export CONFIG='path/to/config/file.json'
```

```dos
# Windows / DOS
SET CONFIG=path\to\config\file.json
```

#### divi.conf Configuration

You can also set a custom path for the `divi.conf` file in nodes. The default path is `/root/.divi/divi.conf`.

```bash
# UNIX
export DIVI_CONF='/root/.divi/divi.conf'
```

```dos
# Windows / DOS (note the path doesn't use Windows path escape sequence)
SET DIVI_CONF=/root/.divi/divi.conf
```

#### seeds.conf

You can customize the networks seed nodes with the `seeds.conf`. This method is optional. However it is required to do main network sandbox testing when using a snapshot of the mainnet. The default path is `~/seeds.conf`.

```bash
# UNIX
export SEED_CONFIG='path/to/config/file.json'
```

```dos
# Windows / DOS
SET SEED_CONFIG=path\to\config\file.json
```


### Procedures

If you don't have the required dependencies. You can run.

```bash
yarn install
```

After setting up the configuration file. You can now make and run nodes by running `yarn make`

```bash
yarn make
```

Once the make procedure is successful. You can then run the boot procedure. This will run the `divid` daemon.

```bash
yarn boot
```

If you want to use a snapshot (from https://snapshots.diviproject.org), make sure to run the kill procedure. And then the snapshot command.

```bash
yarn kill # this turns off the divi daemon in every node.
```

```bash
yarn snapshot # this migrates the snapshot to the node.
```

Please make sure to give each node time to process and update configurations. For example. If you are booting from a snapshot of the chain. Or if you're booting to the main network. You will need to wait for the network to sync.

If you want to use custom seeds. Run the `yarn seeds` command. Just make sure to make the project again after.

```bash
yarn seeds
yarn make # make the project after updating seeds
```

