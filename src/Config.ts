import { read } from 'fs-jetpack';
import { Client } from 'ssh2';

export interface NodeConfigInterface {
    network: string;
    snapshot: string;
    logfile: string;
    ssh: {
        host: string;
        port: number;
        username: string;
        privateKey?: string;
    },
    client: any,
    state: string;
}

const NodeConfig: Array<NodeConfigInterface> = JSON.parse(read(process.env.CONFIG || 'node.ci.config.json'));
const Nodes: Client = [];

NodeConfig.forEach(configuration => {
    const Node = new Client();
    configuration.ssh.privateKey = configuration.ssh.privateKey ? read(configuration.ssh.privateKey) : null;
    Node.connect(configuration.ssh);
    configuration.client = Node;
    Node.state = 'ready';
    Nodes.push(configuration);
});

export { NodeConfig, Nodes }
