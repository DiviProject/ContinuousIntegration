import { NodeConfigInterface, Nodes } from './Config';
import { Log } from './Logger';
import { ManageNodes } from './Manage';
import { GenerateSnapshot } from './Generate';

export async function Seeds() {
    console.log(`Processing nodes with snapshot procedure\n`.green.bold);
    ManageNodes();

    for (let i = 0; i < Nodes.length; i++) {
        const Node: NodeConfigInterface = Nodes[i];
        Node.client.on('ready', ready => {
            Log(`Connecting to Node ${i + 1}`, Node.logfile);
            Node.state = 'connected';
            Node.client.shell((err, stream) => {
                if (err) {
                    Log(`There was a problem running Node ${i + 1} please check the log file`, Node.logfile);
                    Log(err, Node.logfile);
                    Node.state = 'error';
                } else {
                    stream.on('data', data => {
                        Log(data.toString(), Node.logfile, false);
                    });

                    stream.on('close', closed => {
                        Log(`Node ${i + 1} connection closed`, Node.logfile);
                        Node.state = 'closed';
                    });

                    Log(`Running snapshot procedure for Node ${i + 1}\n\n`, Node.logfile);

                    stream.end(GenerateSnapshot(Node.snapshot));
                    Node.state = 'running';
                }
            });
        });
    }
}

(() => { Seeds(); })();
