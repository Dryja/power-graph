import axios from 'axios';

const connection = axios.create({
    baseURL: 'http://127.0.0.1:3000/',
    timeout: 1000
});

function getBranches(hour) {
    return connection('branches/' + hour);
}

function getNodes(hour) {
    return connection('nodes/' + hour);
}

export async function buildGraph(hour) {
    let nodes = getNodes(hour);
    let elements = {
        nodes: [],
        edges: []
    }

    try {
        const response = await getBranches(hour);
        response.data.forEach(function (branch) {
            let arrows;
            if (branch.flow > 0) {
                arrows = "to";
            } else {
                arrows = "from";
            }
            elements.edges.push({
                from: branch.node_from,
                to: branch.node_to,
                value: Math.abs(branch.flow),
                title: "Flow " + Math.abs(branch.flow).toFixed(3) + " MW",
                arrows: arrows,

            })
        });
    } catch (error) {
        console.error(error);
    }

    try {
        const response = await nodes;
        response.data.forEach(function (node) {
            let color, value, title;
            if (node.generation) {
                if (node.demand > 0) {
                    color = "#fcc419";
                    value = Math.abs(node.generation - node.demand);
                    title = "Demand: " + Math.abs(node.demand).toFixed(3) + " MW  Generation: " + node.generation.toFixed(3) + " MW  Cost: " + node.cost.toFixed(2) + " zł";
                } else {
                    color = "#51cf66";
                    value = node.generation;
                    title = "Generation: " + node.generation.toFixed(3) + " MW  Cost: " + node.cost.toFixed(2) + " zł";
                }
            } else {
                color = "#ff6b6b";
                value = Math.abs(node.demand);
                title = "Demand: " + value.toFixed(3) + " MW";
                if (node.demand == 0) {
                    color = "#e7f5ff";
                }
            }
            elements.nodes.push({
                id: node.node_id,
                label: node.node_id.toString(),
                color: color,
                value: value,
                title: title
            })
        });
    } catch (error) {
        console.error(error);
    }
    return elements;
}