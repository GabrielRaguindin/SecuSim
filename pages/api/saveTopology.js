export const saveTopology = (name, nodes, edges) => {
    if (!name) {
        throw new Error ("Topology name is required");
    };
    const topologyData = {nodes,edges};
    localStorage.setItem(name, JSON.stringify(topologyData));
};

export const getTopology = (name) => {
    const savedTopology = localStorage.getItem(name);
    if (savedTopology) {
        return JSON.parse(savedTopology);
    }
    return null;
}

export const deleteTopology = (name) => {
    localStorage.removeItem(name);
};

export const getSavedTopologies = () => {
    const keys = Object.keys(localStorage);
    return keys;
}