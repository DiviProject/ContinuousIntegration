import { read } from 'fs-jetpack';
import { Client } from 'ssh2';

interface NodeConfigInterface {
    host: string;
    port: number;
    username: string;
    privateKey?: string;
}

const NodeConfig: Array<NodeConfigInterface> = JSON.parse(read(process.env.CONFIG || 'node.ci.config.json'));
const Nodes: Client = [];

NodeConfig.forEach(configuration => {
    const Node = new Client();
    configuration.privateKey = configuration.privateKey ? read(configuration.privateKey) : null;
    Node.connect(configuration);
    Nodes.push(Node);
});

export { NodeConfig, Nodes }
