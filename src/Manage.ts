import { NodeConfigInterface, Nodes } from './Config';
import { Log } from './Logger';

export async function ManageNodes() {
    setInterval(() => {
        let finished = true;
        for (let i = 0; i < Nodes.length; i++) {
            const Node: NodeConfigInterface = Nodes[i];
            if (Node.state !== 'error' && Node.state !== 'closed') {
                finished = false;
            }
        }

        if (finished) {
            console.log(`Finished processing Nodes`.green.bold);
            process.exit(0);
        }
    }, 2500);
}
