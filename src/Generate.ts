import { randomBytes } from 'crypto';
import { read } from 'fs-jetpack';

export const CONF_FILE = process.env.DIVI_CONF || `/root/.divi/divi.conf`
export const SEED_FILE = process.env.SEED_CONFIG || 'seeds.conf';

export function GenerateConfig() {;
    const password = randomBytes(20).toString('hex');

    const line1 = `rm ${CONF_FILE}\n`;
    const line2 = `touch ${CONF_FILE}\n`;
    const line3 = `echo "rpcuser=divirpc" >> ${CONF_FILE}\n`;
    const line4 = `echo "rpcpassword=${password}" >> ${CONF_FILE}\n`;

    return `${line1} ${line2} ${line3} ${line4}`;
}

export function GenerateSeeds() {
    const seeds = read(SEED_FILE);

    let output = `rm Divi/divi/contrib/seeds/seeds_main.txt\ntouch Divi/divi/contrib/seeds/nodes_test.txt\n`;

    seeds.split('\n').forEach(seed => {
        output += `echo "${seed}" >> Divi/divi/contrib/seeds/seeds_main.txt\n`;
    });

    return output;
}

export function GenerateSnapshot(url) {
    let output = `cd /root/.divi/
rm -rf snapshot.zip blocks-snapshot.zip chainstate-snapshot.zip blockds_old chainstate_old
curl -k ${url} -o snapshot.zip
unzip snapshot.zip -d .
mv blocks blocks_old
mv chainstate chainstate_old
unzip blocks-snapshot.zip -d blocks
unzip chainstate-snapshot.zip -d chainstate`;


    return output;
}
