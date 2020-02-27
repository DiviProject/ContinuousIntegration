import 'colors';
import { Nodes } from './Config';

export async function Run() {
    for (let i = 0; i < Nodes.length; i++) {
        const Node = Nodes[i];
        Node.on('ready', ready => {
            console.log(`Connecting to Node ${i}`);
            Node.shell((err, stream) => {
                if (err) {
                    console.log(err);
                } else {
                    stream.on('data', data => {
                        console.log(data.toString());
                    });
                    stream.on('close', closed => {
                        console.log(`Node ${i} connection closed`);
                    });
                    stream.end(`ls -la\nexit\n`);
                }
            });
        });
    }
}

(() => { Run(); })();
