import axios from 'axios';

const connection = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 1000
});

function getBranches(hour) {
    return connection('branches/' + hour);
}

function getNodes(hour) {
    return connection('nodes/' + hour);
}


export function buildGraph(hour) {
    let nodes = getNodes(hour);
    let elements = [];

    getBranches(hour).then(function (response) {
            response.data.forEach(function (branch) {
                elements.push({
                    data: {
                        source: branch.node_from,
                        target: branch.node_to,
                        label: branch.flow
                    }
                })
            });
        })
        .catch(function (error) {
            console.log(error);
        })

    nodes.then(function (response) {
            response.data.forEach(function (node) {
                elements.push({
                    data: {
                        id: node.node_id,
                        label: node.node_id
                    }
                })
            });
        })
        .catch(function (error) {
            console.log(error);
        })
    return elements
}