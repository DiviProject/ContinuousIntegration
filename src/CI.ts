import { read } from 'fs-jetpack';

import { NodeConfigInterface, Nodes } from './Config';
import { Log } from './Logger';

export async function Run() {
    for (let i = 0; i < Nodes.length; i++) {
        const Node: NodeConfigInterface = Nodes[i];
        Node.client.on('ready', ready => {
            Log(`Connecting to Node ${i}`, Node.logfile);
            Node.client.shell((err, stream) => {
                if (err) {
                    Log(err, Node.logfile);
                } else {
                    stream.on('data', data => {
                        Log(data.toString(), Node.logfile, false);
                    });
                    stream.on('close', closed => {
                        Log(`Node ${i} connection closed`, Node.logfile);
                    });

                    Log(`Running make procedure for Node ${i}\n\n`, Node.logfile);

                    stream.end(read('procedure.make.sh'));
                }
            });
        });
    }
}

(() => { Run(); })();
